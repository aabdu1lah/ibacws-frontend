import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ApplicationForm from '../components/ApplicationForm';

const MTApplicationPage = ({ setCurrentPage }) => {
  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-grow pt-14 flex items-center justify-center bg-cute-gradient">
        <ApplicationForm isMT={true} setCurrentPage={setCurrentPage} />
      </main>
      <Footer />
    </>
  );
};

export default MTApplicationPage;