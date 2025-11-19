import { useState } from "react";
import MedicalCampApplicantOverlay from "./ui/MedicalCampApplicantOverlay.jsx";
import Button from "./ui/Button.jsx";

const MedicalCampTable = ({ data, onUpdateSignup }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data by search term
  const filteredData = data.filter(
    (row) =>
      row.erp?.toString().includes(searchTerm) ||
      row.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.contact?.includes(searchTerm)
  );

  // Group data by status
  const newSignups = filteredData.filter((row) => row.status === "new" || !row.status);
  const readSignups = filteredData.filter((row) => row.status === "read");
  const shortlistedSignups = filteredData.filter((row) => row.status === "shortlisted");

  const handleStatusChange = async (id, newStatus) => {
    await onUpdateSignup(id, { status: newStatus });
  };

  const renderColumn = (title, signups, statusValue) => {
    return (
      <div className="flex-1 min-w-0">
        <div className="bg-252a42 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-e0e0e8 mb-4 text-center">
            {title} ({signups.length})
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {signups.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-4">No entries</p>
            ) : (
              signups.map((row) => (
                <div
                  key={row.id}
                  className="bg-2a2b4b rounded-lg p-3 mb-2 cursor-pointer hover:bg-3c4056 transition-colors"
                  onClick={() => setExpandedRow(row)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-e0e0e8 truncate">{row.full_name || "-"}</p>
                      <p className="text-sm text-gray-400">ERP: {row.erp || "-"}</p>
                      <p className="text-sm text-gray-400">Contact: {row.contact || "-"}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <select
                      value={row.status || "new"}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(row.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full px-2 py-1 text-xs rounded bg-252a42 border border-gray-600 text-e0e0e8 focus:ring-1 focus:ring-ff8dc7 focus:border-ff8dc7"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="shortlisted">Shortlisted</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ERP, Name, or Contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-252a42 text-e0e0e8 focus:ring-2 focus:ring-ff8dc7"
        />
      </div>

      {/* Three Column Layout */}
      <div className="flex gap-4 flex-col md:flex-row">
        {renderColumn("New", newSignups, "new")}
        {renderColumn("Read", readSignups, "read")}
        {renderColumn("Shortlisted", shortlistedSignups, "shortlisted")}
      </div>

      {/* Applicant Overlay */}
      {expandedRow && (
        <MedicalCampApplicantOverlay
          key={expandedRow.id}
          applicant={expandedRow}
          onClose={() => setExpandedRow(null)}
          onSave={(updated) => {
            onUpdateSignup(updated.id, updated);
            setExpandedRow(null);
          }}
        />
      )}
    </div>
  );
};

export default MedicalCampTable;

