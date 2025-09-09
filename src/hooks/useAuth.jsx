// hooks/useAuth.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Function to refresh the access token
    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            console.warn('No refresh token available. Logging out.');
            logout();
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token.');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            setToken(data.accessToken);
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
        }
    }, [refreshToken, BACKEND_URL]);

    // LoginPage function
    const login = async (username, password) => {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                setIsLoggedIn(true);
            }

            return data;
        } catch (error) {
            return { success: false, message: 'An error occurred. Please try again later.' };
        }
    };

    // Logout function
    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setIsLoggedIn(false);
    }, []);

    // Effect to check and refresh token periodically
    useEffect(() => {
        if (isLoggedIn) {
            const interval = setInterval(() => {
                refreshAccessToken();
            }, 55 * 60 * 1000); // Refresh every 55 minutes

            return () => clearInterval(interval);
        }
    }, [isLoggedIn, refreshAccessToken]);

    // Update applicant detail function
    const onUpdateApplicant = useCallback(
        async (applicantId, updates) => {
            if (!token) {
                return { success: false, message: "Not authenticated" };
            }

            try {
                const response = await fetch(`${BACKEND_URL}/dashboard/signups/${applicantId}`, {
                    method: "PUT", // or PUT depending on your backend
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(updates),
                });

                const data = await response.json();
                if (!response.ok) {
                    return { success: false, message: data.message || "Failed to update applicant" };
                }

                return { success: true, data };
            } catch (error) {
                console.error("Error updating applicant:", error);
                return { success: false, message: "An error occurred while updating applicant." };
            }
        },
        [token, BACKEND_URL]
    );

    const value = {
        token,
        isLoggedIn,
        login,
        logout,
        refreshAccessToken,
        onUpdateApplicant
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};