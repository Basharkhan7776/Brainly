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

export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [tags, setTags] = useState<string>("");


  return (
    <div className="">
      {open && (
        <>
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-80 flex justify-center items-center">
          </div>
          <form className="bg-white opacity-100 p-4 gap-4 px-6 flex flex-col justify-between rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                />
              </div>
              <div className={`${tags == "" ? "flex" : "hidden"} flex-wrap gap-1 `}>
                <Button
                  varient="secondary"
                  startIcon={<Twittericon size={20} />}
                  onClick={() => setTags("Twitter")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Youtubeicon size={20} />}
                  onClick={() => setTags("Youtube")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Docicon size={5} />}
                  onClick={() => setTags("Document")}
                />
                <Button
                  varient="secondary"
                  startIcon={<Linkicon size={5} />}
                  onClick={() => setTags("Link")}
                />
              </div>
              <div className="flex items-center gap-1">
                {(tags == "Twitter" || tags == "Youtube") && <><Input placeHolder="Enter URL" required="required" /></>}
                {(tags == "Document") && <><Input placeHolder="Enter your Content" required="required" /></>}
                {(tags == "Link") &&
                  <div className="flex flex-col">
                    <Input placeHolder="Enter your URL" required="required" />
                    <Input placeHolder="Enter your Content" required="required" />
                  </div>
                }
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className={`${tags == "" ? "hidden" : "flex"}`}>
                <Button
                  varient="secondary"
                  onClick={() => setTags("")}
                  startIcon={<BackIcon size={20} />}
                ></Button>
              </div>
              <Button
                varient="primary"
                text="Submit"
                startIcon={<SendIcon size={20} />}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}


