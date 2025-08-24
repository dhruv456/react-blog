import React, { useState } from "react";

const Input = ({ lable, type = "text", value, setValue }) => {
  return (
    <div>
      <label>{lable}</label>
      <input
        className="border"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
