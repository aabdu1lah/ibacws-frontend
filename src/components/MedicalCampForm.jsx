import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import Button from './ui/Button';
import useForm from '../hooks/useForm';
import Card from "./ui/Card.jsx";

const MedicalCampForm = () => {
    const [isCwsMember, setIsCwsMember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    
    // This hook manages all form state and logic
    const { formData, handleFormChange } = useForm({
        fullName: '',
        erp: '',
        contact: '',
        guardianName: '',
        guardianContact: '',
        briefDescription: '',
        isCwsTeamMember: false,
        cwsPosition: '',
        whyAttend: '',
        willingToContribute: false,
        motionSickness: false,
        travellingIssues: false,
        otherMedicalNotes: '',
        disclaimer: false
    });

    const handleCwsMemberChange = (e) => {
        const value = e.target.value === 'yes';
        setIsCwsMember(value);
        handleFormChange({ target: { name: 'isCwsTeamMember', type: 'checkbox', checked: value } });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const formDataObj = new FormData(event.target);
        const payload = {};

        // Convert form data to camelCase and handle special fields
        for (const [key, value] of formDataObj.entries()) {
            let cleanKey = key.charAt(0).toLowerCase() + key.slice(1);
            
            // Handle radio buttons and checkboxes
            if (cleanKey === 'isCwsTeamMember') {
                payload.isCwsTeamMember = value === 'yes';
            } else if (cleanKey === 'willingToContribute') {
                payload.willingToContribute = value === 'yes';
            } else if (cleanKey === 'motionSickness' || cleanKey === 'travellingIssues' || cleanKey === 'disclaimer') {
                payload[cleanKey] = value === 'on';
            } else {
                payload[cleanKey] = value;
            }
        }

        try {
            const response = await fetch(`${BACKEND_URL}/dashboard/submit-medical-camp-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitMessage('Registration received! We will contact you soon.');
                event.target.reset();
                setIsCwsMember(false);
            } else {
                console.error('Submission error:', result.message);
                // Show specific error message from backend, or default message
                setSubmitMessage(result.message || 'There was an error submitting your registration. Please try again.');
            }
        } catch (error) {
            console.error('Network or parsing error:', error);
            setSubmitMessage('There was a network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center">
                <Stethoscope className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-yellow-400" /> Medical Camp Registration
            </h2>
            
            <Card className="p-6 md:p-8 mb-6">
                <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">Medical Camp Details</h3>
                    <ul className="text-sm text-blue-100 space-y-1">
                        <li><strong>Location:</strong> Sanghar, Sindh</li>
                        <li><strong>Date:</strong> November 30th</li>
                        <li><strong>Travel Time:</strong> Approximately 4 hours away</li>
                    </ul>
                </div>
            </Card>

            <Card className="p-6 md:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                    <div className="space-y-1">
                        <label htmlFor="fullName" className="block text-sm font-medium text-e0e0e8">Full Name<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="erp" className="block text-sm font-medium text-e0e0e8">ERP<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="text"
                            id="erp"
                            name="erp"
                            value={formData.erp}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="e.g., 30XXX"
                            minLength={5}
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="contact" className="block text-sm font-medium text-e0e0e8">Contact<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="e.g., 03XXXXXXXXX"
                            pattern="^\d{11}$"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="guardianName" className="block text-sm font-medium text-e0e0e8">Guardian's Name<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="text"
                            id="guardianName"
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="Guardian's full name"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="guardianContact" className="block text-sm font-medium text-e0e0e8">Guardian's Contact<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="tel"
                            id="guardianContact"
                            name="guardianContact"
                            value={formData.guardianContact}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="e.g., 03XXXXXXXXX"
                            pattern="^\d{11}$"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="briefDescription" className="block text-sm font-medium text-e0e0e8">Brief Description About Yourself</label>
                        <textarea
                            id="briefDescription"
                            name="briefDescription"
                            rows="5"
                            value={formData.briefDescription}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="Tell us a bit about yourself..."
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-e0e0e8 mb-2">Are you currently part of the CWS team?<span className="text-red-500 ml-1">*</span></label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="isCwsTeamMember"
                                    value="yes"
                                    checked={isCwsMember === true}
                                    onChange={handleCwsMemberChange}
                                    required
                                    className="mr-2"
                                />
                                <span className="text-e0e0e8">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="isCwsTeamMember"
                                    value="no"
                                    checked={isCwsMember === false}
                                    onChange={(e) => {
                                        if (e.target.value === 'no') {
                                            setIsCwsMember(false);
                                            handleFormChange({ target: { name: 'isCwsTeamMember', type: 'checkbox', checked: false } });
                                            handleFormChange({ target: { name: 'cwsPosition', value: '' } });
                                        }
                                    }}
                                    required
                                    className="mr-2"
                                />
                                <span className="text-e0e0e8">No</span>
                            </label>
                        </div>
                        {isCwsMember && (
                            <div className="mt-2">
                                <label htmlFor="cwsPosition" className="block text-sm font-medium text-e0e0e8">State your position<span className="text-red-500 ml-1">*</span></label>
                                <input
                                    type="text"
                                    id="cwsPosition"
                                    name="cwsPosition"
                                    value={formData.cwsPosition}
                                    onChange={handleFormChange}
                                    required={isCwsMember}
                                    className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7 mt-2"
                                    placeholder="e.g., Executive Council Member, Management Team"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="whyAttend" className="block text-sm font-medium text-e0e0e8">Why do you want to attend the medical camp?<span className="text-red-500 ml-1">*</span></label>
                        <textarea
                            id="whyAttend"
                            name="whyAttend"
                            rows="5"
                            value={formData.whyAttend}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="Share your motivation for attending the medical camp..."
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-e0e0e8 mb-2">Are you willing to contribute to the camp before the date as well?</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="willingToContribute"
                                    value="yes"
                                    checked={formData.willingToContribute === true || formData.willingToContribute === 'yes'}
                                    onChange={(e) => handleFormChange({ target: { name: 'willingToContribute', type: 'radio', value: e.target.value } })}
                                    className="mr-2"
                                />
                                <span className="text-e0e0e8">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="willingToContribute"
                                    value="no"
                                    checked={formData.willingToContribute === false || formData.willingToContribute === 'no'}
                                    onChange={(e) => handleFormChange({ target: { name: 'willingToContribute', type: 'radio', value: e.target.value } })}
                                    className="mr-2"
                                />
                                <span className="text-e0e0e8">No</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-e0e0e8 mb-2">Medical/Travel Questions</label>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="motionSickness"
                                name="motionSickness"
                                checked={formData.motionSickness}
                                onChange={handleFormChange}
                                className="h-4 w-4 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42 text-ff8dc7"
                            />
                            <label htmlFor="motionSickness" className="ml-2 block text-sm font-medium text-e0e0e8">
                                Do you have motion sickness?
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="travellingIssues"
                                name="travellingIssues"
                                checked={formData.travellingIssues}
                                onChange={handleFormChange}
                                className="h-4 w-4 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42 text-ff8dc7"
                            />
                            <label htmlFor="travellingIssues" className="ml-2 block text-sm font-medium text-e0e0e8">
                                Do you have any travelling issues?
                            </label>
                        </div>

                        <div className="space-y-1 mt-2">
                            <label htmlFor="otherMedicalNotes" className="block text-sm font-medium text-e0e0e8">Other Medical Notes</label>
                            <textarea
                                id="otherMedicalNotes"
                                name="otherMedicalNotes"
                                rows="3"
                                value={formData.otherMedicalNotes}
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                                placeholder="Any other medical conditions or notes..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="disclaimer"
                            name="disclaimer"
                            checked={formData.disclaimer}
                            onChange={handleFormChange}
                            required
                            className="h-4 w-4 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42 text-ff8dc7 mt-1"
                        />
                        <label htmlFor="disclaimer" className="ml-2 block text-sm font-medium text-e0e0e8">
                            <span className="text-red-500 ml-1">* </span>
                            I understand that CWS reserves the right to disqualify participation in the camp if I fail to show up for event planning activities.
                        </label>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </Button>
                    {submitMessage && (
                        <p className={`mt-4 text-center font-semibold ${submitMessage.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
                            {submitMessage}
                        </p>
                    )}
                </form>
            </Card>
        </div>
    );
};

export default MedicalCampForm;

