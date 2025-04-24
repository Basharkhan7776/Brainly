import { Crossicon } from "../icons/Crossicon";
import { Docicon } from "../icons/Docicon";
import { Linkicon } from "../icons/Linkicon";
import { SendIcon } from "../icons/SendIcon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { BackIcon } from "../icons/BackIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../envConfig";

export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${backendUrl}/api/v1/content`, {
        title,
        content,
        link,
        type,
        tags,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setTitle("");
      setContent("");
      setLink("");
      setTags([]);
      setUserId("");
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Content creation failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }


  console.log(error);
  console.log(type);


  return (
    <div className="">
      {open && (
        <>
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-80 flex justify-center items-center">
          </div>
          <form
            className="bg-white opacity-100 p-4 gap-4 px-6 flex flex-col justify-between rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl">Create Contant</div>
              <div onClick={onClose} className="cursor-pointer hover:text-purple-600 transition-colors duration-300">
                <Crossicon />
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center w-full">
                <Input
                  placeHolder="Title"
                  required="required"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={`${type == "" ? "flex" : "hidden"} flex-wrap gap-1 `}>
                <Button
                  varient="secondary"
                  startIcon={<Twittericon size={20} />}
                  onClick={() => setType("twitter")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Youtubeicon size={20} />}
                  onClick={() => setType("youtube")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Docicon size={5} />}
                  onClick={() => setType("document")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Linkicon size={5} />}
                  onClick={() => setType("link")}
                />
              </div>
              <div className="flex items-center gap-1">
                {(type == "twitter" || type == "youtube") && <>
                  <Input
                    placeHolder="Enter URL"
                    required="required"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </>}
                {(type == "document") && <>
                  <Input
                    placeHolder="Enter your Content"
                    required="required"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </>}
                {(type == "Link") &&
                  <div className="flex flex-col">
                    <Input 
                    placeHolder="Enter your URL" 
                    required="required"
                    onChange={(e) => setLink(e.target.value)}
                     />
                    <Input 
                    placeHolder="Enter your Content" 
                    required="required"
                    onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                }
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className={`${type == "" ? "hidden" : "flex"}`}>
                <Button
                  varient="secondary"
                  onClick={() => setType("")}
                  startIcon={<BackIcon size={20} />}
                ></Button>
              </div>
              <Button
                varient="primary"
                text="Submit"
                startIcon={<SendIcon size={20} />}
                type="submit"
                loading={loading}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}
