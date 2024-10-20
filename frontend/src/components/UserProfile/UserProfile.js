import React, { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import DailyStreak from '../DailyStreak/DailyStreak';
import { fetchUserData } from '../../utils/fetchUserData';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const data = await fetchUserData(user.uid);
                setUserData(data);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            {userData && (
                <div className="profile-content">
                    <DailyStreak dailyStreak={userData.dailyStreak} />
                    <ProgressBar correctQuestionsToday={userData.correctQuestionsToday} />
                </div>
            )}
        </div>
    );
};

export default UserProfile;