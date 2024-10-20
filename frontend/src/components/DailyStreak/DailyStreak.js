import React from 'react';
import './DailyStreak.css';

const DailyStreak = ({ dailyStreak }) => {
    return (
        <div>
            <span className='daily-streak-text'>
                🔥 {dailyStreak} day streak
            </span>
        </div>
    );
};

export default DailyStreak;