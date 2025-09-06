import confetti from 'canvas-confetti';

const launchConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
};

export default launchConfetti;