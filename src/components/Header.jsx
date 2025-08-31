import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {images} from "../assets/assets.js";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="navbar-cute py-2.5 px-4 fixed w-full z-20">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo + Title */}
                <div className="flex items-center space-x-2">
                    <img
                        src={images.favicon}
                        alt="IBA Community Welfare Society Logo"
                        className="h-8 w-auto dark:filter-none"
                    />
                    <span className="text-base md:text-lg font-semibold text-f0f0f8">
                        IBA Community Welfare Society
                    </span>
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center space-x-5">
                    <li>
                        <a href="#goals"
                           className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Goals
                        </a>
                    </li>
                    <li>
                        <a href="#past-events"
                           className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Events
                        </a>
                    </li>
                    <li>
                        <a href="#departments"
                           className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Departments
                        </a>
                    </li>
                    <li>
                        <a href="#why-join-us"
                           className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Why Join Us
                        </a>
                    </li>
                    <li>
                        <a href="#contact"
                           className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Contact
                        </a>
                    </li>
                    <li>
                        <Link
                            to="/form/ec"
                            className="btn-cute text-sm text-black"
                        >
                            EC Sign-up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/form/mt"
                            className="btn-cute text-sm text-black"
                        >
                            MT Sign-up
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-e0e0e8 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X className="w-7 h-7"/> : <Menu className="w-7 h-7"/>}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full bg-[rgba(35,32,63,0.98)] backdrop-blur-none py-4 px-6 shadow-lg border-t border-[rgba(255,141,199,0.15)]  h-screen inset-0">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a href="#goals"
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 hover:text-ffb1df transition-colors">
                                Goals
                            </a>
                        </li>
                        <li>
                            <a href="#past-events"
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 hover:text-ffb1df transition-colors">
                                Events
                            </a>
                        </li>
                        <li>
                            <a href="#departments"
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 hover:text-ffb1df transition-colors">
                                Departments
                            </a>
                        </li>
                        <li>
                            <a href="#why-join-us"
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 hover:text-ffb1df transition-colors">
                                Why Join Us
                            </a>
                        </li>
                        <li>
                            <a href="#contact"
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 hover:text-ffb1df transition-colors">
                                Contact
                            </a>
                        </li>
                        <li className="pt-8 border-t border-[rgba(255,141,199,0.15)]">
                            <Link
                                to="/form/ec"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-cute w-full py-2 text-black text-sm mb-2"
                            >
                                EC Sign-up
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/form/mt"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-cute w-full py-2 text-black text-sm"
                            >
                                MT Sign-up
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
