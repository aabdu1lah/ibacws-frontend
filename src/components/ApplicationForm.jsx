import React, { useState } from 'react';
import Accordion from './ui/Accordion';
import Button from './ui/Button';
import faqs from '../constants/faqs.js';
import departments from '../constants/departments.js';

const ApplicationForm = ({ isMT, setCurrentPage }) => {
    const [firstChoice, setFirstChoice] = useState("");
    const [secondChoice, setSecondChoice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Your application has been submitted successfully!');
            console.log('Form submitted:', { firstChoice, secondChoice });
        }, 2000);
    };

    const formFaqs = isMT ? faqs.filter(f => f.isMT) : faqs.filter(f => !f.isMT);
    const formDepartments = isMT ? departments.filter(d => d.forMT) : departments.filter(d => !d.forMT);

    return (
        <section id="signup" className="section-padding">
            <div className="container mx-auto px-6">
                <div className="card-cute p-8 md:p-12 max-w-3xl mx-auto">
                    <h2 className="heading-cute text-center mb-4">
                        {isMT ? 'Management Team Application' : 'Executive Council Application'}
                    </h2>
                    <p className="subheading-cute text-center mb-8">
                        Please fill out the form below to apply for a position.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="form-group">
                            <label htmlFor="first-choice" className="block text-b0b0bb font-medium mb-2">
                                First Department Choice
                            </label>
                            <select
                                id="first-choice"
                                value={firstChoice}
                                onChange={(e) => setFirstChoice(e.target.value)}
                                required
                                className="form-input"
                            >
                                <option value="">Select a Department</option>
                                {formDepartments.map((dept) => (
                                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="second-choice" className="block text-b0b0bb font-medium mb-2">
                                Second Department Choice
                            </label>
                            <select
                                id="second-choice"
                                value={secondChoice}
                                onChange={(e) => setSecondChoice(e.target.value)}
                                required
                                className="form-input"
                            >
                                <option value="">Select a Department</option>
                                {formDepartments.map((dept) => (
                                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                        {submitMessage && (
                            <p className={`text-center mt-4 ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                                {submitMessage}
                            </p>
                        )}
                    </form>

                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4 text-f0f0f8">
                            {isMT ? 'Management Team FAQs' : 'Executive Council FAQs'}
                        </h3>
                        <div className="space-y-4">
                            {formFaqs.map((faq, index) => (
                                <Accordion key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplicationForm;