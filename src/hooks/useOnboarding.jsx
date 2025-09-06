import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { members } from "../constants/team.js";
import { generateRandomQuestions } from "../constants/questions.js";
import launchConfetti from "../components/ui/Confetti.jsx";

const useOnboarding = () => {
    const { member } = useParams();
    const navigate = useNavigate();

    const [step, setStep] = useState("loading");
    const [keyInput, setKeyInput] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [isKeyValid, setIsKeyValid] = useState(null);
    const [questionsState, setQuestionsState] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isQuizCorrect, setIsQuizCorrect] = useState(null);
    const [quizPage, setQuizPage] = useState(0);
    const [downloaded, setDownloaded] = useState(false);
    const [preview, setPreview] = useState(null);
    const [uploading] = useState(false);
    const [isAlreadyOnboarded, setIsAlreadyOnboarded] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setUserInfo((prev) => ({
                ...prev,
                uploadedFile: file, // keep actual file for backend
                profileImage: url // local preview
            }));
        }
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    useEffect(() => {
        if (!member) return;

        const fetchOnboardStatus = async () => {
            try {
                const memberInfo = members.find(
                    (m) => m.username?.toLowerCase() === member.toLowerCase()
                );

                if (!memberInfo) {
                    navigate("/");
                    return;
                }

                setUserInfo(memberInfo);

                // Check onboard status
                const res = await fetch(`${BACKEND_URL}/user/onboard-status?username=${memberInfo.username}`);
                const data = await res.json();

                if (data.success && data.onboarded) {
                    setIsAlreadyOnboarded(true);
                    setStep("banner"); // skip all other steps
                } else {
                    setStep("intro");
                }
            } catch (err) {
                console.error("Error fetching onboard status:", err);
                setStep("error");
            }
        };

        fetchOnboardStatus();
    }, [member, navigate]);


    useEffect(() => {
        if (step === "loading" && userInfo) {
            const timer = setTimeout(() => setStep("intro"), 4000);
            return () => clearTimeout(timer);
        }
    }, [step, userInfo]);

    const handleKeySubmit = (e) => {
        e.preventDefault();
        if (keyInput.toUpperCase() === userInfo.secretKey) {
            setIsKeyValid(true);

            if (userInfo.position === "Patron") {
                setTimeout(() => {
                    launchConfetti();
                    setStep("reveal");
                }, 1200);
            } else {
                setQuestionsState(generateRandomQuestions(2));
                setTimeout(() => setStep("quiz"), 1200);
            }
        } else {
            setIsKeyValid(false);
            setTimeout(() => setIsKeyValid(null), 1500);
        }
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        let allCorrect = true;
        questionsState.forEach((q, idx) => {
            if (q.answerType === "single-choice") {
                if (answers[idx] !== q.correctAnswer) allCorrect = false;
            } else if (q.answerType === "text-input") {
                if (answers[idx]?.toLowerCase() !== q.answer.toLowerCase())
                    allCorrect = false;
            }
        });
        setIsQuizCorrect(allCorrect);
        setTimeout(() => {
            launchConfetti();
            setStep("reveal");
        }, 1000);
    };

    const handleAccept = async () => {
        if (isAlreadyOnboarded) {
            // do nothing, they just interact with banner buttons
            return;
        }

        if (step === "banner") {
            setStep("finished");
            return;
        }

        // for first-time onboarders
        if (!userInfo.uploadedFile) {
            setStep("banner"); // proceed if no file
            return;
        }

        setStep('banner'); // proceed to banner
    };

    const handleOnboarding = async () => {
        if (!userInfo?.username) return;

        try {
            const response = await fetch(`${BACKEND_URL}/user/onboard-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userInfo.username }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Onboard status updated!");
                setStep("finished"); // move to finished/dashboard step
            } else {
                console.error("Failed to update onboard status:", data.message);
            }
        } catch (err) {
            console.error("Error updating onboard status:", err);
        }
    };
    const handleDecline = () => navigate("/");

    return {
        step,
        setStep,
        keyInput,
        setKeyInput,
        userInfo,
        setUserInfo,
        isKeyValid,
        questionsState,
        answers,
        setAnswers,
        isQuizCorrect,
        handleKeySubmit,
        handleQuizSubmit,
        handleAccept,
        handleDecline,
        handleFileChange,
        getInitials,
        handleOnboarding,
        quizPage,
        setQuizPage,
        preview,
        downloaded,
        setDownloaded,
        uploading,
        isAlreadyOnboarded
    };
};

export default useOnboarding;
