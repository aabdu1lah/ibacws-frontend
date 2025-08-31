import React from 'react';
import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const channels = [
    {
        name: "Email",
        href: "mailto:cws@khi.iba.edu.pk",
        text: "cws@khi.iba.edu.pk",
        icon: <Mail className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-red-500" />
    },
    {
        name: "Instagram",
        href: "https://instagram.com/ibacws",
        text: "@ibacws",
        icon: <FaInstagram className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-pink-500" />
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/ibacws/",
        text: "@ibacws",
        icon: <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 group-hover:scale-110 transform transition-transform duration-200 text-blue-400" />
    }
];

export default channels;