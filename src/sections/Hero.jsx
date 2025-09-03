import {ChevronRight} from "lucide-react";
import React from "react";
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative bg-cute-gradient text-e0e0e8 py-20 md:py-32 overflow-hidden shadow-lg" // Responsive padding
        >
            {/* Background shapes for visual interest - using Tailwind colors that fit the new theme */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div
                    className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                {/* Responsive size */}
                <div
                    className="absolute top-1/2 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-cyan-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                {/* Responsive size */}
                <div
                    className="absolute bottom-1/4 left-1/2 w-40 h-40 md:w-56 md:h-56 bg-pink-700 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                {/* Responsive size */}
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-slideInFromTop"> {/* Responsive text size */}
                    IBA Community Welfare Society
                </h1>
                <p className="text-lg md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slideInFromBottom"> {/* Responsive text size */}
                    Building a better community, one initiative at a time.
                </p>
                <div className="flex flex-col space-y-4 items-center"> {/* Add this wrapper */}
                    {/* <Link
                        to="/form/ec"
                        className="btn-cute py-2 px-6 md:py-3 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Join Our Executive Council! <ChevronRight className="inline-block ml-2 w-5 h-5"/>
                    </Link> */}

                    <Link
                        to="/forms/mt"
                        className="btn-cute py-2 px-6 md:py-3 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Join Our Management Team! <ChevronRight className="inline-block ml-2 w-5 h-5"/>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;