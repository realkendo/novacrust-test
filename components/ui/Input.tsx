import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[#003D2B] font-medium ml-1">{label}</label>}
      <input
        className={`w-full bg-white border rounded-[20px] px-5 py-4 text-[#013941] outline-none focus:ring-1 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error 
            ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
            : "border-gray-200 focus:border-[#013941] focus:ring-[#013941]"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
    </div>
  );
};
