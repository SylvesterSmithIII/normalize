'use client'

import React, { useState } from "react";

const initialFileTemplate = {
  fileNumber: "",
  address: "",
  closingDate: "",
  agents: {
    listingAgent: "",
    buyerAgent: "",
    lenderAgent: "",
  },
  buyer: {
    initialCallMade: { checked: false, note: "" },
    docsReceived: { checked: false, note: "" },
    appraisalOrdered: { checked: false, note: "" },
    inspectionScheduled: { checked: false, note: "" },
    mortgageApplicationCompleted: { checked: false, note: "" },
  },
  seller: {
    initialCallMade: { checked: false, note: "" },
    docsReceived: { checked: false, note: "" },
    propertyDisclosureCompleted: { checked: false, note: "" },
    repairsRequested: { checked: false, note: "" },
  },
  lender: {
    preApprovalReceived: { checked: false, note: "" },
    fundingConfirmed: { checked: false, note: "" },
    loanDocsSent: { checked: false, note: "" },
    loanApproved: { checked: false, note: "" },
  },
};

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const addNewFile = () => {
    setFiles((prev) => [...prev, { ...initialFileTemplate }]);
    setSelectedFileIndex(files.length);
  };

  const handleChange = (section, field, value, type = "checked") => {
    setFiles((prev) =>
      prev.map((file, idx) => {
        if (idx !== selectedFileIndex) return file;

        if (section === "fileInfo") {
          return { ...file, [field]: value };
        } else if (section === "agents") {
          return { ...file, agents: { ...file.agents, [field]: value } };
        } else {
          return {
            ...file,
            [section]: {
              ...file[section],
              [field]: {
                ...file[section][field],
                [type]: value,
              },
            },
          };
        }
      })
    );
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <button
          onClick={addNewFile}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          + Add File
        </button>
        <ul>
          {files.map((file, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedFileIndex(idx)}
              className={`cursor-pointer p-2 rounded mb-2 ${
                idx === selectedFileIndex ? "bg-blue-200" : "bg-gray-100"
              }`}
            >
              {file.fileNumber || "New File"} - {file.address || "No Address"}
            </li>
          ))}
        </ul>
      </div>

      {/* File Editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedFileIndex === null ? (
          <p>Select a file to edit</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">
              File {files[selectedFileIndex].fileNumber || "New"}
            </h1>

            {/* File Info */}
            <div className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-bold mb-2">File Info</h2>
              {["fileNumber", "address", "closingDate"].map((field) => (
                <div key={field} className="mb-2">
                  <label className="block font-medium">{field}</label>
                  <input
                    type={field === "closingDate" ? "date" : "text"}
                    value={files[selectedFileIndex][field]}
                    onChange={(e) =>
                      handleChange("fileInfo", field, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              ))}
            </div>

            {/* Agents */}
            <div className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Agents</h2>
              {Object.keys(files[selectedFileIndex].agents).map((agent) => (
                <div key={agent} className="mb-2">
                  <label className="block font-medium">{agent}</label>
                  <input
                    type="text"
                    value={files[selectedFileIndex].agents[agent]}
                    onChange={(e) =>
                      handleChange("agents", agent, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              ))}
            </div>

            {/* Sections with collapsible checklists */}
            {["buyer", "seller", "lender"].map((section) => (
              <div key={section} className="mb-6 border rounded">
                <div
                  className="bg-gray-200 p-3 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(section)}
                >
                  <h2 className="text-xl font-bold">{section.toUpperCase()}</h2>
                  <span>{openSections[section] ? "▲" : "▼"}</span>
                </div>
                {openSections[section] && (
                  <div className="p-4">
                    {Object.keys(files[selectedFileIndex][section]).map(
                      (field) => (
                        <div key={field} className="mb-3">
                          <label className="block font-medium mb-1">{field}</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={
                                files[selectedFileIndex][section][field].checked
                              }
                              onChange={(e) =>
                                handleChange(
                                  section,
                                  field,
                                  e.target.checked,
                                  "checked"
                                )
                              }
                            />
                            <input
                              type="text"
                              placeholder="Add note..."
                              value={files[selectedFileIndex][section][field].note}
                              onChange={(e) =>
                                handleChange(section, field, e.target.value, "note")
                              }
                              className="border rounded px-2 py-1 flex-1"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
