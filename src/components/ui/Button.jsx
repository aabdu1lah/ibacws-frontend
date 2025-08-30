import React from 'react';

const Button = ({ children, onClick, type = "button", disabled, className }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`btn-cute py-2 px-6 md:py-3 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;