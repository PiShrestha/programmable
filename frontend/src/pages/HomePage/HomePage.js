import React from 'react';
import Header from '../../components/Header/HeaderGeneral';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import javaImage from '../../assets/images/java.png';
import pythonImage from '../../assets/images/python.png';
import sqlImage from '../../assets/images/mySQL.png';
import dsaImage from '../../assets/images/dsa.png';
import jsImage from '../../assets/images/javascript.png';
import cppImage from '../../assets/images/cpp.png';
import { UserAuth } from '../../context/AuthContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './HomePage.css';

const HomePage = () => {
    const categories = [
        { title: 'Java Foundations', description: 'Practice the foundational skills of Java', imageSrc: javaImage, uri: '/topics/java-foundations' },
        { title: 'Python', description: 'Practice Python basics', imageSrc: pythonImage, uri: '/topics/python-basics' },
        { title: 'mySQL', description: 'Practice mySQL basics', imageSrc: sqlImage, uri: '/topics/mysql-basics' },
        { title: 'Data Structures & Algorithms', description: 'Master your DSA skills', imageSrc: dsaImage, uri: '/topics/dsa-skills' },
        { title: 'JavaScript', description: 'Sharpen your JavaScript skills', imageSrc: jsImage, uri: '/topics/javascript-skills' },
        { title: 'C++', description: 'Improve your C++ programming skills', imageSrc: cppImage, uri: '/topics/cpp-skills' },
      ];  

      const { user } = UserAuth();

    return (
        <div className="home-page">
            <Header text={"Welcome back, " + user.displayName + "👋"}/>
            <UserProfile />
            <div className="category-container">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={index}
                        title={category.title}
                        description={category.description}
                        imageSrc={category.imageSrc}
                        uri={category.uri}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;