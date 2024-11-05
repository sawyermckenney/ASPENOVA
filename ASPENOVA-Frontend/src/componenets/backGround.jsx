import React, { useEffect, useState } from 'react';
import './background.css';

const ReactiveBackground = () => {
  const [style, setStyle] = useState({
    backgroundColor: 'white',
    filter: 'brightness(100%)',
    transition: 'filter 0.3s ease',
    height: '100vh',
    width: '100vw',
    position: 'fixed', // Ensures it stays behind other content
    top: 0,
    left: 0,
    zIndex: -1, // Places it behind all other elements
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollRatio = window.scrollY / window.innerHeight;
      const brightnessValue = Math.max(100 - scrollRatio * 30, 50); // Darken up to 50% brightness

      setStyle((prevStyle) => ({
        ...prevStyle,
        filter: `brightness(${brightnessValue}%)`,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div style={style} className="reactive-background"></div>;
};

export default ReactiveBackground;