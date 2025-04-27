import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Shareicon } from "../icons/Shareicon";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../envConfig";

export function ShareBrainModel({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shareLink, setShareLink] = useState("");

    const handleShare = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated");
                return;
            }

            const response = await axios.post(`${backendUrl}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.hash) {
                setShareLink(`${window.location.origin}/brain/${response.data.hash}`);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to share brain");
        } finally {
            setLoading(false);
        }
    };

    const handleUnshare = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated");
                return;
            }

            await axios.post(`${backendUrl}/api/v1/brain/share`, {
                share: false
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShareLink("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to unshare brain");
        } finally {
            setLoading(false);
        }
    };

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
                            Share your entire collection of notes, docs, tweets and videos with others.
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            {shareLink ? (
                                <div className="w-full flex flex-col gap-2">
                                    <div className="text-sm text-gray-600">Your share link:</div>
                                    <div className="bg-gray-100 p-2 rounded break-all">{shareLink}</div>
                                    <Button
                                        varient="secondary"
                                        text="Stop Sharing"
                                        onClick={handleUnshare}
                                        loading={loading}
                                        fullWidth={true}
                                    />
                                </div>
                            ) : (
                                <Button
                                    varient="primary"
                                    text="Share"
                                    animate={true}
                                    startIcon={<Shareicon />}
                                    fullWidth={true}
                                    onClick={handleShare}
                                    loading={loading}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
