import React, { useState, useEffect } from 'react';
import { Mail, ChevronRight, UserRoundCog, CalendarDays, Rocket, Users, Target, BookUser, Linkedin, Instagram, Menu, X } from 'lucide-react'; // Using lucide-react for icons, now including Linkedin, Instagram, Menu, X

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signup' (for EC), or 'mtsignup' (for MT)
    const [showFaq, setShowFaq] = useState(null); // State to manage FAQ accordion
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
    const [submitMessage, setSubmitMessage] = useState(''); // New state for submission message
    const [firstChoice, setFirstChoice] = useState("");
    const [secondChoice, setSecondChoice] = useState("");


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]); // This runs whenever currentPage changes

    const departments = [
        { name: 'Corporate', description: 'Manages external relations and partnerships.' },
        { name: 'Finance', description: 'Handles all financial aspects and fundraising.' },
        { name: 'Logistics', description: 'Ensures smooth operation and resource management for events.' },
        { name: 'Operations', description: 'Oversees the execution of all society activities.' },
        { name: 'Guest Relations', description: 'Manages interactions with guests and speakers.' },
        { name: 'Security', 'description': 'Ensures safety and security during events.' },
        { name: 'Marketing', description: 'Promotes the society and its initiatives.' },
        { name: 'Creatives', description: 'Designs and develops visual content and branding.' },
    ];

    const faqs = [
        {
            question: "What is the Executive Council?",
            answer: "The Executive Council (EC) is a team of dedicated students who lead and manage all initiatives of the Community Welfare Society. They are responsible for planning, organizing, and executing events that align with our goals."
        },
        {
            question: "Who is eligible to apply?",
            answer: "All currently enrolled university students with a passion for community service and leadership are encouraged to apply, however according to the IBA guidelines, only Sophomore and Junior year students are eligible for the Executive Council positions!"
        },
        {
            question: "What is the application process?",
            answer: "The application process typically involves submitting an online form, followed by an interview round. Successful candidates will be selected based on their skills, experience, and alignment with our society's vision."
        },
        {
            question: "What are the benefits of joining the EC?",
            answer: "Joining the EC offers a unique opportunity to develop leadership skills, gain practical experience in event management, network with like-minded individuals, and make a tangible positive impact on the community. It's also a great addition to your resume!"
        },
        {
            question: "What is the time commitment?",
            answer: "The time commitment varies depending on the department and the ongoing projects. EC members are expected to dedicate a few hours per week, with increased involvement during major events. We strive to be flexible and understand academic commitments."
        },
        {
            question: "What is the role of a Management Team?",
            answer: "Management Teams assist the Executive Council in their assigned departments with carrying out tasks and gaining hands-on experience while supporting society activities."
        },
        {
            question: "Who can apply for the MT?",
            answer: "All students of IBA who are interested in community welfare, volunteering, and learning about society work can apply."
        },
        {
            question: "What are the benefits of being in the MT?",
            answer: "You will contribute to meaningful welfare projects and sharpen your leadership/teamwork skills while building lasting connections within the IBA community."
        },
        {
            question: "Is prior experience required to join the MT?",
            answer: "No, MTs are designed for students with little or no prior experience. The goal is to help you learn and grow."
        },
        {
            question: "Do we get to choose our department?",
            answer: "Yes, applicants can mention their preferred department. Final placement depends on interest, skills, and the needs of CWS."
        },
    ];

    const toggleFaq = (index) => {
        setShowFaq(showFaq === index ? null : index);
    };

    const handleMobileMenuClick = (action) => {
        if (typeof action === 'function') {
            action(); // Execute the action (setCurrentPage or other function)
        }
        setIsMobileMenuOpen(false); // Close the menu
    };

    // --- Form Submission Handler ---
    const handleFormSubmit = async (event, isMT) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const formData = new FormData(event.target);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            let cleanKey = key.startsWith('mt') ? key.slice(2) : key;
            cleanKey = cleanKey.charAt(0).toLowerCase() + cleanKey.slice(1);

            if (cleanKey === 'acknowledgement') {
            payload[cleanKey] = value === 'on';
            } else {
            payload[cleanKey] = value;
            }
        }

        payload['targetSheet'] = isMT ? 'MT Applications' : 'EC Applications';

        try {
            const response = await fetch(`${BACKEND_URL}/submit-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
            setSubmitMessage('Application received! See you at the interviews :)');
            event.target.reset();
            } else {
            console.error('Submission error:', result.message);
            setSubmitMessage(`There was an error submitting your application: ${result.message}`);
            }
        } catch (error) {
            console.error('Network or parsing error:', error);
            setSubmitMessage('There was a network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };


    const departmentsSection = (
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

    const heroSection = (
        <section
            id="hero"
            className="relative bg-cute-gradient text-e0e0e8 py-20 md:py-32 overflow-hidden shadow-lg" // Responsive padding
        >
            {/* Background shapes for visual interest - using Tailwind colors that fit the new theme */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div> {/* Responsive size */}
                <div className="absolute top-1/2 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-cyan-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div> {/* Responsive size */}
                <div className="absolute bottom-1/4 left-1/2 w-40 h-40 md:w-56 md:h-56 bg-pink-700 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div> {/* Responsive size */}
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-slideInFromTop"> {/* Responsive text size */}
                    IBA Community Welfare Society
                </h1>
                <p className="text-lg md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slideInFromBottom"> {/* Responsive text size */}
                    Building a better community, one initiative at a time.
                </p>
                <div className="flex flex-col space-y-4 items-center"> {/* Add this wrapper */}
                    <button
                        onClick={() => setCurrentPage('signup')}
                        className="btn-cute py-2 px-6 md:py-3 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Join Our Executive Council! <ChevronRight className="inline-block ml-2 w-5 h-5"/>
                    </button>

                    <button
                        onClick={() => setCurrentPage('mtsignup')}
                        className="btn-cute py-2 px-6 md:py-3 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Join Our Management Team! <ChevronRight className="inline-block ml-2 w-5 h-5"/>
                    </button>
                </div>
            </div>
        </section>
    );

    const goalsSection = (
        <section id="goals" className="section-padding"> {/* Changed: Added bg-cute-gradient */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Our Goals &
                    Agenda</h2> {/* Responsive text size */}
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    Committed to fostering positive change, our society strives for impactful community welfare through
                    various initiatives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <Target className="text-cyan-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Empowerment</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Empowering underprivileged communities through education and skill-building programs.
                        </p>
                    </div>
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <Users className="text-pink-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Support</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Providing essential aid and support to those in need, fostering a caring environment.
                        </p>
                    </div>
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <Rocket className="text-yellow-400 mb-4 mx-auto w-10 h-10 md:w-12 md:h-12" /> {/* Responsive icon size */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Awareness</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Raising awareness about critical social issues and advocating for sustainable solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

    const pastEventsSection = (
        <section id="past-events" className="section-padding bg-cute-gradient">
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Our Past Events</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    We are proud of the impact we've made through our various initiatives and events.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event Card 1 - Restored Content */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/blood_drive.webp" alt="Blood Drive" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/2a1a3e/ffb1df?text=Fallback"; }} />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Blood Drive</h3>
                            <p className="text-sm md:text-base text-c9c9d5 mb-4">
                                167 donors, 501 lives saved — doubling our impact through stronger outreach.
                            </p>
                            <div className="flex items-center text-b0b0bb text-sm md:text-base">
                                <CalendarDays className="w-4 h-4 mr-2 text-pink-400" />
                                <span>November 2024</span>
                            </div>
                        </div>
                    </div>
                    {/* Event Card 2 - Restored Content */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/medical_camp.webp" alt="Medical Camp" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1a2e3a/a9e0ff?text=Fallback"; }} />
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
                    </div>
                    {/* Event Card 3 - Restored Content */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/mkm.webp" alt="Muskrahaton Ka Mela" className="w-full h-40 md:h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/3a2e1a/f7e6af?text=Fallback"; }} />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Muskrahaton Ka Mela</h3>
                            <p className="text-sm md:text-base text-c9c9d5 mb-4">
                                A carnival of joy for 700+ underprivileged kids, filled with laughter, hope.
                            </p>
                            <div className="flex items-center text-b0b0bb text-sm md:text-base">
                                <CalendarDays className="w-4 h-4 mr-2 text-yellow-400" />
                                <span>March 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const whyJoinUsSection = (
        <section id="why-join-us" className="section-padding bg-cute-gradient">
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn text-2xl md:text-3xl">Why Join Us?</h2> {/* Responsive text size */}
                <p className="subheading-cute mb-12 max-w-2xl mx-auto text-base md:text-lg">
                    Become a part of a vibrant community making a real difference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Make an Impact</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Contribute directly to welfare projects and see the positive change you create.
                        </p>
                    </div>
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Develop Skills</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Enhance your leadership, teamwork, and organizational skills through hands-on experience.
                        </p>
                    </div>
                    <div className="card-cute p-6 md:p-8"> {/* Responsive padding */}
                        <h3 className="text-lg md:text-xl font-semibold text-f0f0f8 mb-2">Expand Your Network</h3> {/* Responsive text size */}
                        <p className="text-sm md:text-base text-c9c9d5">
                            Connect with fellow students, faculty, and community leaders.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

    const contactSection = (
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
                        <Instagram className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-pink-400" /> {/* Responsive icon size */}
                        <span>@ibacws</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/ibacws/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-base md:text-lg group" // Responsive text size
                    >
                        <Linkedin className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-yellow-400" /> {/* Responsive icon size */}
                        <span>@ibacws</span>
                    </a>
                </div>
            </div>
        </section>
    );

    const signupFormContent = (isMT = false) => ( // Reusable form content for EC and MT
        <>
            {/* Sign-up Details */}
            <div className="mb-8 md:mb-12"> {/* Responsive margin */}
                <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center"> {/* Responsive text size & margin */}
                    <BookUser className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-cyan-400" /> Application Details
                </h2>
                <div className="card-cute p-4 md:p-6"> {/* Responsive padding */}
                    <p className="text-sm md:text-base text-c9c9d5 leading-relaxed mb-4">
                        {isMT ?
                            "The Management Team (MT) plays a vital role in supporting the Executive Council and executing various initiatives. We are looking for enthusiastic and dedicated students to join our team for the upcoming academic year. This is a great opportunity to gain practical experience, contribute to meaningful causes, and work alongside a dynamic group." :
                            "Our Executive Council is the backbone of the Community Welfare Society, driving all our initiatives and events. We are looking for passionate, dedicated, and proactive students to join our team for the upcoming academic year. This is a fantastic opportunity to gain invaluable leadership experience, contribute to meaningful causes, and work alongside a dynamic group of individuals."
                        }
                    </p>
                    <p className="text-sm md:text-base text-c9c9d5 leading-relaxed">
                        Applications are now open for various departmental roles. Please review the FAQs (if applicable) for more information on eligibility, the application process, and what to expect. We encourage all interested students to apply!
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base text-c9c9d5 mt-4 space-y-2"> {/* Responsive text size */}
                        <li><strong>Application Deadline:</strong> <span className="text-ffb1df">{isMT ? "September 7, 2025" : "September 2, 2025"}</span></li>
                        <li><strong>Interview Period:</strong> <span className="text-a9e0ff">{isMT ? "TBD" : "September 1 - September 2, 2025"}</span></li>
                        <li><strong>Announcement of Results:</strong> <span className="text-f7e6af">{isMT ? "TBD" : "September 4, 2025"}</span></li>
                    </ul>
                </div>
            </div>

            {/* FAQs Section */}
            {(
                <div className="mb-8 md:mb-12"> {/* Responsive margin */}
                    <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center"> {/* Responsive text size & margin */}
                        <BookUser className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-pink-400" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            ((!isMT && index < 5) || (isMT && index > 4)) && (
                                <div key={index} className="card-cute overflow-hidden">
                                    <button
                                        className="flex justify-between items-center w-full p-4 md:p-5 text-left text-base md:text-lg font-semibold text-f0f0f8 hover:bg-27284b transition-colors duration-200" // Responsive padding & text size
                                        onClick={() => toggleFaq(index)}
                                    >
                                        {faq.question}
                                        <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showFaq === index ? 'rotate-90 text-a9e0ff' : 'text-b0b0bb'}`} />
                                    </button>
                                    {showFaq === index && (
                                        <div className="p-4 md:p-5 pt-0 text-sm md:text-base text-c9c9d5"> {/* Responsive padding & text size */}
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Application Form */}
            <div>
                <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center"> {/* Responsive text size & margin */}
                    <UserRoundCog className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-yellow-400" /> Application Form
                </h2>
                <form className="space-y-4 md:space-y-6 card-cute p-6 md:p-8 shadow-md" onSubmit={(e) => handleFormSubmit(e, isMT)}> {/* Responsive spacing & padding */}
                    <div>
                        <label
                            htmlFor={isMT ? "mtFullName" : "fullName"}
                            className="block text-sm font-medium text-e0e0e8 mb-1"
                        >
                            Full Name
                            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                        </label>
                        <input
                            type="text"
                            id={isMT ? "mtFullName" : "fullName"}
                            name={isMT ? "mtFullName" : "fullName"}
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                    <label
                        htmlFor={isMT ? "mtUniversityEmail" : "universityEmail"}
                        className="block text-sm font-medium text-e0e0e8 mb-1"
                    >
                        University Email
                        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                    </label>
                    <input
                        type="email"
                        id={isMT ? "mtUniversityEmail" : "universityEmail"}
                        name={isMT ? "mtUniversityEmail" : "universityEmail"}
                        className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base"
                        placeholder="yourname@khi.iba.edu.pk"
                        required
                    />
                    </div>
                    <div>
                    <label
                        htmlFor={isMT ? "mtErp" : "erp"}
                        className="block text-sm font-medium text-e0e0e8 mb-1"
                    >
                        ERP
                        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                    </label>
                    <input
                        type="text"
                        id={isMT ? "mtErp" : "erp"}
                        name={isMT ? "mtErp" : "erp"}
                        className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base"
                        placeholder="e.g., 30XXX"
                        minLength={5}
                        required
                    />
                    </div>
                    <div>
                    <label
                        htmlFor={isMT ? "mtWhatsappNumber" : "whatsappNumber"}
                        className="block text-sm font-medium text-e0e0e8 mb-1"
                    >
                        Whatsapp Number
                        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                    </label>
                    <input
                        type="tel"
                        id={isMT ? "mtWhatsappNumber" : "whatsappNumber"}
                        name={isMT ? "mtWhatsappNumber" : "whatsappNumber"}
                        className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base"
                        placeholder="e.g., 03XXXXXXXXX"
                        pattern="^03\d{9}$"
                        required
                    />
                    </div>
                    <div>
                    <label
                        htmlFor={isMT ? "mtProgram" : "program"}
                        className="block text-sm font-medium text-e0e0e8 mb-1"
                    >
                        Program
                        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                    </label>
                    <select
                        id={isMT ? "mtProgram" : "program"}
                        name={isMT ? "mtProgram" : "program"}
                        className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base"
                        required
                    >
                        <option value="">Select your program</option>
                        <option value="BBA">BBA</option>
                        {(isMT && <option value="BA">BA</option>)}
                        <option value="ACF">ACF</option>
                        <option value="CS">CS</option>
                        <option value="SS">SS</option>
                        <option value="Math">Math</option>
                        <option value="Econ">Econ</option>
                        <option value="Eco Math">Eco Math</option>
                    </select>
                    </div>
                    <div>
                        <label htmlFor={isMT ? "mtBatch" : "batch"} className="block text-sm font-medium text-e0e0e8 mb-1">
                            Batch
                            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                        </label>
                        <select
                            id={isMT ? "mtBatch" : "batch"}
                            name={isMT ? "mtBatch" : "batch"}
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base" // Responsive padding & text size
                            required
                        >
                            <option value="">Select your batch</option>
                            <option value="Batch of 27">Batch of 27</option>
                            <option value="Batch of 28">Batch of 28</option>
                            {(isMT && <option value="Batch of 29">Batch of 29</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={isMT ? "mtWhyJoin" : "whyJoin"} className="block text-sm font-medium text-e0e0e8 mb-1">
                            Why do you want to join {isMT ? "the Management Team" : "our Executive Council"}? (Min 20 Words)
                            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                        </label>
                        <textarea
                            id={isMT ? "mtWhyJoin" : "whyJoin"}
                            name={isMT ? "mtWhyJoin" : "whyJoin"}
                            rows="5"
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base" // Responsive padding & text size
                            placeholder={`Share your passion for community welfare and what you can bring to the ${isMT ? "team" : "Executive Council"}.`}
                            required
                            minLength="20"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor={isMT ? "mtPastExperiences" : "pastExperiences"} className="block text-sm font-medium text-e0e0e8 mb-1">
                            Share any past experiences related to community/social welfare.
                        </label>
                        <textarea
                            id={isMT ? "mtPastExperiences" : "pastExperiences"}
                            name={isMT ? "mtPastExperiences" : "pastExperiences"}
                            rows="5"
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base" // Responsive padding & text size
                            placeholder="Describe any relevant past experiences."
                        ></textarea>
                    </div>
                    {/* First choice */}
                    <div>
                        <label htmlFor={isMT ? "mtDepartmentPreference" : "departmentPreference"} className="block text-sm font-medium text-e0e0e8 mb-1">
                            Department Preference (1st Choice)
                            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                        </label>
                        <select
                            id={isMT ? "mtDepartmentPreference" : "departmentPreference"}
                            name={isMT ? "mtDepartmentPreference" : "departmentPreference"}
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base" // Responsive padding & text size
                            value={firstChoice}
                            onChange={(e) => {
                                setFirstChoice(e.target.value);
                                // reset 2nd choice if it was the same
                                if (e.target.value === secondChoice) {
                                    setSecondChoice("");
                                }
                            }}
                            required
                        >
                            <option value="">Select a Department</option>
                            {departments.map((dept, index) => (
                                <option key={index} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Second choice */}
                    <div>
                        <label htmlFor={isMT ? "mtDepartmentPreference2" : "departmentPreference2"} className="block text-sm font-medium text-e0e0e8 mb-1">
                            Department Preference (2nd Choice)
                        </label>
                        <select
                            id={isMT ? "mtDepartmentPreference2" : "departmentPreference2"}
                            name={isMT ? "mtDepartmentPreference2" : "departmentPreference2"}
                            className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8 text-sm md:text-base" // Responsive padding & text size
                            value={secondChoice}
                            onChange={(e) => setSecondChoice(e.target.value)}
                        >
                            <option value="">Select a Department</option>
                            {departments
                            .filter((dept) => dept.name !== firstChoice) // filter out selected 1st choice
                            .map((dept, index) => (
                                <option key={index} value={dept.name}>
                                {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="acknowledgement"
                            name="acknowledgement"
                            className="h-4 w-4 text-ff8dc7 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42"
                            required
                        />
                        <label htmlFor="acknowledgement" className="ml-2 block text-sm font-medium text-e0e0e8">
                            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
                            {(
                                !isMT 
                                ? "I hereby acknowledge that I will not be part of any other society's Executive Council for this Academic term."
                                : "I will make a sincere effort to contribute effectively and consistently throughout the Academic Term."
                            )}
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn-cute w-full py-2.5 px-6 md:py-3 md:px-6 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ff8dc7 focus:ring-offset-2 transition-colors duration-300 text-sm md:text-base" // Responsive padding & text size
                        disabled={isSubmitting} // Disable button during submission
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    {submitMessage && (
                        <p className={`mt-4 text-center font-semibold ${submitMessage.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
                            {submitMessage}
                        </p>
                    )}
                </form>
            </div>
        </>
    );

    const signupPage = ( // EC Sign-up page
        <div className="min-h-screen bg-cute-gradient py-12 px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
            <div className="max-w-xl mx-auto card-cute p-6 md:p-10"> {/* Responsive max-width & padding */}
                <button
                    onClick={() => setCurrentPage('home')}
                    className="mb-6 flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-sm md:text-base" // Responsive text size
                >
                    <ChevronRight className="rotate-180 w-4 h-4 mr-2 text-pink-400" /> Back to Home
                </button>

                <h1 className="heading-cute text-center mb-6 animate-fadeIn text-3xl md:text-4xl"> {/* Responsive text size */}
                    Executive Council Sign-up
                </h1>
                <p className="subheading-cute text-center mb-10 max-w-2xl mx-auto text-base md:text-lg"> {/* Responsive text size */}
                    Ready to lead and make a difference? Join our Executive Council and shape the future of our society!
                </p>

                {signupFormContent(false)} {/* Render EC specific form */}
            </div>
        </div>
    );

    const mtSignupPage = ( // New Management Team Sign-up page
        <div className="min-h-screen bg-cute-gradient py-12 px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
            <div className="max-w-xl mx-auto card-cute p-6 md:p-10"> {/* Responsive max-width & padding */}
                <button
                    onClick={() => setCurrentPage('home')}
                    className="mb-6 flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-sm md:text-base" // Responsive text size
                >
                    <ChevronRight className="rotate-180 w-4 h-4 mr-2 text-pink-400" /> Back to Home
                </button>

                <h1 className="heading-cute text-center mb-6 animate-fadeIn text-3xl md:text-4xl"> {/* Responsive text size */}
                    Management Team Sign-up
                </h1>
                <p className="subheading-cute text-center mb-10 max-w-2xl mx-auto text-base md:text-lg"> {/* Responsive text size */}
                    Ready to contribute to our initiatives? Join our Management Team!
                </p>

                {signupFormContent(true)} {/* Render MT specific form */}
            </div>
        </div>
    );

    return (
        <div className="font-inter antialiased text-e0e0e8 bg-1a1a2e"> {/* Applied global text/background colors from body */}
            {currentPage === 'home' ? (
                <div className="flex flex-col min-h-screen">
                    <header className="navbar-cute text-e0e0e8 py-2 px-4 fixed w-full z-20">
                        <nav className="container mx-auto flex justify-between items-center">
                            {/* Logo + Title */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/favicon.svg"
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
                                    <button
                                        onClick={() => setCurrentPage("signup")}
                                        className="btn-cute py-1.5 px-3 text-sm"
                                    >
                                        EC Sign-up
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setCurrentPage("mtsignup")}
                                        className="btn-cute py-1.5 px-3 text-sm"
                                    >
                                        MT Sign-up
                                    </button>
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

                        {/* Mobile Menu Panel - Add this section */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden absolute top-full left-0 w-full bg-[rgba(35,32,63,0.98)] backdrop-blur-none py-4 px-6 shadow-lg border-t border-[rgba(255,141,199,0.15)]  h-screen inset-0">
                                <ul className="flex flex-col space-y-4">
                                    <li>
                                        <a href="#goals"
                                           onClick={() => handleMobileMenuClick()}
                                           className="block py-2 hover:text-ffb1df transition-colors">
                                            Goals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#past-events"
                                           onClick={() => handleMobileMenuClick()}
                                           className="block py-2 hover:text-ffb1df transition-colors">
                                            Events
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#departments"
                                           onClick={() => handleMobileMenuClick()}
                                           className="block py-2 hover:text-ffb1df transition-colors">
                                            Departments
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#why-join-us"
                                           onClick={() => handleMobileMenuClick()}
                                           className="block py-2 hover:text-ffb1df transition-colors">
                                            Why Join Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#contact"
                                           onClick={() => handleMobileMenuClick()}
                                           className="block py-2 hover:text-ffb1df transition-colors">
                                            Contact
                                        </a>
                                    </li>
                                    <li className="pt-2 border-t border-[rgba(255,141,199,0.15)]">
                                        <button
                                            onClick={() => handleMobileMenuClick(() => setCurrentPage("signup"))}
                                            className="btn-cute w-full py-2 text-sm mb-2"
                                        >
                                            EC Sign-up
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleMobileMenuClick(() => setCurrentPage("mtsignup"))}
                                            className="btn-cute w-full py-2 text-sm"
                                        >
                                            MT Sign-up
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </header>

                    <main className="flex-grow pt-14"> {/* Adjusted padding-top to match header height */}
                        {heroSection}
                        {goalsSection}
                        {pastEventsSection}
                        {departmentsSection}
                        {whyJoinUsSection}
                        {contactSection}
                    </main>

                    <footer
                        className="footer-cute text-b0b0bb py-8 text-center shadow-inner"> {/* Applied custom footer style and text color */}
                        <div className="container mx-auto px-6">
                            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} IBA Community Welfare
                                Society. All rights reserved.</p> {/* Responsive text size */}
                            <p className="mt-2 text-xs md:text-sm">Made with <span role="img"
                                                                                   aria-label="heart">❤️</span> by
                                Hyveron</p> {/* Responsive text size */}
                        </div>
                    </footer>
                </div>
            ) : (
                currentPage === 'signup' ? signupPage : mtSignupPage
            )}
        </div>
    );
};

export default App;
