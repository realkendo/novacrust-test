import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({ children, isLoading, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full bg-[#013941] hover:bg-[#012a30] text-white font-semibold text-lg py-4 rounded-[20px] transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.99] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
