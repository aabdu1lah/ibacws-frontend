import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ApplicationForm from '../components/ApplicationForm.jsx';
import ApplicationInfo from '../components/ApplicationInfo.jsx'; // Import the new component
import Card from '../components/ui/Card.jsx';
import { ChevronRight } from 'lucide-react';

const ECApplicationPage = ({ setCurrentPage }) => {
    return (
        <>
            <Header setCurrentPage={setCurrentPage} />
            <main className="flex-grow pt-14 bg-cute-gradient">
                <div className="container mx-auto px-6 py-12 md:py-24">
                    <Card className="max-w-3xl mx-auto p-8 md:p-12">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="mb-6 flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-sm md:text-base"
                        >
                            <ChevronRight className="rotate-180 w-4 h-4 mr-2 text-pink-400" /> Back to Home
                        </button>
                        <h1 className="heading-cute text-center mb-6 animate-fadeIn text-3xl md:text-4xl">
                            Executive Council Sign-up
                        </h1>
                        <p className="subheading-cute text-center mb-10 max-w-2xl mx-auto text-base md:text-lg">
                            Ready to lead and make a difference? Join our Executive Council and shape the future of our society!
                        </p>
                        <ApplicationInfo isMT={false} />
                        <ApplicationForm isMT={false} />
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ECApplicationPage;