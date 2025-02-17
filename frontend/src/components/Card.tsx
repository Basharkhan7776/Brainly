import { YouTubeEmbed } from "react-social-media-embed";
import { TwitterEmbed } from "react-social-media-embed";
import { Shareicon } from "../icons/Shareicon";
import { Deleteicon } from "../icons/Deleteicon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Linkicon } from "../icons/Linkicon";
import { Docicon } from "../icons/Docicon";

interface cardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "link" | "docs";
  description?: string;
}

const frontIcons = {
  "twitter": <Twittericon size={25} />,
  "youtube": <Youtubeicon size={30} />,
  "link": <Linkicon size={6} />,
  "docs": <Docicon size={8}/>,
}

export function Card({ title, link, type, description }: cardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border-gray-200 max-w-96 border min-w-72">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xl">
          <div className="text-gray-500 pr-2">{frontIcons[type]}</div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md p-1 transition-all duration-200 cursor-pointer">{<Shareicon />}</div>
          <div className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-md p-1 transition-all duration-200 cursor-pointer">{<Deleteicon />}</div>
        </div>
      </div>
      <div className="pt-4 flex cursor-pointer text-lg justify-center">
        {type == "youtube" && <YouTubeEmbed url={link} width={300} />}
        {type == "twitter" && <TwitterEmbed url={link} />}
        {type == "link" && <Link link={link} description={description}/>}
        {type == "docs" && <p>{description}</p>}
      </div>
    </div>
  );
}


function Link({link, description}: {link: string, description?: string}) {
  return (
    <div className="flex justify-center">
      <a className="text-purple-600 underline decoration-dotted underline-offset-8 hover:text-gray-500 transition-all duration-200" href={link}>{link}</a>
      <p className="text-sm">{description}</p>
    </div>
  );
}