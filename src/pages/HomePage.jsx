import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Goals from '../components/Goals.jsx';
import PastEvents from '../components/PastEvents.jsx';
import Departments from '../components/Departments.jsx';
import WhyJoinUs from '../components/WhyJoinUs.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

const HomePage = ({ setCurrentPage }) => {
    return (
        <>
            <Header setCurrentPage={setCurrentPage} />
            <main className="flex-grow pt-14">
                <Hero setCurrentPage={setCurrentPage} />
                <Goals />
                <PastEvents />
                <Departments />
                <WhyJoinUs />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;