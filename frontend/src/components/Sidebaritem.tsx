import { ReactElement } from "react";

interface SidebaritemProps {
  text: string;
  icon: ReactElement;
  selected?: boolean;
  onClick?: () => void;
}

export function Sidebaritem({ text, icon, selected, onClick }: SidebaritemProps) {
  return (
    <div 
      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200 ${selected ? 'bg-gray-100 text-purple-600' : ''}`}
      onClick={onClick}
    >
      <div className="text-gray-500">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
