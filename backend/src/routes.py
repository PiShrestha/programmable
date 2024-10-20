from flask import Blueprint, jsonify, request
from src.models import User, LearningHistory  # Import models
from src.recommendations import RecommendationSystem  # Recommendation logic
from src.auth import verify_token  # Import token verification logic

bp = Blueprint('api', __name__)  # Initialize the blueprint

@bp.route('/questions/recommend', methods=['GET'])
def get_question_recommendation():
    """Get a recommended question for the user."""
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):
        return decoded_token  # Handle authentication failure

    user_id = decoded_token['uid']  # Get user ID from token
    selected_topic = request.args.get('topic')  # Get the selected topic

    recommender = RecommendationSystem(user_id, selected_topic)  # Initialize recommender
    question = recommender.recommend_question()  # Get the recommended question

    return jsonify({
        'id': question['id'],
        'question': question['question_text'],
        'choices': question['choices'],
        'difficulty': question['difficulty']
    })

@bp.route('/user/streak', methods=['GET'])
def get_user_streak():
    """Get the user's daily streak and progress."""
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):
        return decoded_token  # Handle authentication failure

    user_id = decoded_token['uid']  # Get user ID from token
    user = User.get_user(user_id)  # Fetch user from Firestore

    if not user:
        return jsonify({"message": "User not found."}), 404

    return jsonify({
        'streak': user.get('streak', 0),
        'daily_progress': user.get('daily_progress', 0)
    })

@bp.route('/performance', methods=['POST'])
def update_performance():
    """Update the user's performance based on their answer."""
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):
        return decoded_token  # Handle authentication failure

    user_id = decoded_token['uid']  # Get user ID from token
    data = request.json  # Parse request data
    question_id = data['question_id']
    correct = data['correct']

    recommender = RecommendationSystem(user_id, data['topic'])
    recommender.update_learning_history(question_id, correct)  # Update history

    return jsonify({"message": "Performance updated!"})

@bp.route('/user/register', methods=['POST'])
def register_user():
    """Register a new user."""
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):
        return decoded_token  # Handle authentication failure

    user_id = decoded_token['uid']  # Get user ID from token
    username = request.json.get('username')

    User.create_user(user_id, username)  # Add user to Firestore
    return jsonify({"message": "User registered successfully!"}), 201

@bp.route('/history', methods=['GET'])
def get_user_history():
    """Get the user's learning history."""
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):
        return decoded_token  # Handle authentication failure

    user_id = decoded_token['uid']  # Get user ID from token
    history = LearningHistory.get_history_by_user(user_id)  # Fetch history

    return jsonify(history)