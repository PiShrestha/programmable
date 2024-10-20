from flask import Flask
from .routes import bp  # Import the routes blueprint

def create_app():
    app = Flask(__name__)  # Create a new Flask app
    app.config.from_object('src.config.Config')  # Load configuration

    # Register the routes blueprint
    app.register_blueprint(bp)

    return app