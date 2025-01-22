'use client';
import React, { useState } from "react";
import InputField from "./InputField";

const SearchBar = ({ onSearch, results, classifications }) => {
  const statesList = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
    "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
    "WI", "WY"
  ];

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    city: "",
    state: "",
    classification: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.lastName.trim()) {
      setError("Last Name is required");
      return;
    }

    setError("");
    onSearch(formData);
  };

  return (
    <div className="space-y-4 font-sans uppercase">
        <form
            onSubmit={handleSubmit}
            className="bg-cyan-700 px-10 py-5 shadow-2xl max-w-[100dvw] mx-auto space-y-4"
        >
            <h2 className="text-center text-3xl font-semibold text-white">Find your next provider</h2>

                <div className="grid grid-cols-2 gap-x-7 gap-y-2">
                <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="placeholder:text-slate-700"
                    placeholder="Required"
                    required
                />
                <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
                <div className="flex flex-col">
                    <label htmlFor="state" className="text-white font-medium mb-1 text-lg">
                        State
                    </label>
                    <select
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="p-3 mt-[-5px] rounded-md bg-white text-black uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    >
                    <option value="">No preference</option>
                        {statesList.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="classification" className="text-white font-medium mb-1 text-lg">
                    Classification
                    </label>
                    <select
                        name="classification"
                        id="classification"
                        value={formData.classification}
                        onChange={handleChange}
                        className="p-3 rounded-md bg-white text-black uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    >
                    <option value="">No preference</option>
                        {classifications
                            .slice() // Create a shallow copy of the array to avoid mutating the original
                            .sort((a, b) => a.localeCompare(b)) // Sort alphabetically (case-insensitive)
                            .map((classification, idx) => (
                            <option key={idx} value={classification}>
                                {classification}
                            </option>
                            ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full h-12 mt-8 py-2 bg-cyan-50 text-black font-bold uppercase tracking-widest rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#E6E6FA] transition-transform duration-300 hover:scale-105 mx-auto block text-xl"
                >
                    Search
                </button>
            </div>
            {error && <p className="text-red-500 font-semibold mt-2 text-center">{error}</p>}
        </form>
    </div>
  );
};

export default SearchBar;
