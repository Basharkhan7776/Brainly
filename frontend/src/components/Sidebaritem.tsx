import { ReactElement } from "react";

export function Sidebaritem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex items-center cursor-pointer rounded-lg m-3 text-gray-700 transition-all duration-200  hover:text-purple-600 hover:bg-gray-100">
      <div className="p-2 ml-4">{icon}</div>
      <div className="p-2 ml-4 text-lg">{text}</div>
    </div>
  );
}
