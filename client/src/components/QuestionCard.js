import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionData, onAnswerSelection }) => {
    return (
        <div className="question-card">
            <h3>{questionData.question}</h3>
            <ul className="options-list">
                {Object.entries(questionData.options).map(([key, value]) => (
                    <li key={key} className="option">
                        <label>
                            <input 
                                type="radio" 
                                name={`question-${questionData.id}`} 
                                value={key} 
                                onChange={() => onAnswerSelection(key)}
                            />
                            {`${key}: ${value}`}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionCard;