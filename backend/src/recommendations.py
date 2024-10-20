from collections import deque
from queue import PriorityQueue
from datetime import datetime
from .models import User, Question, LearningHistory, db

class RecommendationSystem:
    """Class to manage question recommendations using an Anki-like algorithm."""

    def __init__(self, user_id, selected_topic):
        self.user_id = user_id
        self.selected_topic = selected_topic  # Track selected topic
        self.user = User.query.get(user_id)  # Fetch user details
        self.question_pool = self.create_question_pool(selected_topic)  # Initialize question pool
        self.priority_queue = PriorityQueue()  # Priority queue for recommendations

    def create_question_pool(self, topic):
        """Create a question pool for a specific topic."""
        return Question.query.filter_by(topic=topic).all()  # Fetch questions for the topic

    def populate_priority_queue(self):
        """Populate the priority queue with questions based on user history and difficulty."""
        for question in self.question_pool:
            score = self.calculate_priority_score(question)  # Calculate priority score
            self.priority_queue.put((score, question))  # Add to queue

    def calculate_priority_score(self, question):
        """Calculate the priority score for a question based on user performance."""
        history = LearningHistory.query.filter_by(user_id=self.user_id, question_id=question.id).all()
        
        # Start with the question's difficulty as the base score
        score = question.difficulty  
        
        if history:
            for entry in history:
                if entry.correct:
                    score -= 1  # Penalize for correct answers
                else:
                    score += 2  # Reward for incorrect answers

        # If the user is weak or new to this subtopic, adjust to easier difficulty
        if self.is_user_weak_in_subtopic(question.subtopic):
            score = min(score, 3)  # Limit score to easy questions

        return score

    def is_user_weak_in_subtopic(self, subtopic):
        """Check if the user is weak in a specific subtopic based on their history."""
        # Check history for the user's performance in this subtopic
        subtopic_history = LearningHistory.query.join(Question).filter(
            LearningHistory.user_id == self.user_id,
            Question.subtopic == subtopic
        ).all()
        
        # Determine if the user has mostly incorrect answers
        incorrect_count = sum(1 for entry in subtopic_history if not entry.correct)
        total_attempts = len(subtopic_history)

        return total_attempts > 0 and (incorrect_count / total_attempts) > 0.5  # More than 50% incorrect

    def recommend_question(self):
        """Recommend a question from the priority queue."""
        if self.priority_queue.empty():
            self.populate_priority_queue()  # Populate if empty
        score, question = self.priority_queue.get()  # Fetch the highest priority question
        return question

    def update_learning_history(self, question_id, correct):
        """Update learning history based on user response and manage daily streak progress."""
        history_entry = LearningHistory(
            user_id=self.user_id,
            question_id=question_id,
            correct=correct,
            attempt_date=datetime.now()  # Current date and time
        )
        db.session.add(history_entry)  # Add to the session
        
        user = User.query.get(self.user_id)  # Fetch user details
        reset_daily_progress(user)  # Check if daily progress needs resetting

        if correct:
            user.daily_progress += 10.0  # Increment daily progress by 10%
            update_streak(user)  # Check if streak should be updated

        db.session.commit()  # Commit changes


# Helper Methods

def reset_daily_progress(user):
    """Reset daily progress for the user if it's a new day."""
    if user.last_streak_update is None or user.last_streak_update.date() < datetime.now().date():
        user.daily_progress = 0  # Reset daily progress to 0
        user.last_streak_update = datetime.now()  # Update last streak update date
        db.session.commit()  # Commit changes to the database

def update_streak(user):
    """Update user's streak based on daily progress."""
    if user.daily_progress >= 100:
        user.streak += 1  # Increment streak
        user.daily_progress = 0  # Reset progress after increment
        db.session.commit()  # Commit changes
