import {CalendarDays} from "lucide-react";
import React from "react";
import Card from "./ui/Card";

const PastEvents = () => {
    return (
        <section id="past-events" className="section-padding bg-cute-gradient">
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Our Past Events</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    We are proud of the impact we've made through our various initiatives and events.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event Card 1 - Restored Content */}
                    <Card className="overflow-hidden">
                        <img src="/src/assets/images/blood_drive.webp" alt="Blood Drive" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/2a1a3e/ffb1df?text=Fallback"; }} />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Blood Drive</h3>
                            <p className="text-sm md:text-base text-c9c9d5 mb-4">
                                267 donors, 501 lives saved — doubling our impact through stronger outreach.
                            </p>
                            <div className="flex items-center text-b0b0bb text-sm md:text-base">
                                <CalendarDays className="w-4 h-4 mr-2 text-pink-400" />
                                <span>November 2024</span>
                            </div>
                        </div>
                    </Card>
                    {/* Event Card 2 - Restored Content */}
                    <Card className="overflow-hidden">
                        <img src="/src/assets/images/medical_camp.webp" alt="Medical Camp" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1a2e3a/a9e0ff?text=Fallback"; }} />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Medical Camp</h3>
                            <p className="text-sm md:text-base text-c9c9d5 mb-4">
                                500+ patients treated in rural Sindh, bridging critical healthcare access gaps.
                            </p>
                            <div className="flex items-center text-b0b0bb text-sm md:text-base">
                                <CalendarDays className="w-4 h-4 mr-2 text-cyan-400" />
                                <span>December 2024</span>
                            </div>
                        </div>
                    </Card>
                    {/* Event Card 3 - Restored Content */}
                    <Card className="overflow-hidden">
                        <img src="/src/assets/images/mkm.webp" alt="Muskrahaton Ka Mela" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/3a2e1a/f7e6af?text=Fallback"; }} />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Muskurahaton Ka Mela</h3>
                            <p className="text-sm md:text-base text-c9c9d5 mb-4">
                                A carnival of joy for 700+ underprivileged kids, filled with laughter, hope.
                            </p>
                            <div className="flex items-center text-b0b0bb text-sm md:text-base">
                                <CalendarDays className="w-4 h-4 mr-2 text-yellow-400" />
                                <span>March 2025</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default PastEvents;