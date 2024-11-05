import React, { useEffect, useRef, useState } from "react";
import "./hamburgerMenu.css" 
import '../index.css';
const HamburgerMenu = () => {
    const[isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleClickOutside = (event) => {
        if(sidebarRef.current && !sidebarRef.current.contains(event.target))
        {
            setSidebarOpen(false);
        }  
    };
    useEffect(() => {
        if(isSidebarOpen){
            document.addEventListener('mousedown', handleClickOutside);
        }
        else{
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);
    
    return(
        <div className="navBar">
            <div className='hamburger-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="hamburger-button" 
                aria-label="Toggle navigation" 
                onClick={toggleSidebar} 
                ref={sidebarRef}>
            <path className="hamburger-lines" strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
                <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`} ref={sidebarRef}>
                <nav className="sidebar-content">
                    <a href="#home" className="py-2 px-4 rounded bg-black-600 text-white hover:bg-white hover:text-black transition duration-300">Home</a>
                    <a href="#portfolio" className="py-2 px-4 rounded bg-black-600 text-white hover:bg-white hover:text-black transition duration-300">Portfolio</a>
                    <a href="#blog" className="py-2 px-4 rounded bg-black-600 text-white hover:bg-white hover:text-black transition duration-300">Blog</a>
                    <a href="#contact" className="py-2 px-4 rounded bg-black-600 text-white hover:bg-white hover:text-black transition duration-300">Contact</a>
                </nav>
                </div>
            </div>
            
        </div>
    )
}

export default HamburgerMenu