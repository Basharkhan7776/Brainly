import { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?:boolean;
  animate?:boolean;
}

const varientClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-400 hover:text-white",
};

export function Button({ varient, text, startIcon, onClick, fullWidth, loading, animate }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${varientClasses[varient]} ${(fullWidth)?"w-full":""} px-4 py-2 rounded-lg m-1 font-light flex items-center justify-center transition-all duration-200 ${(animate)?"hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-sm shadow-gray-700":""} ${(loading)?"opacity-45":""}`}
    >
      <div className={`${(startIcon)?"mr-2":""}`}>{startIcon}</div>
      {text}
    </button>
  );
}
