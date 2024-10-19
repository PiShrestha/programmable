# Entry point to run Flask app
from src import create_app

app = create_app()  # Create Flask app

if __name__ == "__main__":
    app.run(debug=True)  # Run app in debug mode