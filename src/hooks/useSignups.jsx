// hooks/useSignups.js
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export const useSignups = (signupType) => {
  const { token, logout, onUpdateApplicant } = useAuth();
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchSignups = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/signups/${signupType.toUpperCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          return;
        }
        throw new Error("Failed to fetch signups");
      }

      const data = await response.json();
      setSignups(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, signupType, BACKEND_URL, logout]);

  useEffect(() => {
    fetchSignups();
  }, [fetchSignups]);

  // wrapper around onUpdateApplicant
  const updateSignup = async (id, updates) => {
    const result = await onUpdateApplicant(id, updates);
    if (result.success) {
      setSignups((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    }
    return result;
  };

  return { signups, loading, error, fetchSignups, updateSignup };
};
