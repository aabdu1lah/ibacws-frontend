import { useState } from 'react';

const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // --- Form Submission Handler ---
    const handleFormSubmit = async (event, isMT) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const formData = new FormData(event.target);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            let cleanKey = key.startsWith('mt') ? key.slice(2) : key;
            cleanKey = cleanKey.charAt(0).toLowerCase() + cleanKey.slice(1);

            if (cleanKey === 'acknowledgement') {
                payload[cleanKey] = value === 'on';
            } else {
                payload[cleanKey] = value;
            }
        }

        payload['targetSheet'] = isMT ? 'MT Applications' : 'EC Applications';

        try {
            const response = await fetch(`${BACKEND_URL}/submit-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitMessage('Application received! See you at the interviews :)');
                event.target.reset();
            } else {
                console.error('Submission error:', result.message);
                setSubmitMessage(`There was an error submitting your application: ${result.message}`);
            }
        } catch (error) {
            console.error('Network or parsing error:', error);
            setSubmitMessage('There was a network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    }

    return {
        formData,
        handleFormChange,
        handleFormSubmit,
        isSubmitting,
        submitMessage
    };
};

export default useForm;