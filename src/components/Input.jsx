import { useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }) => {
  const id = useId();
  console.log("Input rendered - ", label, props.value);
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-l pl-l" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg bg-white text-black focus:outline-blue-800 w-full duration-200 ${className}`}
        type={type}
        {...props}
        id={id}
      />
    </div>
  );
};

export default Input;
