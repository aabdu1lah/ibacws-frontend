import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm.jsx';
import ApplicationInfo from '../components/ApplicationInfo.jsx';
import Card from '../components/ui/Card.jsx';
import { ChevronRight } from 'lucide-react';

const ApplicationFormPage = ({ formType }) => {
    const navigate = useNavigate();

    return (
        <>
            <main className="flex-grow pt-14 bg-cute-gradient">
                <div className="container mx-auto px-6 py-12 md:py-24">
                    <Card className="max-w-3xl mx-auto p-8 md:p-12">
                        <div className="flex justify-start mb-6">
                            <button
                                onClick={() => navigate('/')}
                                className="btn-cute px-2 py-1 mb-3 text-black text-xs flex items-center transition-all duration-300 transform hover:scale-105"
                            >
                                <ChevronRight className="rotate-180 w-4 h-4 mr-2" /> Back to Home
                            </button>
                        </div>
                        <h1 className="heading-cute text-center mb-6 animate-fadeIn text-3xl md:text-4xl">
                            {
                                formType === 'EC'
                                    ? "Executive Council "
                                    : "Management Team "
                            }
                            Sign-up
                        </h1>
                        <p className="subheading-cute text-center mb-10 max-w-2xl mx-auto text-base md:text-lg">
                            {
                                formType === 'EC'
                                    ? "Ready to lead and make a difference? Join our Executive Council and shape the future of our society!"
                                    : "Ready to contribute to our initiatives? Join our Management Team! "
                            }
                        </p>
                        <ApplicationInfo isMT={formType === 'MT'} />
                        <ApplicationForm isMT={formType === 'MT'}/>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default ApplicationFormPage;
