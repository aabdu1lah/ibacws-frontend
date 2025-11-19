// hooks/useMedicalCampSignups.jsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export const useMedicalCampSignups = () => {
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
        `${BACKEND_URL}/dashboard/medical-camp-signups`,
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
        throw new Error("Failed to fetch medical camp signups");
      }

      const data = await response.json();
      setSignups(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, BACKEND_URL, logout]);

  useEffect(() => {
    fetchSignups();
  }, [fetchSignups]);

  // wrapper around onUpdateApplicant for medical camp signups
  const updateSignup = async (id, updates) => {
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/medical-camp-signups/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to update signup" };
      }

      // Update local state
      setSignups((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );

      return { success: true, data };
    } catch (error) {
      console.error("Error updating medical camp signup:", error);
      return { success: false, message: "An error occurred while updating signup." };
    }
  };

  return { signups, loading, error, fetchSignups, updateSignup };
};

