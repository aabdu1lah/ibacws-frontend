import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import Button from "./Button";

const MedicalCampApplicantOverlay = ({ applicant, onClose, onSave }) => {
  if (!applicant) return null;

  const [formData, setFormData] = useState(applicant);
  
  // Reset form when applicant changes
  useEffect(() => {
    setFormData(applicant);
  }, [applicant]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-3xl bg-[#23203f] p-6 text-e0e0e8 shadow-xl rounded-t-2xl overflow-y-auto max-h-[90vh] z-10 animate-slideInFromBottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-ff8dc7">Applicant Details</h2>
          <Button
            onClick={onClose}
            className="p-2 rounded hover:bg-[#2a2b4b] transition"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Applicant Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {Object.entries(formData).map(([key, val]) => {
            if (key === "id" || key.includes("created") || key === "status" || key === "comments") return null;

            // Handle boolean fields
            if (typeof val === "boolean") {
              return (
                <div key={key}>
                  <label className="text-sm text-gray-400 capitalize block mb-1">
                    {key.replace(/_/g, " ")}
                  </label>
                  <p className="font-medium">{val ? "Yes" : "No"}</p>
                </div>
              );
            }

            // Normal read-only details
            return (
              <div key={key}>
                <p className="text-sm text-gray-400 capitalize mb-1">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="font-medium">{val?.toString() || "-"}</p>
              </div>
            );
          })}
        </div>

        {/* Status and Comments Section */}
        <div className="border-t border-gray-700 pt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400 capitalize block mb-2">
              Status
            </label>
            <select
              value={formData.status || "new"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-252a42 text-e0e0e8 focus:ring-2 focus:ring-ff8dc7 focus:border-ff8dc7"
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="shortlisted">Shortlisted</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 capitalize block mb-2">
              Comments
            </label>
            <textarea
              rows="4"
              value={formData.comments || ""}
              onChange={(e) => handleChange("comments", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-252a42 text-e0e0e8 focus:ring-2 focus:ring-ff8dc7 focus:border-ff8dc7"
              placeholder="Add comments about this applicant..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6 border-t border-gray-700 pt-4">
          <Button
            onClick={onClose}
            className="px-5 py-2 rounded-full font-semibold bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)} className="btn-cute">
            Save
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MedicalCampApplicantOverlay;

