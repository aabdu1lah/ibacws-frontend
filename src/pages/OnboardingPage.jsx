import React from 'react';
import { PartyPopper, Key, ChevronRight, X } from 'lucide-react';
import useOnboarding from "../hooks/useOnboarding.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Banner from "../components/ui/Banner.jsx";
import {useNavigate} from "react-router-dom";

const OnboardingPage = () => {
    const {
        step,
        setStep,
        keyInput,
        setKeyInput,
        userInfo,
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
    } = useOnboarding();

    const navigate = useNavigate();

    const renderContent = () => {
        if (!userInfo && step !== 'loading') {
            return <div className="text-center text-red-400">User not found.</div>;
        }

        switch (step) {
            case "loading":
                return (
                    <div className="text-center text-xl animate-pulse">
                        Initializing your journey...
                    </div>
                );

            case 'intro':
                return (
                    <>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slideInFromTop text-ff8dc7">
                            Welcome, {userInfo.name}!
                        </h1>
                        <p className="text-lg md:text-xl text-center mb-8 py-1 max-w-2xl opacity-90 animate-slideInFromBottom">
                            Your journey with CWS begins here!
                        </p>
                        <Button onClick={() => setStep('key')}>
                            I am ready!
                            <ChevronRight size={18} className="ml-2 inline-block transition-transform duration-300 transform group-hover:translate-x-1" />
                        </Button>
                    </>
                );

            case 'key':
                return (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-ff8dc7">
                            Enter your Secret Key
                        </h2>
                        <form onSubmit={handleKeySubmit} className="flex flex-col items-center space-y-6 w-full">
                            <div className="relative w-full max-w-xs">
                                <Key size={24} className="absolute left-3 top-1/2 -translate-y-1/2 text-ffb1df" />
                                <input
                                    type="text"
                                    value={keyInput}
                                    onChange={(e) => setKeyInput(e.target.value)}
                                    placeholder="e.g., ABCD123"
                                    className={`w-full text-center px-4 py-3 pl-12 rounded-lg bg-2a2b4b text-e0e0e8 border-2 ${
                                        isKeyValid === false ? 'border-red-500' : 'border-ffb1df'
                                    } focus:outline-none focus:ring-2 focus:ring-ff8dc7`}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={keyInput.length < 5}
                            >
                                Unlock Vault
                            </Button>
                            {isKeyValid === false && (
                                <p className="text-red-400 text-sm">Incorrect key. Please try again.</p>
                            )}
                        </form>
                    </>
                );

            case 'quiz': {
                const currentQuestion = questionsState[quizPage]; // 0 or 1
                const headings = ["Prove your worth!", "Not so fast!"];

                return (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-ff8dc7">
                            {headings[quizPage]}
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (quizPage === 0) {
                                    setQuizPage(1); // move to second question
                                } else {
                                    handleQuizSubmit(e); // final submit
                                }
                            }}
                            className="flex flex-col items-center space-y-6 w-full"
                        >
                            <div className="w-full max-w-md bg-2a2b4b rounded-2xl p-6 shadow-md border border-ffb1df">
                                <p className="text-center font-semibold mb-4 text-lg">
                                    {currentQuestion.question}
                                </p>

                                {currentQuestion.answerType === "single-choice" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {currentQuestion.options.map((option, i) => (
                                            <div
                                                key={i}
                                                className={`py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 text-center
                                        ${
                                                    answers[quizPage] === option
                                                        ? "bg-ffb1df text-black scale-105"
                                                        : "bg-2a2b4b border-2 border-ffb1df hover:bg-ff8dc7"
                                                }`}
                                                onClick={() =>
                                                    setAnswers((prev) => ({
                                                        ...prev,
                                                        [quizPage]: option,
                                                    }))
                                                }
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        value={answers[quizPage] || ""}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                [quizPage]: e.target.value,
                                            }))
                                        }
                                        placeholder="Your answer here..."
                                        className="w-full px-4 py-3 rounded-lg bg-1a1e34 text-e0e0e8 border-2 border-ffb1df focus:outline-none focus:ring-2 focus:ring-ff8dc7"
                                    />
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={!answers[quizPage] || answers[quizPage].length === 0}
                            >
                                {quizPage === 0 ? "Next Question" : "Submit"}
                            </Button>

                            {isQuizCorrect === false && quizPage === 1 && (
                                <p className="text-yellow-400 text-sm mt-4">
                                    Not quite, but we like your spirit — the vault opens
                                    anyway!
                                </p>
                            )}
                        </form>
                    </>
                );
            }

            case 'reveal':
                return (
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center mb-6">
                            <PartyPopper
                                size={40}
                                className="text-ff8dc7 animate-bounce-in mr-4"
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-ff8dc7 animate-fade-in-up">
                                Congratulations, {userInfo.name}!
                            </h2>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg md:text-xl mb-2 text-f0f0f8 opacity-0 animate-fade-in-up">
                                You’ve been appointed as:
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-ffb1df mb-4 opacity-0 animate-fade-in-up delay-500">
                                {userInfo.position}
                            </p>

                            {/* 👇 Add tagline here */}
                            {userInfo.tagline && (
                                <p className="text-md md:text-lg italic text-e0e0e8 opacity-0 animate-fade-in-up delay-1000 mb-8">
                                    {userInfo.tagline}
                                </p>
                            )}

                            <div className="flex space-x-4">
                                <Button onClick={handleAccept}
                                        className="bg-green-500 text-white hover:bg-green-600 transition-colors">
                                    <span className="flex items-center"> Accept Position </span>
                                </Button>
                                <Button onClick={handleDecline}
                                        className="bg-red-500 text-white hover:bg-red-600 transition-colors">
                                    <span className="flex items-center"> Decline Invitation </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case "banner":
                return (
                    <Banner
                        userInfo={userInfo}
                        handleFileChange={handleFileChange}
                        getInitials={getInitials}
                        preview={preview}
                        setDownloaded={setDownloaded}
                        handleAccept={handleAccept}
                        uploading={uploading}
                    />
                );

            case 'error':
                return <div className="text-center text-red-400">Something went wrong. Please check your URL and try
                    again.</div>;

            case "finished":
                return (
                    <div className="flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-ff8dc7">
                            You’re all set, {userInfo.name}! 🎉
                        </h2>

                        <p className="text-lg md:text-xl text-f0f0f8 max-w-2xl">
                            Welcome aboard! Your journey with <span className="font-semibold">IBA CWS</span> officially begins now.
                        </p>

                        <div className="bg-2a2b4b border border-ffb1df rounded-xl p-4 shadow-md max-w-md">
                            <p className="mb-2">
                                Your username is <span className="font-semibold">{userInfo.username}</span>
                            </p>
                            <p className="text-sm md:text-base text-gray-300">
                                <span className="font-semibold text-ffb1df">Important:</span> Your
                                <span className="font-bold"> Secret Key</span> also serves as your
                                <span className="italic"> temporary password</span>. Please keep it safe —
                                you’ll need it the first time you log in.
                            </p>
                        </div>


                        <Button onClick={() => navigate("/dashboard")}
                                className="bg-ff8dc7 text-black hover:bg-ffb1df transition-colors">
                            Go to Dashboard
                        </Button>
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen relative bg-cute-gradient text-e0e0e8 font-inter overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-cyan-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-40 h-40 md:w-56 md:h-56 bg-pink-700 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
            <Card className="z-10 text-center max-w-4xl p-8 md:p-12 relative">
                {renderContent()}
            </Card>
        </div>
    );
};

export default OnboardingPage;
