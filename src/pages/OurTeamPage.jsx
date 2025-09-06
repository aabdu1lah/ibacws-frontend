import React from 'react';
import Card from '../components/ui/Card.jsx';
import { images } from '../assets/assets.js';

const OurTeamPage = () => {
    const officeBearers = [
        {
            role: 'President',
            name: 'Hania Nadeem',
            title: 'Chief Executive Officer',
            img: images.hania,
        },
        {
            role: 'COO',
            name: 'Syed Abdullah',
            title: 'Chief Operating Officer',
            img: images.abd,
        },
        {
            role: 'CFO',
            name: 'Preetam Khetpal',
            title: 'Chief Finance Officer',
            img: images.preetam,
        },
    ];

    const executiveCouncil = []; // This will be filled later

    const patron = {
        role: 'Patron',
        name: 'Dr. Salman Khalid',
        title: 'Assistant Professor Economics',
        img: images.drsalman,
    };

    return (
        <div className="flex flex-col min-h-screen bg-252a42 text-e0e0e8 font-inter">
            <main className="flex-grow pt-20 pb-10 px-4 md:px-8 bg-cute-gradient relative overflow-hidden text-center">
                {/* Background shapes for visual interest */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div
                        className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div
                        className="absolute top-1/2 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-cyan-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div
                        className="absolute bottom-1/4 left-1/2 w-40 h-40 md:w-56 md:h-56 bg-pink-700 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    {/* Office Bearers Section */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-center text-f0f0f8 mb-6">
                        Office Bearers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-16">
                        {officeBearers.map((member, index) => (
                            <Card key={index} className="w-72 p-6">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="rounded-full w-40 h-40 mx-auto mb-4 object-cover border-4 border-ffb1df shadow-md"
                                />
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-ffb1df font-medium text-sm">{member.title}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Executive Council Section */}
                    <div className="mt-16 text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-semibold text-f0f0f8 mb-6">
                            Executive Council
                        </h2>
                        {executiveCouncil.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                                {/* Map Executive Council members here when data is available */}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">
                                Members will be announced soon!
                            </p>
                        )}
                    </div>

                    {/* Patron Section */}
                    <div className="flex flex-col items-center">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-f0f0f8 mb-6">
                                Patron
                            </h2>
                            <Card className="w-72 p-6">
                                <img
                                    src={patron.img}
                                    alt={patron.name}
                                    className="rounded-full w-40 h-40 mx-auto mb-4 object-cover border-4 border-ffb1df shadow-md"
                                />
                                <h3 className="text-xl font-bold">{patron.name}</h3>
                                <p className="text-ffb1df font-medium text-sm">{patron.title}</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OurTeamPage;
