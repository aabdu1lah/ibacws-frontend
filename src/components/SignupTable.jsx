import { useState } from "react";
import ApplicantOverlay from "./ui/ApplicantOverlay.jsx";
import Button from "./ui/Button.jsx";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

const SignupTable = ({ data, onUpdateApplicant }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [activeTab, setActiveTab] = useState("signups"); // "signups" | "interviewed"
  const [sortOrder, setSortOrder] = useState("desc"); // for rating sort
  const [selectedDepts, setSelectedDepts] = useState([]); // 🔹 multiple departments

  const departments = [
    "Marketing",
    "Media",
    "Operations",
    "Logistics",
    "Creatives",
    "Finance",
    "Guest Relations",
    "Security",
    "Corporate",
  ];

  // Default headers for signups tab
  const signupHeaders = [
    { key: "full_name", label: "Name" },
    { key: "erp", label: "ERP" },
    { key: "department_preference", label: "Department 1" },
    { key: "department_preference_2", label: "Department 2" },
    { key: "batch", label: "Batch" },
  ];

  // Headers for interviewed tab
  const interviewedHeaders = [
    { key: "full_name", label: "Name" },
    { key: "erp", label: "ERP" },
    { key: "department_preference", label: "Department 1" },
    { key: "department_preference_2", label: "Department 2" },
    { key: "ratings", label: "Rating" },
  ];

  // Toggle department selection
  const toggleDept = (dept) => {
    setSelectedDepts((prev) =>
      prev.includes(dept)
        ? prev.filter((d) => d !== dept)
        : [...prev, dept]
    );
  };

  // Filter + search
  let filteredData = data
    .filter((row) =>
      activeTab === "signups" ? true : row.interviewed === true
    )
    .filter(
      (row) =>
        row.erp?.toString().includes(searchTerm) ||
        row.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((row) => {
      if (selectedDepts.length === 0) return true; // no filter → show all
      return (
        selectedDepts.includes(row.department_preference) ||
        selectedDepts.includes(row.department_preference_2)
      );
    });

  // Sorting if on interviewed tab
  if (activeTab === "interviewed") {
    filteredData = [...filteredData].sort((a, b) => {
      const ra = a.ratings || 0;
      const rb = b.ratings || 0;
      return sortOrder === "asc" ? ra - rb : rb - ra;
    });
  }

  const visibleData = filteredData.slice(0, visibleCount);
  const headers = activeTab === "signups" ? signupHeaders : interviewedHeaders;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          onClick={() => {
            setActiveTab("signups");
            setVisibleCount(20);
          }}
          className={activeTab === "signups" ? "btn-selected" : "btn-cute"}
        >
          All Signups
        </Button>
        <Button
          onClick={() => {
            setActiveTab("interviewed");
            setVisibleCount(20);
          }}
          className={activeTab !== "signups" ? "btn-selected" : "btn-cute"}
        >
          Interviewed
        </Button>
      </div>

      {/* Search + Sort + Department Filter */}
      <div className="space-y-4 mb-4">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search by ERP or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-600 bg-252a42 text-e0e0e8 focus:ring-2 focus:ring-ff8dc7"
          />

          {activeTab === "interviewed" && (
            <Button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            >
              Rating: {sortOrder === "asc" ? "Low → High" : "High → Low"}
            </Button>
          )}
        </div>

        {/* Department Multi-Select */}
        <Listbox value={selectedDepts} onChange={setSelectedDepts} multiple>
          <div className="relative w-64">
            <ListboxButton className="w-full rounded-lg border border-gray-600 bg-252a42 text-e0e0e8 px-3 py-2 text-left">
              {selectedDepts.length > 0
                ? selectedDepts.join(", ")
                : "Filter by Department"}
            </ListboxButton>
            <ListboxOptions
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg 
                        bg-252a42/80 backdrop-blur-md border border-gray-600 shadow-lg z-10"
            >
              {departments.map((dept) => (
                <ListboxOption
                  key={dept}
                  value={dept}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-ff8dc7 text-252a42" : "text-e0e0e8"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className={`flex items-center ${selected ? "font-semibold" : ""}`}>
                      <input
                        type="checkbox"
                        checked={selected}
                        readOnly
                        className="mr-2 accent-ff8dc7"
                      />
                      {dept}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-252a42 text-e0e0e8">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="px-4 py-2 text-left font-semibold text-sm"
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-2a2b4b text-e0e0e8 divide-y divide-gray-700">
            {visibleData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-3c4056 cursor-pointer"
                onClick={() => setExpandedRow(row)}
              >
                {headers.map((h) => (
                  <td key={h.key} className="px-4 py-2">
                    {row[h.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
            {visibleData.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-4 text-center italic text-gray-400"
                >
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {visibleCount < filteredData.length && (
        <div className="flex justify-center">
          <Button onClick={() => setVisibleCount((prev) => prev + 20)}>
            Load More
          </Button>
        </div>
      )}

      {/* Applicant Drawer */}
      {expandedRow && (
        <ApplicantOverlay
          key={expandedRow.id}
          applicant={expandedRow}
          onClose={() => setExpandedRow(null)}
          onSave={(updated) => {
            onUpdateApplicant(updated.id, updated);
            setExpandedRow(null);
          }}
        />
      )}
    </div>
  );
};

export default SignupTable;
