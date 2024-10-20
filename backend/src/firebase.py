# src/firebase.py
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin

# Initialize Firebase Admin SDK only once
if not firebase_admin._apps:  # Check if Firebase is already initialized
    cred = credentials.Certificate('config/serviceAccountKey.json')
    initialize_app(cred)

# Create Firestore client (only once)
db = firestore.client()
