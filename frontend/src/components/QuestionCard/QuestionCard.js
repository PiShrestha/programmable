import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionData, onAnswerSelection }) => {
    return (
        <div className="question-card">
            <h3>{questionData.questionText}</h3>
            <ul className="options-list">
                {questionData.choices.map((choice, index) => (
                    <li key={index} className="option">
                        <label>
                            <input 
                                type="radio" 
                                name={`question-${questionData.id}`} 
                                value={choice} 
                                onChange={() => onAnswerSelection(choice)}
                            />
                            {choice}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionCard;