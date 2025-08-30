import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import React from "react";

const Contact = (
    <section id="contact" className="section-padding"> {/* No specific custom background class, will inherit body background */}
        <div className="container mx-auto px-6 text-center">
            <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Get In Touch</h2> {/* Responsive text size */}
            <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                We'd love to hear from you! Connect with us through our channels.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8"> {/* Responsive gap */}
                <a
                    href="mailto:cws@khi.iba.edu.pk"
                    target="_blank" // Added target for external links
                    rel="noopener noreferrer" // Added rel for security
                    className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-base md:text-lg group" // Responsive text size
                >
                    <Mail className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-cyan-400" /> {/* Responsive icon size */}
                    <span>cws@khi.iba.edu.pk</span>
                </a>
                <a
                    href="https://instagram.com/ibacws"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-base md:text-lg group" // Responsive text size
                >
                    <FaInstagram className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-pink-400" /> {/* Responsive icon size */}
                    <span>@ibacws</span>
                </a>
                <a
                    href="https://www.linkedin.com/company/ibacws/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-base md:text-lg group" // Responsive text size
                >
                    <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-yellow-400" /> {/* Responsive icon size */}
                    <span>@ibacws</span>
                </a>
            </div>
        </div>
    </section>
);

export default Contact;