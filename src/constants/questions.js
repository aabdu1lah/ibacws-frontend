const questions = [
    {
        question: "Which of these is our flagship event?",
        options: ["Blood Drive", "Carnival of Joy", "Medical Camp", "Pinktober"],
        correctAnswer: "Carnival of Joy",
        answerType: "single-choice"
    },
    {
        question: "What is the name of our CEO",
        answer: "Hania Nadeem",
        answerType: "text-input"
    },
    {
        question: "What is the name of our CFO",
        answer: "Preetam Khetpal",
        answerType: "text-input"
    },
    {
        question: "What is the name of our COO",
        answer: "Syed Abdullah",
        answerType: "text-input"
    },
    {
        question: "Which project is not a part of CWS",
        options: ["Blood Drive", "Comic Con", "Medical Camp", "Awareness Drive"],
        correctAnswer: "Comic Con",
        answerType: "single-choice"
    }
];

export const generateRandomQuestions = (num) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};