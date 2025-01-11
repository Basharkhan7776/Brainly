import { ReactElement } from "react";

interface ButtonProps{
    varient:"primary"|"secondary";
    text:string;
    startIcon:ReactElement;
}

const varientClasses={
    "primary":"bg-purple-600 text-purple-200",
    "secondary":"bg-purple-200 text-purple-600",
}

export function Button({varient, text, startIcon}:ButtonProps){
    return <button className={`${varientClasses[varient]} px-4 py-2 rounded-lg m-1 font-light flex items-center`}>
        <div className="mr-2">{startIcon}</div>
        {text}
    </button>
}