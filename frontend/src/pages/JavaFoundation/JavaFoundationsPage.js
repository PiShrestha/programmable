import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '../../components/Header/HeaderGeneral';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { fetchUserData } from '../../utils/fetchUserData';
import { doc } from 'firebase/firestore';
import './JavaFoundationsPage.css';

const JavaFoundationsPage = () => {
    const { user } = UserAuth();
    const userId = user ? user.uid : null;
    const [questions, setQuestions] = useState([]);
    // keep track of which question user is on
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // answer currently chosen
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    // verify answer
    const [isCorrect, setIsCorrect] = useState(false);
    // feedback whether user is right or not
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctQuestionsToday, setCorrectQuestionsToday] = useState(0);
    const navigate = useNavigate();

    // get questions and user's current correctQuestionsToday
    useEffect(() => {
        if (!userId) {
            console.error('User ID is undefined');
            return;
        }

        const fetchQuestionsAndUserData = async () => {
            // get the questions
            const querySnapshot = await getDocs(collection(db, 'questions'));
            // filter relevant document data
            const questionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setQuestions(questionsList);

            // use fetchUserData
            const userData = await fetchUserData(userId);
            if (userData) {
                setCorrectQuestionsToday(userData.correctQuestionsToday);
            }
        };

        fetchQuestionsAndUserData();
    }, [userId]);

    // update answer
    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    // increment correctQuestionsToday if answer is correct
    const handleSubmit = async () => {
        if (selectedAnswer) {
            const correctAnswer = questions[currentQuestionIndex].answer;
            const isAnswerCorrect = selectedAnswer === correctAnswer;
            setIsCorrect(isAnswerCorrect);
            setShowFeedback(true);

            // if the answer is correct and correctQuestionsToday < 10, increment it
            if (isAnswerCorrect && correctQuestionsToday < 10) {
                const userRef = doc(db, 'users', userId);
                await updateDoc(userRef, {
                    correctQuestionsToday: correctQuestionsToday + 1
                });
                setCorrectQuestionsToday(prev => prev + 1);
            }
        }
    };

    // hides feedback, shifts to next question, and if at last question, send user back home
    const handleContinue = () => {
        setShowFeedback(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/home');
        }
    };

    // go back to home
    const handleExitClick = () => {
        navigate('/home');
    };

    // show loading until questions are fetched
    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    // get current question based on index
    const currentQuestion = questions[currentQuestionIndex];

    // show loading until questions are fetched
    if (questions.length === 0 || !currentQuestion) {
        return <div>Loading...</div>;
    }

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
                    {/* Shows up when question is checked, conditional response */}
                    {showFeedback && (
                        <div className={`feedback ${showFeedback ? 'slide-up' : ''}`}>
                            <p>{isCorrect ? "Correct! 🎉" : `Wrong! The correct answer is: ${currentQuestion.answer}`}</p>
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