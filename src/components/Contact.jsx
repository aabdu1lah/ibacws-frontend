import React from "react";
import Card from "./ui/Card";
import channels from "../constants/channels.jsx";

const Contact = () => {
    const currentChannels = channels;

    return (
        <section id="contact" className="section-padding">
            <div className="container mx-auto text-center py-4">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Get In Touch</h2>
                <p className="subheading-cute mb-12 max-w-1xl mx-auto text-base md:text-lg">
                    We'd love to hear from you! Connect with us through our official channels.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                    {currentChannels.map((channel, index) => (
                        <Card className="px-2.5 py-1.5">
                            <a
                                key={index}
                                href={channel.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-base md:text-lg group"
                            >
                                {channel.icon}
                                <span>{channel.text}</span>
                            </a>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;