import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Shareicon } from "../icons/Shareicon";

export function ShareBrainModel({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <div className="">
            {open && (
                <>
                    <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-80 flex justify-center items-center">
                    </div>
                    <div className="max-w-96 bg-white opacity-100 p-4 gap-4 px-6 flex flex-col justify-between items-center rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-full flex justify-between items-center">
                            <div className="text-2xl">Share your Second Brain</div>
                            <div onClick={onClose} className="cursor-pointer hover:text-purple-600 transition-colors duration-300">
                                <Crossicon />
                            </div>
                        </div>
                        <div className="w-full flex flex-col flex-wrap justify-center items-center gap-2 text-wrap">
                            Share your entire collecton of notes, docs, tweets and video with others.
                            <Button
                                varient="primary"
                                text="Share"
                                animate={true}
                                startIcon={<Shareicon />}
                                fullWidth={true}
                            ></Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
