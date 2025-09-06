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
    const [uploading, setUploading] = useState(false);

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
        const memberInfo = members.find(
            (m) => m.username?.toLowerCase() === member.toLowerCase()
        );
        if (memberInfo) {
            setUserInfo(memberInfo);
        } else {
            navigate("/");
        }
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
        if (step === "banner") {
            setStep("finished");
            return;
        }

        if (!userInfo.uploadedFile) {
            setStep("banner"); // proceed if no file
            return;
        }

        setStep('banner')
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
        quizPage,
        setQuizPage,
        preview,
        downloaded,
        setDownloaded,
        uploading
    };
};

export default useOnboarding;
