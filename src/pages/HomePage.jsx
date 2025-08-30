import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Goals from '../components/Goals';
import PastEvents from '../components/PastEvents';
import Departments from '../components/Departments';
import WhyJoinUs from '../components/WhyJoinUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

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