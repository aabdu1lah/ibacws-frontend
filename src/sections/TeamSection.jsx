import React from 'react';
import { teamMembers } from '../constants/teamData';
import Card from "../components/ui/Card"

const Team = () => {
    return (
        <section id="team" className="bg-2a2b4b py-12 md:py-24">
            <div className="container mx-auto px-6">
                <h1 className="heading-cute text-center mb-8 md:mb-12 text-3xl md:text-5xl font-extrabold text-white">
                    Meet the Team
                </h1>
                <div className="w-full max-w-6xl mx-auto transform transition-all duration-300 scale-95 hover:scale-100">
                    <h2 className="heading-cute text-center mb-6 text-2xl md:text-4xl font-bold text-pink-300">
                        CWS Patron
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {teamMembers.filter(member => member.role === 'Patron').map(member => (
                            <Card key={member.name} className="flex flex-col items-center text-center p-6 transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 border-4 border-pink-400"
                                />
                                <h2 className="text-xl md:text-2xl font-bold text-ffb1df mb-1">{member.name}</h2>
                                <p className="text-md font-semibold text-gray-300">{member.role}</p>
                            </Card>
                        ))}
                    </div>

                    <h2 className="heading-cute text-center mb-6 text-2xl md:text-4xl font-bold text-pink-300">
                        C-Suite Executives
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.filter(member => member.role !== 'Patron').map(member => (
                            <Card key={member.name} className="flex flex-col items-center text-center p-6 transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 border-4 border-cyan-400"
                                />
                                <h2 className="text-xl md:text-2xl font-bold text-ffb1df mb-1">{member.name}</h2>
                                <p className="text-md font-semibold text-gray-300">{member.role}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
