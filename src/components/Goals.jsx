import {Rocket, Target, Users} from "lucide-react";
import React from "react";
import Card from "./ui/Card";

const Goals = () => {
    return (
        <section id="goals" className="section-padding"> {/* Changed: Added bg-cute-gradient */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Our Goals &
                    Agenda</h2> {/* Responsive text size */}
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    Committed to fostering positive change, our society strives for impactful community welfare through
                    various initiatives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="p-6 md:p-8"> {/* Responsive padding */}
                        <Target className="text-cyan-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Empowerment</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Empowering underprivileged communities through education and skill-building programs.
                        </p>
                    </Card>
                    <Card className="p-6 md:p-8"> {/* Responsive padding */}
                        <Users className="text-pink-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Support</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Providing essential aid and support to those in need, fostering a caring environment.
                        </p>
                    </Card>
                    <Card className="p-6 md:p-8"> {/* Responsive padding */}
                        <Rocket className="text-yellow-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Awareness</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Raising awareness about critical social issues and advocating for sustainable solutions.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default Goals;