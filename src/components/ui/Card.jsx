import React from 'react';

const Card = ({ children, className }) => {
    return (
        <div className={`card-cute p-6 md:p-8 ${className}`}>
            {children}
        </div>
    );
};

export default Card;