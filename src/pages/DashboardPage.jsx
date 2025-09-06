import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import SignupTable from '../components/SignupTable';

const DashboardPage = () => {
    const { token, isLoggedIn, logout } = useAuth();
    const [signups, setSignups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [signupType, setSignupType] = useState('MT');

    useEffect(() => {
        const fetchSignups = async () => {
            if (!isLoggedIn) {
                return;
            }
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

            try {
                const response = await fetch(`${BACKEND_URL}/dashboard/signups/${signupType.toUpperCase()}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage;

                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message;
                    } catch (e) {
                        errorMessage = errorText;
                    }

                    if (response.status === 401 || response.status === 403) {
                        logout();
                        return;
                    }

                    throw new Error(errorMessage || 'Failed to fetch signups');
                }

                const data = await response.json();
                setSignups(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSignups();
    }, [isLoggedIn, token, logout, signupType]);

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
                        <button
                            onClick={() => setSignupType('MT')}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                signupType === 'MT'
                                    ? 'bg-252a42 text-ff8dc7 border border-ff8dc7'
                                    : 'bg-ff8dc7 text-252a42 shadow-lg'
                            }`}
                        >
                            MT Signups
                        </button>
                    </Card>
                    <Card>
                        <button
                            onClick={() => setSignupType('EC')}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                signupType === 'EC'
                                    ? 'bg-252a42 text-ff8dc7 border border-ff8dc7'
                                    : 'bg-ff8dc7 text-252a42 shadow-lg'
                            }`}
                        >
                            EC Signups
                        </button>
                    </Card>
                </div>

                <Card className="p-4 md:p-6">
                    {loading && <p className="text-center text-e0e0e8">Loading signups...</p>}
                    {error && <p className="text-center text-red-400">Error: {error}</p>}
                    {!loading && !error && <SignupTable data={signups} signupType={signupType} />}
                </Card>
            </div>
        </main>
    );
};

export default DashboardPage;