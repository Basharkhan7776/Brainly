import { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?:boolean;
  animate?:boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({ varient, text, startIcon, onClick, fullWidth, loading, animate, type }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
        varient === "primary"
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
      } ${fullWidth ? "w-full" : ""} ${animate ? "hover:scale-105" : ""} ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {startIcon && <div className="flex items-center">{startIcon}</div>}
      {text && <div>{text}</div>}
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
    </button>
  );
}
