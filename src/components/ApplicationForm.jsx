import React from 'react';
import { UserRoundCog } from 'lucide-react';
import Button from './ui/Button';
import departments from '../constants/departments';
import useForm from '../hooks/useForm';
import Card from "./ui/Card.jsx";

const ApplicationForm = ({ isMT }) => {
    // This hook manages all form state and logic
    const { formData, handleFormChange, handleFormSubmit, isSubmitting, submitMessage } = useForm({
        fullName: '',
        universityEmail: '',
        erp: '',
        whatsappNumber: '',
        program: '',
        batch: '',
        whyJoin: '',
        pastExperiences: '',
        departmentPreference: '',
        departmentPreference2: '',
        acknowledgement: false,
        team: isMT ? 'MT' : 'EC'
    });

    // Filter departments based on whether it's for MT or EC
    const formDepartments = departments;
    const departmentOptions = formDepartments.map((dept) => (
        <option key={dept.name} value={dept.name}>{dept.name}</option>
    ));

    return (
        <div className="mt-12">
            <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center">
                <UserRoundCog className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-yellow-400" /> Application Form
            </h2>
            <Card className="p-6 md:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleFormSubmit(e, isMT)}>
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
                        <label htmlFor="universityEmail" className="block text-sm font-medium text-e0e0e8">University Email<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="email"
                            id="universityEmail"
                            name="universityEmail"
                            value={formData.universityEmail}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="yourname@khi.iba.edu.pk"
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
                        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-e0e0e8">Whatsapp Number<span className="text-red-500 ml-1">*</span></label>
                        <input
                            type="tel"
                            id="whatsappNumber"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="e.g., 03XXXXXXXXX"
                            pattern="^\d{11}$"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="program" className="block text-sm font-medium text-e0e0e8">Program<span className="text-red-500 ml-1">*</span></label>
                        <select
                            id="program"
                            name="program"
                            value={formData.program}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        >
                            <option value="">Select your program</option>
                            <option value="BBA">BBA</option>
                            {isMT && <option value="BA">BA</option>}
                            <option value="ACF">ACF</option>
                            <option value="CS">CS</option>
                            <option value="SS">SS</option>
                            <option value="Math">Math</option>
                            <option value="Econ">Econ</option>
                            <option value="Eco Math">Eco Math</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="batch" className="block text-sm font-medium text-e0e0e8">Batch<span className="text-red-500 ml-1">*</span></label>
                        <select
                            id="batch"
                            name="batch"
                            value={formData.batch}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        >
                            <option value="">Select your batch</option>
                            <option value="Batch of 27">Batch of 27</option>
                            <option value="Batch of 28">Batch of 28</option>
                            {isMT && <option value="Batch of 29">Batch of 29</option>}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="whyJoin" className="block text-sm font-medium text-e0e0e8">Why do you want to join {isMT ? "the Management Team" : "our Executive Council"}? (Min 20 Words)<span className="text-red-500 ml-1">*</span></label>
                        <textarea
                            id="whyJoin"
                            name="whyJoin"
                            rows="5"
                            value={formData.whyJoin}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder={`Share your passion for community welfare and what you can bring to the ${isMT ? "team" : "Executive Council"}.`}
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="pastExperiences" className="block text-sm font-medium text-e0e0e8">Share any past experiences related to community/social welfare.</label>
                        <textarea
                            id="pastExperiences"
                            name="pastExperiences"
                            rows="5"
                            value={formData.pastExperiences}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                            placeholder="Describe any relevant past experiences."
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="departmentPreference" className="block text-sm font-medium text-e0e0e8">Department Preference (1st Choice)<span className="text-red-500 ml-1">*</span></label>
                        <select
                            id="departmentPreference"
                            name="departmentPreference"
                            value={formData.departmentPreference}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        >
                            <option value="">Select a Department</option>
                            {departmentOptions}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="departmentPreference2" className="block text-sm font-medium text-e0e0e8">Department Preference (2nd Choice)</label>
                        <select
                            id="departmentPreference2"
                            name="departmentPreference2"
                            value={formData.departmentPreference2}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-md shadow-sm text-sm md:text-base bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        >
                            <option value="">Select a Department</option>
                            {formDepartments.filter(dept => dept.name !== formData.departmentPreference).map((dept) => (
                                <option key={dept.name} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="acknowledgement" name="acknowledgement" checked={formData.acknowledgement} onChange={handleFormChange} required className="h-4 w-4 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42 text-ff8dc7" />
                        <label htmlFor="acknowledgement" className="ml-2 block text-sm font-medium text-e0e0e8">
                            <span className="text-red-500 ml-1">*</span>
                            {isMT
                                ? "I will make a sincere effort to contribute effectively and consistently throughout the Academic Term."
                                : "I hereby acknowledge that I will not be part of any other society's Executive Council for this Academic term."
                            }
                        </label>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
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

export default ApplicationForm;
