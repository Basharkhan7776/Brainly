import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-screen bg-gray-100 px-40 h-screen">
            <div className="bg-white flex justify-between p-4">
                <div className="flex justify-center items-center gap-2 ml-4 text-3xl font-semibold text-purple-600">
                    <Logo />
                    Brainly
                </div>
                <div className="flex mr-6 gap-3">
                    <Button varient="secondary" text="Sign In" onClick={() => { navigate("/signin") }} animate={true}></Button>
                    <Button varient="primary" text="Get Started" onClick={() => { navigate("/signup") }} animate={true}></Button>
                </div>
            </div>
            <div className="bg-red-200 h-96">
                Hero
            </div>
            <div className="bg-blue-200 h-96">
                Footer
            </div>
        </div>
    );
}