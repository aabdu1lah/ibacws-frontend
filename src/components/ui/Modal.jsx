import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM to use createPortal

// We create a new component for the modal to be rendered as a portal.
const Modal = ({ children, onClose }) => {
    // Ensure we're in a browser environment before accessing the DOM
    if (typeof document === 'undefined') return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-2a2b4b rounded-lg p-6 max-w-lg max-h-[80vh] overflow-y-auto text-e0e0e8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-e0e0e8 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;