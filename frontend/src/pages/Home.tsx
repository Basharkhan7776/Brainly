import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import HeroImg from "../Assets/Hero.png";

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-purple-50 px-40 h-full">
            <div className="bg-white flex justify-between p-4 drop-shadow-md">
                <div className="flex justify-center items-center gap-2 ml-4 text-3xl font-semibold text-purple-600">
                    <Logo />
                    Brainly
                </div>
                <div className="flex mr-6 gap-3">
                    <Button varient="secondary" text="Sign In" onClick={() => { navigate("/signin") }} animate={true}></Button>
                    <Button varient="primary" text="Get Started" onClick={() => { navigate("/signup") }} animate={true}></Button>
                </div>
            </div>
            <div className="bg-white h-[90vh] bg-cover flex flex-row-reverse items-center justify-between ">
                <img src={HeroImg} alt="Hero" className="bg-cover h-[70vh] mr-48" />
                <div className="flex flex-col items-center justify-center gap-6 ml-48">
                    <h1 className="text-6xl font-bold text-purple-600 text-center mb-4">Unlock Your <br/> Potential</h1>
                    <p className="text-2xl text-gray-600 text-center mb-4">Discover a world of knowledge <br/> and learning with Brainly</p>
                    <Button varient="primary" text="---->  Get Started <----" onClick={() => { navigate("/signup") }} animate={true}></Button>
                </div>
            </div>
        </div>
    );
}