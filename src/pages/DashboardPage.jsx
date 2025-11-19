import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import SignupTable from '../components/SignupTable';
import MedicalCampTable from '../components/MedicalCampTable';
import { useSignups } from "../hooks/useSignups";
import { useMedicalCampSignups } from "../hooks/useMedicalCampSignups";
import Button from '../components/ui/Button.jsx';


const DashboardPage = () => {
    const [signupType, setSignupType] = useState("MT");
    const { signups, loading, error, updateSignup } = useSignups(signupType);
    const { signups: medicalCampSignups, loading: medicalCampLoading, error: medicalCampError, updateSignup: updateMedicalCampSignup } = useMedicalCampSignups();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/dashboard/login" />;
    }

    const isMedicalCamp = signupType === 'MEDICAL_CAMP';
    const currentLoading = isMedicalCamp ? medicalCampLoading : loading;
    const currentError = isMedicalCamp ? medicalCampError : error;

    return (
        <main className="flex-grow pt-20 pb-10">
            <div className="container mx-auto max-w-20xl px-4">
                <h1 className="text-center text-3xl md:text-5xl font-bold text-f0f0f8 mb-8">
                    Dashboard
                </h1>

                <div className="flex justify-center space-x-4 mb-6 flex-wrap">
                    <Card>
                        <Button
                            onClick={() => setSignupType('MT')}
                            className={signupType === 'MT' ? 'btn-selected' : 'btn-cute'}
                        >
                            MT Signups
                        </Button>
                    </Card>
                    <Card>
                        <Button
                            onClick={() => setSignupType('EC')}
                            className={signupType === 'EC' ? 'btn-selected' : 'btn-cute'}
                        >
                            EC Signups
                        </Button>
                    </Card>
                    <Card>
                        <Button
                            onClick={() => setSignupType('MEDICAL_CAMP')}
                            className={signupType === 'MEDICAL_CAMP' ? 'btn-selected' : 'btn-cute'}
                        >
                            Medical Camp
                        </Button>
                    </Card>
                </div>

                <Card className="p-4 md:p-6">
                    {currentLoading && <p className="text-center text-e0e0e8">Loading...</p>}
                    {currentError && <p className="text-center text-red-400">Error: {currentError}</p>}
                    {!currentLoading && !currentError && (
                        isMedicalCamp ? (
                            <MedicalCampTable data={medicalCampSignups} onUpdateSignup={updateMedicalCampSignup} />
                        ) : (
                            <SignupTable data={signups} onUpdateApplicant={updateSignup} />
                        )
                    )}
                </Card>
            </div>
        </main>
    );
};

export default DashboardPage;