import React, { useState } from 'react';
import { Mail, Instagram, Linkedin, ChevronRight, UserRoundCog, CalendarDays, Rocket, Users, Target, BookUser } from 'lucide-react'; // Using lucide-react for icons

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'signup'
    const [showFaq, setShowFaq] = useState(null); // State to manage FAQ accordion

    const departments = [
        { name: 'Corporate', description: 'Manages external relations and partnerships.' },
        { name: 'Finance', description: 'Handles all financial aspects and fundraising.' },
        { name: 'Logistics', description: 'Ensures smooth operation and resource management for events.' },
        { name: 'Operations', description: 'Oversees the execution of all society activities.' },
        { name: 'Guest Relations', description: 'Manages interactions with guests and speakers.' },
        { name: 'Security', description: 'Ensures safety and security during events.' },
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
            answer: "All currently enrolled university students with a passion for community service and leadership are encouraged to apply. Specific requirements may vary by department, but enthusiasm and commitment are key!"
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
    ];

    const toggleFaq = (index) => {
        setShowFaq(showFaq === index ? null : index);
    };

    const departmentsSection = (
        <section id="departments" className="section-padding bg-cute-gradient">
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn">Our Departments</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    Our society operates through various dedicated departments, each playing a crucial role in achieving our mission.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="card-cute p-8" // Added p-8 as a default
                        >
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">{dept.name}</h3> {/* Adjusted text color */}
                            <p className="text-c9c9d5">{dept.description}</p> {/* Adjusted text color */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const heroSection = (
        <section
            id="hero"
            className="relative bg-cute-gradient text-e0e0e8 py-24 md:py-32 overflow-hidden shadow-lg" // Adjusted text color
        >
            {/* Background shapes for visual interest - using Tailwind colors that fit the new theme */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-pink-700 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-slideInFromTop">
                    IBA Community Welfare Society
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slideInFromBottom">
                    Building a better community, one initiative at a time.
                </p>
                <button
                    onClick={() => setCurrentPage('signup')}
                    className="btn-cute py-3 px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105" // Applied custom button style
                >
                    Join Our Executive Council! <ChevronRight className="inline-block ml-2 w-5 h-5" />
                </button>
            </div>
        </section>
    );

    const goalsSection = (
        <section id="goals" className="section-padding"> {/* No specific custom background class, will inherit body background */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn">Our Goals & Agenda</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    Committed to fostering positive change, our society strives for impactful community welfare through various initiatives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <Target className="text-cyan-400 mb-4 mx-auto w-12 h-12" /> {/* Accent color for icon */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Empowerment</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
                            Empowering underprivileged communities through education and skill-building programs.
                        </p>
                    </div>
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <Users className="text-pink-400 mb-4 mx-auto w-12 h-12" /> {/* Accent color for icon */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Support</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
                            Providing essential aid and support to those in need, fostering a caring environment.
                        </p>
                    </div>
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <Rocket className="text-yellow-400 mb-4 mx-auto w-12 h-12" /> {/* Accent color for icon */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Awareness</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
                            Raising awareness about critical social issues and advocating for sustainable solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

    const pastEventsSection = (
        <section id="past-events" className="section-padding"> {/* No specific custom background class, will inherit body background */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn">Our Past Events</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    We are proud of the impact we've made through our various initiatives and events.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event Card 1 */}
                    <div className="card-cute overflow-hidden"> {/* Applied custom card style */}
                        <img src="https://placehold.co/600x400/2a1a3e/ffb1df?text=Food+Drive" alt="Food Drive" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/2a1a3e/ffb1df?text=Fallback"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Community Food Drive</h3> {/* Adjusted text color */}
                            <p className="text-c9c9d5 mb-4"> {/* Adjusted text color */}
                                Collected and distributed food packages to over 200 families in need.
                            </p>
                            <div className="flex items-center text-b0b0bb"> {/* Adjusted text color */}
                                <CalendarDays className="w-4 h-4 mr-2 text-pink-400" /> {/* Accent color for icon */}
                                <span>October 2024</span>
                            </div>
                        </div>
                    </div>
                    {/* Event Card 2 */}
                    <div className="card-cute overflow-hidden"> {/* Applied custom card style */}
                        <img src="https://placehold.co/600x400/1a2e3a/a9e0ff?text=Clean-up+Drive" alt="Clean-up Drive" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1a2e3a/a9e0ff?text=Fallback"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Campus Clean-up Drive</h3> {/* Adjusted text color */}
                            <p className="text-c9c9d5 mb-4"> {/* Adjusted text color */}
                                Mobilized volunteers to clean and beautify our university campus grounds.
                            </p>
                            <div className="flex items-center text-b0b0bb"> {/* Adjusted text color */}
                                <CalendarDays className="w-4 h-4 mr-2 text-cyan-400" /> {/* Accent color for icon */}
                                <span>September 2024</span>
                            </div>
                        </div>
                    </div>
                    {/* Event Card 3 */}
                    <div className="card-cute overflow-hidden"> {/* Applied custom card style */}
                        <img src="https://placehold.co/600x400/3a2e1a/f7e6af?text=Mentorship+Program" alt="Mentorship Program" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/3a2e1a/f7e6af?text=Fallback"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Youth Mentorship Program</h3> {/* Adjusted text color */}
                            <p className="text-c9c9d5 mb-4"> {/* Adjusted text color */}
                                Paired university students with local high school students for academic mentorship.
                            </p>
                            <div className="flex items-center text-b0b0bb"> {/* Adjusted text color */}
                                <CalendarDays className="w-4 h-4 mr-2 text-yellow-400" /> {/* Accent color for icon */}
                                <span>August 2024</span>
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
                <h2 className="heading-cute mb-6 animate-fadeIn">Why Join Us?</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    Become a part of a vibrant community making a real difference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Make an Impact</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
                            Contribute directly to welfare projects and see the positive change you create.
                        </p>
                    </div>
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Develop Skills</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
                            Enhance your leadership, teamwork, and organizational skills through hands-on experience.
                        </p>
                    </div>
                    <div className="card-cute p-8"> {/* Applied custom card style */}
                        <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Expand Your Network</h3> {/* Adjusted text color */}
                        <p className="text-c9c9d5"> {/* Adjusted text color */}
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
                <h2 className="heading-cute mb-6 animate-fadeIn">Get In Touch</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    We'd love to hear from you! Connect with us through our channels.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <a
                        href="mailto:cws@khi.iba.edu.pk"
                        className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-lg group" // Adjusted link color and hover accent
                    >
                        <Mail className="w-8 h-8 mr-3 group-hover:scale-110 transform transition-transform duration-200 text-cyan-400" /> {/* Accent color for icon */}
                        <span>cws@khi.iba.edu.pk</span>
                    </a>
                    <a
                        href="https://instagram.com/ibacws"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-lg group" // Adjusted link color and hover accent
                    >
                        <Instagram className="w-8 h-8 mr-3 group-hover:scale-110 transform transition-transform duration-200 text-pink-400" /> {/* Accent color for icon */}
                        <span>@ibacws</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/ibacws/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-lg group" // Adjusted link color and hover accent
                    >
                        <Linkedin className="w-8 h-8 mr-3 group-hover:scale-110 transform transition-transform duration-200 text-yellow-400" /> {/* Accent color for icon */}
                        <span>@ibacws</span>
                    </a>
                </div>
            </div>
        </section>
    );

    const signupPage = (
        <div className="min-h-screen bg-cute-gradient py-16 px-4 sm:px-6 lg:px-8"> {/* Applied custom background */}
            <div className="max-w-4xl mx-auto card-cute p-8 md:p-12"> {/* Applied custom card style */}
                <button
                    onClick={() => setCurrentPage('home')}
                    className="mb-8 flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300" // Adjusted text/hover colors
                >
                    <ChevronRight className="rotate-180 w-5 h-5 mr-2 text-pink-400" /> Back to Home {/* Accent color for icon */}
                </button>

                <h1 className="heading-cute text-center mb-8 animate-fadeIn"> {/* Applied custom heading style */}
                    Executive Council Sign-up
                </h1>
                <p className="subheading-cute text-center mb-12 max-w-2xl mx-auto"> {/* Applied custom subheading style */}
                    Ready to lead and make a difference? Join our Executive Council and shape the future of our society!
                </p>

                {/* Sign-up Details */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-f0f0f8 mb-6 flex items-center"> {/* Adjusted text color */}
                        <BookUser className="w-7 h-7 mr-3 text-cyan-400" /> Application Details {/* Accent color for icon */}
                    </h2>
                    <div className="card-cute p-6"> {/* Applied custom card style */}
                        <p className="text-c9c9d5 leading-relaxed mb-4"> {/* Adjusted text color */}
                            Our Executive Council is the backbone of the Community Welfare Society, driving all our initiatives and events. We are looking for passionate, dedicated, and proactive students to join our team for the upcoming academic year. This is a fantastic opportunity to gain invaluable leadership experience, contribute to meaningful causes, and work alongside a dynamic group of individuals.
                        </p>
                        <p className="text-c9c9d5 leading-relaxed"> {/* Adjusted text color */}
                            Applications are now open for various departmental roles. Please review the FAQs below for more information on eligibility, the application process, and what to expect. We encourage all interested students to apply!
                        </p>
                        <ul className="list-disc list-inside text-c9c9d5 mt-4 space-y-2"> {/* Adjusted text color */}
                            <li><strong>Application Deadline:</strong> <span className="text-ffb1df">September 15, 2025</span></li> {/* Accent color */}
                            <li><strong>Interview Period:</strong> <span className="text-a9e0ff">September 20 - September 25, 2025</span></li> {/* Accent color */}
                            <li><strong>Announcement of Results:</strong> <span className="text-f7e6af">September 30, 2025</span></li> {/* Accent color */}
                        </ul>
                    </div>
                </div>

                {/* FAQs Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-f0f0f8 mb-6 flex items-center"> {/* Adjusted text color */}
                        <BookUser className="w-7 h-7 mr-3 text-pink-400" /> Frequently Asked Questions {/* Accent color for icon */}
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card-cute overflow-hidden"> {/* Applied custom card style */}
                                <button
                                    className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-f0f0f8 hover:bg-27284b transition-colors duration-200" // Adjusted text/hover colors
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showFaq === index ? 'rotate-90 text-a9e0ff' : 'text-b0b0bb'}`} /> {/* Accent color for icon */}
                                </button>
                                {showFaq === index && (
                                    <div className="p-5 pt-0 text-c9c9d5"> {/* Adjusted text color */}
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sign-up Form */}
                <div>
                    <h2 className="text-3xl font-bold text-f0f0f8 mb-6 flex items-center"> {/* Adjusted text color */}
                        <UserRoundCog className="w-7 h-7 mr-3 text-yellow-400" /> Application Form {/* Accent color for icon */}
                    </h2>
                    <form className="space-y-6 card-cute p-8 shadow-md"> {/* Applied custom card style */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted input styles for dark theme
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                University Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted input styles for dark theme
                                placeholder="cws@khi.iba.edu.pk"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                Student ID
                            </label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted input styles for dark theme
                                placeholder="e.g., U1234567"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="departmentPreference" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                Department Preference (1st Choice)
                            </label>
                            <select
                                id="departmentPreference"
                                name="departmentPreference"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted select styles for dark theme
                                required
                            >
                                <option value="">Select a Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="departmentPreference2" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                Department Preference (2nd Choice, optional)
                            </label>
                            <select
                                id="departmentPreference2"
                                name="departmentPreference2"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted select styles for dark theme
                            >
                                <option value="">Select a Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="whyJoin" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted text color */}
                                Why do you want to join the Executive Council? (Min 100 words)
                            </label>
                            <textarea
                                id="whyJoin"
                                name="whyJoin"
                                rows="5"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8" // Adjusted textarea styles for dark theme
                                placeholder="Share your passion for community welfare and what you can bring to the team."
                                required
                                minLength="100"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn-cute w-full py-3 px-6 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ff8dc7 focus:ring-offset-2 transition-colors duration-300" // Applied custom button style
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-inter antialiased text-e0e0e8 bg-1a1a2e"> {/* Applied global text/background colors from body */}
            {currentPage === 'home' ? (
                <div className="flex flex-col min-h-screen">
                    <header className="navbar-cute text-e0e0e8 p-4 fixed w-full z-20"> {/* Applied custom navbar style and text color */}
                        <nav className="container mx-auto flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <img src="/assets/favicon.svg" alt="IBA Community Welfare Society Logo"
                                     className="h-16 w-auto invert dark:filter-none"/>
                                <span className="text-2xl font-bold text-f0f0f8">IBA Community Welfare Society</span> {/* Adjusted text color */}
                            </div>
                            <ul className="hidden md:flex space-x-6">
                                <li><a href="#goals"
                                       className="hover:text-ffb1df transition-colors duration-200">Goals</a></li> {/* Accent hover color */}
                                <li><a href="#past-events"
                                       className="hover:text-ffb1df transition-colors duration-200">Events</a></li> {/* Accent hover color */}
                                <li><a href="#departments"
                                       className="hover:text-ffb1df transition-colors duration-200">Departments</a>
                                </li> {/* Accent hover color */}
                                <li><a href="#why-join-us"
                                       className="hover:text-ffb1df transition-colors duration-200">Why Join Us</a>
                                </li> {/* Accent hover color */}
                                <li><a href="#contact"
                                       className="hover:text-ffb1df transition-colors duration-200">Contact</a>
                                </li> {/* Accent hover color */}
                                <li>
                                    <button
                                        onClick={() => setCurrentPage('signup')}
                                        className="btn-cute py-2 px-4 shadow-md" // Applied custom button style
                                    >
                                        EC Sign-up
                                    </button>
                                </li>
                            </ul>
                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button className="text-e0e0e8 focus:outline-none"> {/* Adjusted text color */}
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </nav>
                    </header>

                    <main className="flex-grow pt-16"> {/* Add padding-top equal to header height */}
                        {heroSection}
                        {goalsSection}
                        {pastEventsSection}
                        {departmentsSection}
                        {whyJoinUsSection}
                        {contactSection}
                    </main>

                    <footer className="footer-cute text-b0b0bb py-8 text-center shadow-inner"> {/* Applied custom footer style and text color */}
                        <div className="container mx-auto px-6">
                            <p>&copy; {new Date().getFullYear()} IBA Community Welfare Society. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            ) : (
                signupPage
            )}
        </div>
    );
};

export default App;
