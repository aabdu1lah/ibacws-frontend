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
    }

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
                    {/*header section here*/}

                    {/*footer here*/}
                </div>
            ) : (
                currentPage === 'signup' ? signupPage : mtSignupPage
            )}
        </div>
    );
};

export default App;
