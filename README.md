# Programmable

## Overview

This project is a web app designed for aspiring Computer Science students to practice and strengthen their coding skills. Whether you're just starting out or want to brush up on specific topics, our platform offers a range of challenges to help you grow.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage Instructions](#usage-instructions)
- [Features](#features)
- [License](#license)
- [Future Features](#future-features)

## ⚠️ Notice

The serverAccountKey from Firebase is private. It must be securely configured in config/serviceAccountKey.json. Make sure this file is properly set up before running the project to ensure backend functionality. Also you will need to set up the questions by running `upload.mjs`.

## Technologies Used

- **Flask**: A lightweight web framework for Python.
- **React**: A JavaScript library for building user interfaces (frontend).
- **React Router**: A library for routing in React applications.
- **Context API**: RESTful APIs for user authentication, question retrieval, and progress tracking.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/PiShrestha/programmable.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd programmable
   ```

3. **Install Backend Dependencies**:
   Make sure you have [Python](https://www.python.org/downloads/) installed. Then run:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Frontend Dependencies**:
   Navigate to the frontend directory and install the dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Project

To run the project locally, follow these steps:

1. **Start the Flask Backend**:
   From the backend directory of the project, run:
   ```bash
   python run.py
   ```
   This will start the Flask server, typically at `http://localhost:5000`.

2. **Start the React Frontend**:
   In a new terminal window, navigate to the frontend directory and run:
   ```bash
   npm start
   ```
   The React application will be available at `http://localhost:3000`.

## Usage Instructions

After starting the application, follow these steps:
- Navigate to the login page and sign in using your credentials.
- Explore the different coding challenges available on the platform.
- Track your progress through the dashboard.

## Features

- Daily Progress: Users must complete 10 questions daily for progress tracking.
- Streak Tracking: Built-in streak tracker using user authentication.

## License

This project is licensed under the MIT License.

## Future Features

- Add user profiles to enhance personalization and user engagement.
- Include additional programming languages, such as Python, to broaden usability and functionality.
- Integrate a visual dashboard similar to LeetCode for activity statistics.


