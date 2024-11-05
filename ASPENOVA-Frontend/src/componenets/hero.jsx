import React from 'react';
import './Hero.css';

const Hero = () => {
    
  return (
    <div className="hero-container">
        <div className="hero">
            <div className="hero-content">
            <h1>Hello, I'm Sawyer McKenney</h1>
            <p>Computer Science Student | Developer | Tech Enthusiast</p>
            <div class="hero-button-container">
                <a href="#about" class="hero-button">Learn More</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;