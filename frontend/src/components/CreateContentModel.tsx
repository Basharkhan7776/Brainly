import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <div className="">
      {open && (
        <>
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-80 flex justify-center items-center">
          </div>
          <div className="bg-white opacity-100 p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center">
              <div className="text-2xl">Create Contant</div>
              <div onClick={onClose} className="cursor-pointer">
                <Crossicon />
              </div>
            </div>
            <div>
              <Input placeHolder="Title" />
              <Input placeHolder="Links" />
            </div>
            <div className="flex justify-center">
              <Button varient="primary" text="Submit" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}


