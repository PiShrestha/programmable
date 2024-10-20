import React from 'react';
import './SignButtons.css';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  // destructure object
  const { googleSignOut } = UserAuth();
  const navigate = useNavigate();

  // make sign-out call
  const handleGoogleSignOut = async () => {
    try {
      await googleSignOut();
      navigate("/");  // Redirect to the landing page

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="sign-in-or-out" onClick={handleGoogleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;