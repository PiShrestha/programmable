from firebase_admin import auth
from flask import request, jsonify

def verify_token():
    """Verify the Firebase ID token from the request headers."""
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return jsonify({"message": "Missing Authorization header"}), 401

    try:
        id_token = auth_header.split(" ")[1]  # Extract token from "Bearer <token>"
        decoded_token = auth.verify_id_token(id_token)  # Verify token
        return decoded_token  # Return decoded token if valid
    except Exception as e:
        return jsonify({"message": str(e)}), 401