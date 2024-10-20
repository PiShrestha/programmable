import React from 'react';
import './SignButtons.css';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  // destructure object
  const { googleSignIn } = UserAuth();
  // navigate instance
  const navigate = useNavigate();

  // make sign-in call
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/home");  // redirect to home
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="sign-in-or-out" onClick={handleGoogleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;