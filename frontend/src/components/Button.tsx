import { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?:boolean;
}

const varientClasses = {
  primary: "bg-purple-600 text-purple-200",
  secondary: "bg-purple-200 text-purple-600",
};

export function Button({ varient, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${varientClasses[varient]} ${(fullWidth)?"w-full":""} px-4 py-2 rounded-lg m-1 font-light flex items-center justify-center ${(loading)?"opacity-45":""}`}
    >
      <div className={`${(startIcon)?"mr-2":""}`}>{startIcon}</div>
      {text}
    </button>
  );
}
