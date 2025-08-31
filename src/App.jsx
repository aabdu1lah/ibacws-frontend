import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import './assets/styles/main.css';
import ApplicationFormPage from "./pages/ApplicationFormPage.jsx";

const AppContent = () => {
    const location = useLocation();
    const isFormPage = location.pathname.startsWith('/form');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div>
            {!isFormPage && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/form/ec" element={<ApplicationFormPage formType='EC' />} />
                    <Route path="/form/mt" element={<ApplicationFormPage formType='MT' />} />
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
