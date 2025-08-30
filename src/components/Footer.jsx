import React from "react";

const footerSection = (
    <footer
        className="footer-cute text-b0b0bb py-8 text-center shadow-inner"> {/* Applied custom footer style and text color */}
        <div className="container mx-auto px-6">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} IBA Community Welfare
                Society. All rights reserved.</p> {/* Responsive text size */}
            <p className="mt-2 text-xs md:text-sm">Made with <span role="img"
                                                                   aria-label="heart">❤️</span> by
                Hyveron</p> {/* Responsive text size */}
        </div>
    </footer>
);

export default footerSection;