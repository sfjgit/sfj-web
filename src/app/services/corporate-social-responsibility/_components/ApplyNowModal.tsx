"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

type ApplyNowModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const degreeOptions = [
  "Select Degree",
  "10th / SSLC",
  "12th / PUC",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const ApplyNowModal = ({ isOpen, onClose }: ApplyNowModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gradYear: "",
    degree: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [notRobot, setNotRobot] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notRobot) {
      alert("Please confirm you're not a robot.");
      return;
    }
    // TODO: wire up actual backend submission here later
    console.log("Apply Now form submitted:", formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-amber-500 mb-5">Enquiry Form</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter Date of Birth*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="gradYear"
            value={formData.gradYear}
            onChange={handleChange}
            placeholder="Enter Graduation Year*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {degreeOptions.map((opt) => (
              <option key={opt} value={opt === "Select Degree" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter City*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter Pincode*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter State*"
            required
            className="bg-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={notRobot}
              onChange={(e) => setNotRobot(e.target.checked)}
            />
            I&#39;m not a robot
          </label>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg mt-1 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyNowModal;
