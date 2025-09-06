import React, { useState } from 'react';
import Modal from "./ui/Modal.jsx";

const SignupTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(20);
    const [expandedRow, setExpandedRow] = useState(null);

    // Check if data is a valid array
    if (!Array.isArray(data)) {
        console.error("SignupTable received invalid data. Expected an array.");
        return (
            <div className="text-center italic text-gray-400">
                Error: Unable to load signup data.
            </div>
        );
    }

    const headerMap = [
        { key: 'full_name', label: 'Name', copyable: true, width: 'w-[15%]' },
        { key: 'university_email', label: 'Email', copyable: true, width: 'w-[15%]' },
        { key: 'erp', label: 'ERP', copyable: true, width: 'w-[8%]' },
        { key: 'whatsapp_number', label: 'Phone Number', copyable: true, width: 'w-[12%]' },
        { key: 'why_join', label: 'Why Join', width: 'w-[15%]' },
        { key: 'past_experiences', label: 'Experience', width: 'w-[15%]' },
        { key: 'department_preference', label: 'Department', width: 'w-[10%]' },
        { key: 'department_preference_2', label: 'Department 2', width: 'w-[10%]' },
        { key: 'program', label: 'Program', width: 'w-[10%]' },
        { key: 'batch', label: 'Batch', width: 'w-[10%]' },
    ];

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowClick = (row) => {
        setExpandedRow(row);
    };

    const handleCloseModal = () => {
        setExpandedRow(null);
    };

    const handleCopy = (text) => {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };

    return (
        <div className="overflow-x-auto rounded-xl shadow-lg relative">
            {expandedRow && (
                <Modal onClose={handleCloseModal}>
                    <h2 className="text-xl font-bold mb-4">Details</h2>
                    {headerMap.map(header => (
                        <div key={header.key} className="mb-2">
                            <p className="font-semibold text-gray-400">{header.label}:</p>
                            <div className="flex items-center">
                                <p className="flex-1 whitespace-pre-wrap">{expandedRow[header.key] || '-'}</p>
                                {header.copyable && (
                                    <button
                                        onClick={() => handleCopy(expandedRow[header.key])}
                                        className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </Modal>
            )}

            <div className="max-h-[70vh] overflow-y-auto w-full">
                <table className="min-w-max table-fixed border-collapse w-full">
                    <thead className="bg-252a42 text-e0e0e8 sticky top-0">
                    <tr>
                        {headerMap.map(header => (
                            <th
                                key={header.key}
                                className={`${header.width} px-4 py-2 text-left font-semibold text-sm md:text-base whitespace-nowrap`}
                            >
                                {header.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-2a2b4b text-e0e0e8 divide-y divide-gray-700">
                    {currentRows.length > 0 ? (
                        currentRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-3c4056 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleRowClick(row)}
                            >
                                {headerMap.map(header => {
                                    const cellContent = row[header.key] || '-';
                                    const displayContent = cellContent.length > 50 ? `${cellContent.substring(0, 50)}...` : cellContent;
                                    return (
                                        <td
                                            key={header.key}
                                            className={`px-4 py-2 text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap`}
                                        >
                                            {displayContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headerMap.length} className="px-4 py-4 text-center italic text-gray-400">
                                No signups found yet.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <nav className="flex justify-center items-center py-4 bg-252a42 rounded-b-xl">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 mx-1 rounded-md text-e0e0e8 bg-3c4056 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-e0e0e8 mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 mx-1 rounded-md text-e0e0e8 bg-3c4056 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </nav>
            )}
        </div>
    );
};

export default SignupTable;