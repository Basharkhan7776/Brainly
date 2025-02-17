import { Crossicon } from "../icons/Crossicon";
import { Docicon } from "../icons/Docicon";
import { Linkicon } from "../icons/Linkicon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";

export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [twitter, setTwitter] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const [docs, setDocs] = useState(false);
  const [link, setLink] = useState(false);


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
            <div className="flex flex-col justify-center items-center w-full">
              <Input
                placeHolder="Title"
                required="required"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              <Button
                varient="secondary"
                startIcon={<Twittericon size={20} />}
              />
              <Button
                varient="secondary"
                startIcon={<Youtubeicon size={20} />}
              />
              <Button
                varient="secondary"
                startIcon={<Docicon size={5} />}
              />
              <Button
                varient="secondary"
                startIcon={<Linkicon size={5}/>}
              />
            </div>
            <div className="flex justify-center w-full">
              <Button
                varient="primary"
                text="Submit"
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}


