import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    // Check if the current path starts with '/dashboard'
    const isDashboardPage = location.pathname.startsWith('/dashboard');

    return (
        <header className="navbar-cute text-e0e0e8 py-2.5 px-4 fixed w-full z-20">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo + Title */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/favicon.svg"
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
                        <Link to="/" className="text-sm md:text-base hover:text-ffb1df transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            isDashboardPage ? (
                                <button onClick={logout} className="btn-cute py-1.5 px-3 text-sm text-black">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/dashboard" className="btn-cute py-1.5 px-3 text-sm text-black">
                                    Dashboard
                                </Link>
                            )
                        ) : (
                            <Link to="/dashboard/login" className="btn-cute py-1.5 px-3 text-sm text-black">
                                Login
                            </Link>
                        )}
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
                    className="md:hidden absolute top-full left-0 w-full bg-[rgba(35,32,63,0.98)] backdrop-blur-none py-4 px-6 shadow-lg border-t border-[rgba(255,141,199,0.15)] h-screen inset-0">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-ffb1df transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                isDashboardPage ? (
                                    <button onClick={logout} className="btn-cute w-full py-2 text-sm">
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="btn-cute w-full py-2 text-sm">
                                        Dashboard
                                    </Link>
                                )
                            ) : (
                                <Link to="/dashboard/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-cute w-full py-2 text-sm">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;