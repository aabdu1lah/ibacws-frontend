import React, { useState } from 'react';
import { Mail, ChevronRight, UserRoundCog, CalendarDays, Rocket, Users, Target, BookUser } from 'lucide-react'; // Using lucide-react for icons
import { FaLinkedin, FaInstagram } from "react-icons/fa";

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
    ];

    const toggleFaq = (index) => {
        setShowFaq(showFaq === index ? null : index);
    };

    const departmentsSection = (
        <section id="departments" className="section-padding"> {/* Removed bg-cute-gradient */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn">Our Departments</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    Our society operates through various dedicated departments, each playing a crucial role in achieving our mission.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="card-cute p-8"
                        >
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">{dept.name}</h3>
                            <p className="text-c9c9d5">{dept.description}</p>
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
        <section id="past-events" className="section-padding bg-cute-gradient"> {/* Added bg-cute-gradient */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="heading-cute mb-6 animate-fadeIn">Our Past Events</h2>
                <p className="subheading-cute mb-12 max-w-2xl mx-auto">
                    We are proud of the impact we've made through our various initiatives and events.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event Card 1 */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/blood_drive.webp" alt="Blood Drive" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="/assets/blood_drive.jpeg"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Blood Drive</h3>
                            <p className="text-c9c9d5 mb-4">
                                167 donors, 501 lives saved — doubling our impact through stronger outreach.
                            </p>
                            <div className="flex items-center text-b0b0bb">
                                <CalendarDays className="w-4 h-4 mr-2 text-pink-400" />
                                <span>November 2024</span>
                            </div>
                        </div>
                    </div>
                    {/* Event Card 2 */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/medical_camp.webp" alt="Medical Camp" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="/assets/medical_camp.png"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Medical Camp</h3>
                            <p className="text-c9c9d5 mb-4">
                                500+ patients treated in rural Sindh, bridging critical healthcare access gaps.
                            </p>
                            <div className="flex items-center text-b0b0bb">
                                <CalendarDays className="w-4 h-4 mr-2 text-cyan-400" />
                                <span>December 2024</span>
                            </div>
                        </div>
                    </div>
                    {/* Event Card 3 */}
                    <div className="card-cute overflow-hidden">
                        <img src="/assets/mkm.webp" alt="Mentorship Program" className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="/assets/mkm.jpeg"; }} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-f0f0f8 mb-2">Muskrahaton Ka Mela</h3>
                            <p className="text-c9c9d5 mb-4">
                                500+ patients treated in rural Sindh, bridging critical healthcare access gaps.
                            </p>
                            <div className="flex items-center text-b0b0bb">
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
                        <FaInstagram className="w-8 h-8 mr-3 group-hover:scale-110 transform transition-transform duration-200 text-pink-400" /> {/* Accent color for icon */}
                        <span>@ibacws</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/ibacws/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-e0e0e8 hover:text-ffb1df transition-colors duration-300 text-lg group" // Adjusted link color and hover accent
                    >
                        <FaLinkedin className="w-8 h-8 mr-3 group-hover:scale-110 transform transition-transform duration-200 text-yellow-400" /> {/* Accent color for icon */}
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
                            <li><strong>Application Deadline:</strong> <span className="text-ffb1df">August 31, 2025</span></li> {/* Accent color */}
                            <li><strong>Interview Period:</strong> <span className="text-a9e0ff">September 1 - September 2, 2025</span></li> {/* Accent color */}
                            <li><strong>Announcement of Results:</strong> <span className="text-f7e6af">September 4, 2025</span></li> {/* Accent color */}
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
                            <label htmlFor="fullName" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted htmlFor */}
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="universityEmail" className="block text-sm font-medium text-e0e0e8 mb-1"> {/* Adjusted htmlFor */}
                                University Email
                            </label>
                            <input
                                type="email"
                                id="universityEmail"
                                name="universityEmail"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="yourname@khi.iba.edu.pk"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="erp" className="block text-sm font-medium text-e0e0e8 mb-1">
                                ERP
                            </label>
                            <input
                                type="text"
                                id="erp"
                                name="erp"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="e.g., 30XXX"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Whatsapp Number
                            </label>
                            <input
                                type="tel"
                                id="whatsappNumber"
                                name="whatsappNumber"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="e.g., 923XX-XXXXXXX"
                                pattern="^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$" // Basic pattern for phone numbers
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="program" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Program
                            </label>
                            <select
                                id="program"
                                name="program"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                required
                            >
                                <option value="">Select your program</option>
                                <option value="BBA">BBA</option>
                                <option value="ACF">ACF</option>
                                <option value="CS">CS</option>
                                <option value="SS">SS</option>
                                <option value="Math">Math</option>
                                <option value="Econ">Econ</option>
                                <option value="Eco Math">Eco Math</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="batch" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Batch
                            </label>
                            <select
                                id="batch"
                                name="batch"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                required
                            >
                                <option value="">Select your batch</option>
                                <option value="Batch of 27">Batch of 27</option>
                                <option value="Batch of 28">Batch of 28</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="whyJoin" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Why do you want to join our Executive Council? (Min 100 words)
                            </label>
                            <textarea
                                id="whyJoin"
                                name="whyJoin"
                                rows="5"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="Share your passion for community welfare and what you can bring to the team."
                                required
                                minLength="100"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="pastExperiences" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Past experiences related to community/social welfare?
                            </label>
                            <textarea
                                id="pastExperiences"
                                name="pastExperiences"
                                rows="5"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                placeholder="Describe any relevant past experiences."
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="departmentPreference" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Department Preference (1st Choice)
                            </label>
                            <select
                                id="departmentPreference"
                                name="departmentPreference"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                                required
                            >
                                <option value="">Select a Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="departmentPreference2" className="block text-sm font-medium text-e0e0e8 mb-1">
                                Department Preference (2nd Choice, optional)
                            </label>
                            <select
                                id="departmentPreference2"
                                name="departmentPreference2"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-ff8dc7 focus:border-ff8dc7 bg-252a42 text-e0e0e8"
                            >
                                <option value="">Select a Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept.name}>{dept.name}</option>
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
                                I hereby acknowledge that I will not be part of any other society's Executive Council for this Academic term.
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn-cute w-full py-3 px-6 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ff8dc7 focus:ring-offset-2 transition-colors duration-300"
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
                    <header className="navbar-cute text-e0e0e8 py-2 px-4 fixed w-full z-20">
                        <nav className="container mx-auto flex justify-between items-center">
                            {/* Logo + Title */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/favicon.svg"
                                    alt="IBA Community Welfare Society Logo"
                                    className="h-8 w-auto invert dark:filter-none"
                                />
                                <span className="text-lg font-semibold text-f0f0f8">
        IBA Community Welfare Society
      </span>
                            </div>

                            {/* Desktop Links */}
                            <ul className="hidden md:flex items-center space-x-5">
                                <li>
                                    <a href="#goals" className="text-base hover:text-ffb1df transition-colors">
                                        Goals
                                    </a>
                                </li>
                                <li>
                                    <a href="#past-events" className="text-base hover:text-ffb1df transition-colors">
                                        Events
                                    </a>
                                </li>
                                <li>
                                    <a href="#departments" className="text-base hover:text-ffb1df transition-colors">
                                        Departments
                                    </a>
                                </li>
                                <li>
                                    <a href="#why-join-us" className="text-base hover:text-ffb1df transition-colors">
                                        Why Join Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-base hover:text-ffb1df transition-colors">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setCurrentPage("signup")}
                                        className="btn-cute py-1.5 px-3"
                                    >
                                        EC Sign-up
                                    </button>
                                </li>
                            </ul>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button className="text-e0e0e8 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
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

                    <footer
                        className="footer-cute text-b0b0bb py-8 text-center shadow-inner"> {/* Applied custom footer style and text color */}
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
