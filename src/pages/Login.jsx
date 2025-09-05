import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Initialize the hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const result = await login(username, password);

        if (result.success) {
            // Redirect to the dashboard on successful login
            navigate('/dashboard');
        } else {
            setErrorMessage(result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <main className="flex-grow flex items-center justify-center pt-20 pb-10">
            <Card className="p-8 w-full max-w-sm">
                <h1 className="text-center text-3xl font-bold text-f0f0f8 mb-6">
                    Dashboard Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-e0e0e8 mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md shadow-sm bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-e0e0e8 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md shadow-sm bg-252a42 border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-400 text-sm text-center">
                            {errorMessage}
                        </p>
                    )}
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Card>
        </main>
    );
};

export default Login;