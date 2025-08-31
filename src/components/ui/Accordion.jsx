import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Card from "./Card.jsx";

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="overflow-hidden">
            <button
                className="flex justify-between items-center w-full p-4 md:p-5 text-left text-base md:text-lg font-semibold text-f0f0f8 hover:bg-27284b transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90 text-a9e0ff' : 'text-b0b0bb'}`} />
            </button>
            {isOpen && (
                <div className="p-4 md:p-5 pt-0 text-sm md:text-base text-c9c9d5">
                    <p>{answer}</p>
                </div>
            )}
        </Card>
    );
};

export default Accordion;