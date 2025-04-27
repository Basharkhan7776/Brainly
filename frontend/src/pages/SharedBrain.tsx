import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { backendUrl } from "../envConfig";
import axios from "axios";

export function SharedBrain() {
    const { shareLink } = useParams();
    const [content, setContent] = useState<any[]>([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSharedBrain = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/brain/${shareLink}`);
                setContent(response.data.content);
                setUsername(response.data.username);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load shared brain");
            } finally {
                setLoading(false);
            }
        };

        if (shareLink) {
            fetchSharedBrain();
        }
    }, [shareLink]);

    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="text-2xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-4 px-10 min-h-screen bg-gray-100">
            <div className="text-4xl font-semibold mb-4">
                {username}'s Second Brain
            </div>
            <div className="flex gap-8 flex-wrap justify-start">
                {content.map((item) => (
                    <Card
                        key={item._id}
                        title={item.title}
                        type={item.type}
                        content={item.content}
                        link={item.link}
                    />
                ))}
            </div>
        </div>
    );
} 