import React from 'react';
import SignIn from './SignIn';
import { UserAuth } from '../context/AuthContext';
import './Header.css';
import SignOut from './SignOut';

const HeaderGeneral = ({text}) => {
    const { user } = UserAuth();

    return (
        <div>
            <header>
                <nav>
                    <div className="logo"><a href="/">Programmable</a></div>
                    <div className="placeholder">
                        {text}
                    </div>
                    <div className="auth-buttons">
                        {user?.displayName ? (
                            <SignOut />
                        ) : (
                            <SignIn />
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderGeneral;