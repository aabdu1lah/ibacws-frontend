import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import './assets/styles/main.css';
import ApplicationFormPage from "./pages/ApplicationFormPage.jsx";

const AppContent = () => {
    const location = useLocation();
    const isFormPage = location.pathname.startsWith('/forms');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div>
            {!isFormPage && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="/forms/ec" element={<ApplicationFormPage formType='EC' />} /> */}
                    <Route path="/forms/mt" element={<ApplicationFormPage formType='MT' />} />
                    
                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

// Main App component with BrowserRouter
const App = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
