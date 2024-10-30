import React, { useEffect, useRef, useState } from "react";
import "./hamburgerMenu.css" 
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
                <button className="hamburger-button" aria-label="Toggle navigation" onClick={toggleSidebar} ref={sidebarRef}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </button>
                <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`} ref={sidebarRef}>
                    <nav className="sidebar-content">
                        <a href="#home">Home</a>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu