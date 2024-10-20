import React from 'react';
import './ProgressBar.css'; // CSS for styling

const ProgressBar = ({ correctQuestionsToday }) => {
  // Calculate width based on correctQuestionsToday (1-10 scale)
  const progressWidth = `${(correctQuestionsToday / 10) * 100}%`;
  
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progressWidth }}></div>
      </div>
      <span className="progress-info">
        {correctQuestionsToday}/10 Daily Questions
      </span>
    </div>
  );
};

export default ProgressBar;