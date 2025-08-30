import React from "react";
import departments from "../constants/Departments.js";

const Departments = (
    <section id="departments" className="section-padding"> {/* Removed bg-cute-gradient */}
        <div className="container mx-auto px-6 text-center">
            <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Our Departments</h2> {/* Responsive text size */}
            <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                Our society operates through various dedicated departments, each playing a crucial role in achieving our mission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {departments.map((dept, index) => (
                    <div
                        key={index}
                        className="card-cute p-6 md:p-8" // Responsive padding
                    >
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">{dept.name}</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">{dept.description}</p> {/* Responsive text size */}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Departments;