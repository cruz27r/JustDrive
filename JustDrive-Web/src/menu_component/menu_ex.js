import React from 'react';
import './menu_style.css'; // Ensure this file has the necessary styles

const MenuComponent = () => {
    const handleMenuClick = () => {
        document.getElementById('menu-button').classList.add('hidden');
        document.getElementById('popup-menu').classList.remove('hidden');
    };

    const handleExitClick = () => {
        document.getElementById('popup-menu').classList.add('hidden');
        document.getElementById('menu-button').classList.remove('hidden');
    };

    return (
        <div className="menu-container">
            <button id="menu-button" className="button-6" onClick={handleMenuClick}>Menu</button>
            <div id="popup-menu" className="popup-menu hidden">
                <button className="button-6 popup-item">Recent</button>
                <button className="button-6 popup-item">★</button>
                <button className="button-6 popup-item">Saved</button>
                <button id="exit-button" className="button-6 exit-button" onClick={handleExitClick}>&times;</button>
            </div>
        </div>
    );
};

export default MenuComponent;
