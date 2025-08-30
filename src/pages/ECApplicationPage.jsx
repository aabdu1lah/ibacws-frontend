import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationForm from '../components/ApplicationForm';

const ECApplicationPage = ({ setCurrentPage }) => {
    return (
        <>
            <Header setCurrentPage={setCurrentPage} />
            <main className="flex-grow pt-14 flex items-center justify-center bg-cute-gradient">
                <ApplicationForm isMT={false} setCurrentPage={setCurrentPage} />
            </main>
            <Footer />
        </>
    );
};

export default ECApplicationPage;