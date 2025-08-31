import React from "react";
import Card from "./ui/Card.jsx";

const WhyJoinUs = () =>  {
    return (
        <section id="why-join-us" className="section-padding bg-cute-gradient">
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Why Join Us?</h2> {/* Responsive text size */}
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    Become a part of a vibrant community making a real difference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="p-6 md:p-8">
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Make an Impact</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Contribute directly to welfare projects and see the positive change you create.
                        </p>
                    </Card>
                    <Card className="p-6 md:p-8">
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Develop Skills</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Enhance your leadership, teamwork, and organizational skills through hands-on experience.
                        </p>
                    </Card>
                    <Card className="p-6 md:p-8">
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Expand Your Network</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Connect with fellow students, faculty, and community leaders.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default WhyJoinUs;