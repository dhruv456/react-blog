import React, { useId, useState } from "react";

const Input = React.forwardRef((_, ref) => {
  const { label, type = "text", className = "", ...props } = _;
  const id = useId;
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-l pl-l" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-500 w-full duration-200 ${className}`}
        type={type}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
