import React, { useState } from 'react';
import Header from '../../components/Header/HeaderGeneral';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import questionsData from '../../data/java_fundamentals.json';
import { useNavigate } from 'react-router-dom';
import './JavaFoundationsPage.css';

const JavaFoundationsPage = () => {
    // keep track of which question user is on
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // answer currently chosen
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    // verify answer
    const [isCorrect, setIsCorrect] = useState(false);
    // feedback whether user is right or not
    const [showFeedback, setShowFeedback] = useState(false);
    // routing
    const navigate = useNavigate();

    const currentQuestion = questionsData.questions[currentQuestionIndex];

    // update answer
    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    // compare answer with correct one and update feedback message
    const handleSubmit = () => {
        if (selectedAnswer) {
            const correctAnswer = currentQuestion.correctAnswer;
            setIsCorrect(selectedAnswer === correctAnswer);
            setShowFeedback(true);
        }
    };

    // hides feedback, shifts to next question, and if at last question, send user back home
    const handleContinue = () => {
        setShowFeedback(false);
        if (currentQuestionIndex < questionsData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/home');
        }
    };

    // go back to home
    const handleExitClick = () => {
        navigate('/home');
    };

    return (
        <div className="questions-page">
            <header>
                <Header text={"Java Foundations"} />
            </header>
            <div className="exit-icon" onClick={handleExitClick} role="button" tabIndex={0}>
                &#8592;
            </div>
            <div className="content-container">
                <div className="question-container">
                    <QuestionCard 
                        questionData={currentQuestion} 
                        onAnswerSelection={handleAnswerSelection} 
                    />
                    <button className="check-button" onClick={handleSubmit}>
                        Check
                    </button>

                    {/* shows up when question is checked, conditional response */}
                    {showFeedback && (
                        <div className={`feedback ${showFeedback ? 'slide-up' : ''}`}>
                            <p>{isCorrect ? "Correct! 🎉" : `Wrong! The correct answer is: ${currentQuestion.correctAnswer}`}</p>
                            <button className="continue-button" onClick={handleContinue}>
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JavaFoundationsPage;
