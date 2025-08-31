import React from 'react';

const Card = ({ children, className }) => {
    return (
        <div className={`card-cute ${className}`}>
            {children}
        </div>
    );
};

export default Card;