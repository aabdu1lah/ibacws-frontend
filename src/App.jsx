import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ECApplicationPage from './pages/ECApplicationPage';
import MTApplicationPage from './pages/MTApplicationPage';
import './assets/styles/main.css';

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signup', or 'mtsignup'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // This component now acts as the main router for the application
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'signup':
                return <ECApplicationPage setCurrentPage={setCurrentPage} />;
            case 'mtsignup':
                return <MTApplicationPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="font-inter antialiased text-e0e0e8 bg-1a1a2e">
            {renderPage()}
        </div>
    );
};

export default App;