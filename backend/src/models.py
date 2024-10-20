from src.firebase import db 
from datetime import datetime

class User:
    """Class to represent a user in Firestore."""

    @staticmethod
    def create_user(user_id, username):
        user_data = {
            'username': username,
            'streak': 0,
            'daily_progress': 0,
            'last_streak_update': None
        }
        db.collection('users').document(user_id).set(user_data)

    @staticmethod
    def get_user(user_id):
        user_ref = db.collection('users').document(user_id).get()
        return user_ref.to_dict() if user_ref.exists else None


class Question:
    """Class to represent a question in Firestore."""

    @staticmethod
    def add_question(question_id, topic, subtopic, difficulty, question_text, choices, answer):
        question_data = {
            'topic': topic,
            'subtopic': subtopic,
            'difficulty': difficulty,
            'question_text': question_text,
            'choices': choices,
            'answer': answer
        }
        db.collection('questions').document(question_id).set(question_data)

    @staticmethod
    def get_questions_by_topic(topic):
        questions = db.collection('questions').where('topic', '==', topic).stream()
        return [q.to_dict() for q in questions]


class LearningHistory:
    """Manage individual user learning history in Firestore."""

    @staticmethod
    def add_history_entry(user_id, question_id, correct):
        """Add a new entry to the user's learning history."""
        entry = {
            'question_id': question_id,
            'correct': correct,
            'attempt_date': datetime.now()
        }
        # Add entry to the user's 'learning_history' subcollection
        db.collection('users').document(user_id).collection('learning_history').add(entry)

    @staticmethod
    def get_history_by_user(user_id):
        """Retrieve all learning history entries for a specific user."""
        history_ref = db.collection('users').document(user_id).collection('learning_history').stream()
        return [h.to_dict() for h in history_ref]