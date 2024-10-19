import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import JavaFoundationsPage from './pages/JavaFoundationsPage';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';

function App() {
  return (
    // context is a way to manage states globally across all components
    // saves the hassle of passing states down through props
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Routes>
            {/* root page directs to landing page */}
            <Route path="/" element={<LandingPage />} />            
            {/* Wrap home with protected to prevent null user access */}
            <Route path="/home" element={<Protected><HomePage /></Protected>} />
            {/* Protected route for Java Foundations topic */}
            <Route path="/topics/java-foundations" element={<Protected><JavaFoundationsPage /></Protected>} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
