import React from "react";
import "./index.css";

const Input = (props) => {
  const { placeholder, label, name, onChange, value, type } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        className="input"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
