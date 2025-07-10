import React from "react";
import "./input.sass";

export const Input = ({ className = "", data, children }) => {
  const {
    label,
    type,
    placeholder,
    errors = {},
    settings,
    message,
    name,
    error = false,
  } = data;

  return (
    <div className={`bo-input ${className}`}>
      <div className="bo-input__wrap">
        <input
          type={type}
          placeholder={label}
          className={`${errors[name] || error ? "error" : ""} bo-input__input`}
          {...settings}
        />
        {children && React.Children.toArray(children)[0]}
      </div>
      {errors[name] && (
        <p className="bo-input__error">
          {errors[name].message ? errors[name].message : message}
        </p>
      )}
    </div>
  );
};

export default Input;
