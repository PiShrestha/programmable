import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Start.css'; 

const SignIn = () => {
  const { googleSignIn } = UserAuth();
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
      <button className="start-button" onClick={handleGoogleSignIn}>Get Started →</button>
    </div>
  );
};

export default SignIn;