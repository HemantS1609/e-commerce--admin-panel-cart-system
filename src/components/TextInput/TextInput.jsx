import React from "react";
import "./TextINput.css";

const TextInput = ({ label, placeholder, onChange, type, id, value }) => {
  return (
    <div className="text-input-container">
      <label>{label}</label>
      <input
        id={id}
        className="text-input"
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
