import React from "react";
import "./button.css";

const Button = ({ text, onClick }) => {
  return (
    <button className="my-button" onClick={onClick}>
      {text}
    </button>
  );
  s;
};

export default Button;
