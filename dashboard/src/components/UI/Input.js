import React from "react";

const Input = ({ label, id, type, name, error, className, ...props }) => {
  // Function to allow only numeric input
  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (
      (charCode < 65 || charCode > 90) && // Uppercase letters
      (charCode < 97 || charCode > 122) && // Lowercase letters
      charCode !== 32 // Space character
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="input-container">
      <div className="grid text-left">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          {...props}
          onKeyPress={type === "text" ? handleKeyPress : null}
          placeholder={label}
          className={className}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: "5px",
            padding: "5px",
            
          }}
        />
      </div>
      {error && <p className="text-danger" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Input;
