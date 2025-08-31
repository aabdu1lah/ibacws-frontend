import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../sections/Hero.jsx';
import Goals from '../sections/Goals.jsx';
import PastEvents from '../sections/PastEvents.jsx';
import Departments from '../sections/Departments.jsx';
import WhyJoinUs from '../sections/WhyJoinUs.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../components/Footer.jsx';

// HomePage now just renders its content, without worrying about navigation state.
const HomePage = () => {
    return (
        <>
            <main className="flex-grow pt-14">
                <Hero />
                <Goals />
                <PastEvents />
                <Departments />
                <WhyJoinUs />
                <Contact />
            </main>
        </>
    );
};

export default HomePage;
