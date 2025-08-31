import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

const ContactPage = ({ setCurrentPage }) => {
    return (
        <>
            <Header setCurrentPage={setCurrentPage} />
            <main className="flex-grow pt-14 bg-cute-gradient">
                <div className="container mx-auto px-6 py-12 md:py-24">
                    <h2 className="heading-cute text-center mb-12">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;