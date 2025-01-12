import { Crossicon } from "./../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModel({ open, onClose }) {
  return (
    <div className="z-10">
      {open && (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-80 flex justify-center items-center">
          <div className="bg-white opacity-100 p-4 rounded-lg">
            <div className="flex justify-end">
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
        </div>
      )}
    </div>
  );
}


