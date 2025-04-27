import { YouTubeEmbed } from "react-social-media-embed";
import { TwitterEmbed } from "react-social-media-embed";
import { Shareicon } from "../icons/Shareicon";
import { Deleteicon } from "../icons/Deleteicon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Linkicon } from "../icons/Linkicon";
import { Docicon } from "../icons/Docicon";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../envConfig";

interface cardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "link" | "document";
  content?: string;
  _id?: string;
  onDelete?: () => void;
}

const frontIcons = {
  "twitter": <Twittericon size={25} />,
  "youtube": <Youtubeicon size={30} />,
  "link": <Linkicon size={6} />,
  "document": <Docicon size={8}/>,
}

export function Card({ title, link, type, content, _id, onDelete }: cardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!_id) return;
    
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      await axios.delete(`${backendUrl}/api/v1/content`, {
        data: { contentId: _id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (onDelete) {
        onDelete();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md border-gray-200 border w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-lg md:text-xl">
          <div className="text-gray-500 pr-2">{frontIcons[type]}</div>
          <div className="truncate">{title}</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 md:mr-4 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md p-1 transition-all duration-200 cursor-pointer">{<Shareicon />}</div>
          <div 
            className="text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-md p-1 transition-all duration-200 cursor-pointer"
            onClick={handleDelete}
          >
            {<Deleteicon />}
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <div className="pt-4 flex cursor-pointer text-base md:text-lg justify-center">
        {type == "youtube" && <YouTubeEmbed url={link} width="100%" />}
        {type == "twitter" && <TwitterEmbed url={link} />}
        {type == "link" && <Link link={link} description={content}/>}
        {type == "document" && <p className="break-words">{content}</p>}
      </div>
    </div>
  );
}

function Link({link, description}: {link: string, description?: string}) {
  return (
    <div className="flex flex-col items-center w-full">
      <a className="text-purple-600 underline decoration-dotted underline-offset-8 hover:text-gray-500 transition-all duration-200 break-all text-center" href={link}>{link}</a>
      {description && <p className="text-sm mt-2 text-center">{description}</p>}
    </div>
  );
}