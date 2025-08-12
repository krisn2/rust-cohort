import React from "react";

const Input = ({ label, value, onChange, type = "text", required = false, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-purple-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      value={value || ""}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
    />
  </div>
);

export default Input;
