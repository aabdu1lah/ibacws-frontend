import { React, useState} from 'react';
import { BookUser } from 'lucide-react';
import Accordion from './ui/Accordion';
import faqs from '../constants/faqs';
import deadlines from '../constants/deadlines';
import Card from "./ui/Card.jsx";

const ApplicationInfo = ({ isMT }) => {
    const [showFaq, setShowFaq] = useState(null); // <-- Add state here
    const formFaqs = faqs.filter(f => f.isMT === isMT);
    const currentDeadlines = isMT ? deadlines.mt : deadlines.ec;

    const toggleFaq = (index) => {
        setShowFaq(showFaq === index ? null : index);
    };

    return (
        <>
            {/* Intro and Deadlines Section */}
            <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center">
                    <BookUser className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-cyan-400 " /> Application Details
                </h3>
                <Card className="p-6 md:p-8">
                    <p className="text-sm md:text-base text-c9c9d5 leading-relaxed mb-4">
                        {isMT
                            ? <>
                                The Management Team (MT) plays a vital role in supporting the Executive Council and
                                executing various initiatives. We are looking for enthusiastic and dedicated students to
                                join our team for the upcoming academic year. This is a great opportunity to gain practical
                                experience, contribute to meaningful causes, and work alongside a dynamic group.
                                <br/><br/>
                                Applications are now open for various departmental roles. Please review the FAQs (if
                                applicable) for more information on eligibility, the application process, and what to
                                expect. We encourage all interested students to apply!
                            </>
                            : <>
                                Our Executive Council is the backbone of the Community Welfare Society, driving all our
                                initiatives and events. We are looking for passionate, dedicated, and proactive students to
                                join our team for the upcoming academic year. This is a fantastic opportunity to gain
                                invaluable leadership experience, contribute to meaningful causes, and work alongside a
                                dynamic group of individuals.
                                <br/><br/>
                                Applications are now open for various departmental roles. Please review the FAQs (if
                                applicable) for more information on eligibility, the application process, and what to
                                expect. We encourage all interested students to apply!
                            </>
                        }
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base text-c9c9d5 mt-4 space-y-2">
                        <li><strong>Application Deadline:</strong> <span
                            className="text-ffb1df">{currentDeadlines.deadline}</span></li>
                        <li><strong>Interview Period:</strong> <span
                            className="text-a9e0ff">{currentDeadlines.interviews}</span></li>
                        <li><strong>Announcement of Results:</strong> <span
                            className="text-f7e6af">{currentDeadlines.announcement}</span></li>
                    </ul>
                </Card>
            </div>

            {/* FAQs Section */}
            <div className="mt-12">
                <h3 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center">
                    <BookUser className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-pink-400"/> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                    {formFaqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={showFaq === index}
                            toggleFaq={() => toggleFaq(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ApplicationInfo;