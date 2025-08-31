import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AboutUsContent from '../components/AboutUsContent';

const AboutUsPage = ({ setCurrentPage }) => {
    return (
        <>
            <Header setCurrentPage={setCurrentPage} />
            <main className="flex-grow pt-14 bg-cute-gradient">
                <AboutUsContent />
            </main>
            <Footer />
        </>
    );
};

export default AboutUsPage;