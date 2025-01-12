import { YouTubeEmbed } from "react-social-media-embed";
import { TwitterEmbed } from "react-social-media-embed";

interface cardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: cardProps) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md border-gray-200 max-w-96 border min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center text-lg">
          <div className="text-gray-500 pr-2">{/* icon */}</div>
          {title}
        </div>
        <div className="flex">
          <div className="pr-2 text-gray-500">{/* icon */}</div>
          <div className="text-gray-500">{/* icon */}</div>
        </div>
      </div>
      <div className="pt-4 flex">
        {type == "youtube" && <YouTubeEmbed url={link} height={170}/>}
        {type == "twitter" && <TwitterEmbed url={link} />}
      </div>
    </div>
  );
}
