import React from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import Start from '../../components/Start/Start';

// Import images
import jonathanImage from '../../assets/images/jonathan.jpeg';
import kyleImage from '../../assets/images/blank.webp';
import pratikImage from '../../assets/images/pratik.jpeg';

const LandingPage = () => {
    return (
        <div className="LandingPage">
            <Header />
            <section className="hero">
                <div className="typewriter">
                    <h1>Programmable</h1>
                </div>
                <p className="hero-description">Learn, build, and develop your computer science fundamentals.</p>
                <Start />
            </section>

            <section id="about" className="content-section">
                <h2>About</h2>
                <p>
                    Programmable is a web app designed for aspiring Computer Science students to practice and strengthen 
                    their coding skills. Whether you're just starting out or want to brush up on specific topics, our platform 
                    offers a range of challenges to help you grow.
                </p>
            </section>

            <section id="features" className="content-section">
                <h2>Features</h2>
                <ul className="feature-list">
                    <li><strong>Topic-Based Learning:</strong> Choose from Python, Java, Data Structures, and more.</li>
                    <li><strong>Daily Challenges:</strong> Complete daily tasks to build a consistent learning habit.</li>
                    <li><strong>Progress Tracking:</strong> Visual dashboard to monitor your achievements and streaks.</li>
                    <li><strong>Adaptive Difficulty:</strong> Problems get progressively harder as you improve.</li>
                    <li><strong>User Authentication:</strong> Sign in with your Google account to save progress.</li>
                </ul>
            </section>

            {/* target="_blank" makes the link open in a new tab or window when clicked*/}
            {/*rel="noopener noreferrer" prevents the new page from being able to access the previous page's property*/}
                
            <section id="contact" className="content-section">
                <h2>Contact</h2>
                <p>If you have any questions, feel free to reach out to us on LinkedIn:</p>
                
                <div className="team-members">
                    <div className="team-member">
                        <a href="https://www.linkedin.com/in/jonathanlam2/" target="_blank" rel="noopener noreferrer">
                            <img src={jonathanImage} alt="Jonathan Lam" className="profile-pic" />
                        </a>
                        <p>Jonathan Lam</p>
                    </div>
                    <div className="team-member">
                        <a href="https://www.linkedin.com/in/kylewl/" target="_blank" rel="noopener noreferrer">
                            <img src={kyleImage} alt="Kyle Luong" className="profile-pic" />
                        </a>
                        <p>Kyle Luong</p>
                    </div>
                    <div className="team-member">
                        <a href="https://www.linkedin.com/in/pratik-shrestha-28a379225/" target="_blank" rel="noopener noreferrer">
                            <img src={pratikImage} alt="Pratik Shrestha" className="profile-pic" />
                        </a>
                        <p>Pratik Shrestha</p>
                    </div>
                </div>
            </section>

            {/* Add Footer component here */}
        </div>
    );
};

export default LandingPage;
