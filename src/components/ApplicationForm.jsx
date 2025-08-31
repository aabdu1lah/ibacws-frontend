import React from 'react';
import { UserRoundCog } from 'lucide-react';
import Button from './ui/Button';
import departments from '../constants/departments';
import useForm from '../hooks/useForm';
import Card from "./ui/Card.jsx";

const ApplicationForm = ({ isMT }) => {
    const { formData, handleFormChange, handleFormSubmit, isSubmitting, submitMessage } = useForm({
        fullName: '',
        universityEmail: '',
        erp: '',
        whatsappNumber: '',
        program: '',
        batch: '',
        whyJoin: '',
        pastExperiences: '',
        firstChoice: '',
        secondChoice: '',
        acknowledgement: false,
    });

    const formDepartments = departments;
    const departmentOptions = formDepartments.map((dept) => (
        <option key={dept.name} value={dept.name}>{dept.name}</option>
    ));

    return (
        <Card>
            <h2 className="text-xl md:text-3xl font-bold text-f0f0f8 mb-4 md:mb-6 flex items-center">
                <UserRoundCog className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-yellow-400" /> Application Form
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleFormSubmit(e, isMT)}>
                <div className="form-group">
                    <label htmlFor="fullName" className="block text-sm font-medium text-e0e0e8 mb-1">Full Name<span className="text-red-500 ml-1">*</span></label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleFormChange} required className="form-input" placeholder="John Doe" />
                </div>
                {/* ... all other form inputs go here ... */}
                <div className="form-group">
                    <label htmlFor="firstChoice" className="block text-sm font-medium text-e0e0e8 mb-1">Department Preference (1st Choice)<span className="text-red-500 ml-1">*</span></label>
                    <select id="firstChoice" name="firstChoice" value={formData.firstChoice} onChange={handleFormChange} required className="form-input">
                        <option value="">Select a Department</option>
                        {departmentOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="secondChoice" className="block text-sm font-medium text-e0e0e8 mb-1">Department Preference (2nd Choice)</label>
                    <select id="secondChoice" name="secondChoice" value={formData.secondChoice} onChange={handleFormChange} className="form-input">
                        <option value="">Select a Department</option>
                        {formDepartments.filter(dept => dept.name !== formData.firstChoice).map((dept) => (
                            <option key={dept.name} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="acknowledgement" name="acknowledgement" checked={formData.acknowledgement} onChange={handleFormChange} required className="h-4 w-4 text-ff8dc7 rounded border-gray-600 focus:ring-ff8dc7 bg-252a42" />
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
                    <p className={`mt-4 text-center font-semibold ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                        {submitMessage}
                    </p>
                )}
            </form>
        </Card>
    );
};

export default ApplicationForm;