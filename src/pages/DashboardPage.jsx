import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import SignupTable from '../components/SignupTable';
import { useSignups } from "../hooks/useSignups";
import Button from '../components/ui/Button.jsx';


const DashboardPage = () => {
    const [signupType, setSignupType] = useState("MT");
    const { signups, loading, error, updateSignup } = useSignups(signupType);
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/dashboard/login" />;
    }

    return (
        <main className="flex-grow pt-20 pb-10">
            <div className="container mx-auto max-w-20xl px-4">
                <h1 className="text-center text-3xl md:text-5xl font-bold text-f0f0f8 mb-8">
                    Dashboard
                </h1>

                <div className="flex justify-center space-x-4 mb-6">
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
                            className={signupType === 'MT' ? 'btn-cute' : 'btn-selected'}
                        >
                            EC Signups
                        </Button>
                    </Card>
                </div>

                <Card className="p-4 md:p-6">
                    {loading && <p className="text-center text-e0e0e8">Loading...</p>}
                    {error && <p className="text-center text-red-400">Error: {error}</p>}
                    {!loading && !error && (
                    <SignupTable data={signups} onUpdateApplicant={updateSignup} />
                    )}
                </Card>
            </div>
        </main>
    );
};

export default DashboardPage;