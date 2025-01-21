'use client';
import React from "react";

const InputField = ({ label, name, value, onChange, required }) => {
  return (
    <div className="flex flex-col font-sans">
      <label htmlFor={name} className="text-white font-medium text-lg">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="text-lg uppercase p-3 rounded-md border border-gray-700 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
      />
    </div>
  );
};

export default InputField;
