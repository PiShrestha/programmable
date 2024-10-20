from collections import deque
from queue import PriorityQueue
from datetime import datetime
from firebase_admin import firestore
from .models import User, Question, LearningHistory

db = firestore.client()  # Firestore client instance

class RecommendationSystem:
    """Class to manage question recommendations using an Anki-like algorithm."""

    def __init__(self, user_id, selected_topic):
        self.user_id = user_id
        self.selected_topic = selected_topic  # Track selected topic
        self.user = User.get_user(user_id)  # Fetch user details
        self.question_pool = self.create_question_pool(selected_topic)  # Initialize question pool
        self.priority_queue = PriorityQueue()  # Priority queue for recommendations

    def create_question_pool(self, topic):
        """Create a question pool for a specific topic."""
        return Question.get_questions_by_topic(topic)  # Fetch questions for the topic from Firestore

    def populate_priority_queue(self):
        """Populate the priority queue with questions based on user history and difficulty."""
        for question in self.question_pool:
            score = self.calculate_priority_score(question)  # Calculate priority score
            self.priority_queue.put((score, question))  # Add to queue

    def calculate_priority_score(self, question):
        """Calculate the priority score for a question based on user performance."""
        # Fetch learning history for this user and question from Firestore
        history = LearningHistory.get_history_for_question(self.user_id, question['id'])

        # Start with the question's difficulty as the base score
        score = question['difficulty']  
        
        if history:
            for entry in history:
                if entry['correct']:
                    score -= 1  # Penalize for correct answers
                else:
                    score += 2  # Reward for incorrect answers

        # If the user is weak or new to this subtopic, adjust to easier difficulty
        if self.is_user_weak_in_subtopic(question['subtopic']):
            score = min(score, 3)  # Limit score to easy questions

        return score

    def is_user_weak_in_subtopic(self, subtopic):
        """Check if the user is weak in a specific subtopic based on their history."""
        # Fetch the user's performance in this subtopic
        subtopic_history = LearningHistory.get_history_by_subtopic(self.user_id, subtopic)

        # Determine if the user has mostly incorrect answers
        incorrect_count = sum(1 for entry in subtopic_history if not entry['correct'])
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
        LearningHistory.add_history_entry(self.user_id, question_id, correct)  # Add learning history to Firestore
        
        user = User.get_user(self.user_id)  # Fetch user details
        self.reset_daily_progress(user)  # Check if daily progress needs resetting

        if correct:
            new_progress = user.get('daily_progress', 0) + 10
            User.update_user(self.user_id, {'daily_progress': new_progress})  # Increment daily progress by 10%
            self.update_streak(user)  # Check if streak should be updated

    # Helper Methods

    def reset_daily_progress(self, user):
        """Reset daily progress for the user if it's a new day."""
        if user['last_streak_update'] is None or user['last_streak_update'].date() < datetime.now().date():
            User.update_user(self.user_id, {
                'daily_progress': 0, 
                'last_streak_update': datetime.now()
            })  # Reset daily progress to 0

    def update_streak(self, user):
        """Update user's streak based on daily progress."""
        if user['daily_progress'] >= 100:
            new_streak = user.get('streak', 0) + 1
            User.update_user(self.user_id, {
                'streak': new_streak,
                'daily_progress': 0  # Reset progress after increment
            })
