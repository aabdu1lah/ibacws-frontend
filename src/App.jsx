import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ApplicationFormPage from './pages/ApplicationFormPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import OurTeamPage from './pages/OurTeamPage.jsx';
import './assets/styles/main.css';

const AppContent = () => {
    const location = useLocation();

    // Scroll to the top of the page on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Handle scrolling to specific sections when a hash is present in the URL
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Use a slight delay to ensure the page has rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.hash]);

    const isFormPage = location.pathname.startsWith('/forms');

    return (
        <div className="font-inter antialiased text-e0e0e8 bg-1a1a2e min-h-screen flex flex-col">
            {!isFormPage && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forms/ec" element={<ApplicationFormPage formType="EC" />} />
                    <Route path="/forms/mt" element={<ApplicationFormPage formType="MT" />} />
                    <Route path="/dashboard/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/our-team" element={<OurTeamPage />} />
                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
