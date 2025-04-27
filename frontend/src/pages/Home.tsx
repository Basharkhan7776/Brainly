import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import HeroImg from "../Assets/Hero.png";

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-purple-50 min-h-screen">
            <div className="bg-white flex justify-between p-4 drop-shadow-md">
                <div className="flex justify-center items-center gap-2 ml-2 md:ml-4 text-xl md:text-3xl font-semibold text-purple-600">
                    <Logo />
                    Brainly
                </div>
                <div className="flex mr-2 md:mr-6 gap-2 md:gap-3">
                    <Button 
                        varient="secondary" 
                        text="Sign In" 
                        onClick={() => { navigate("/signin") }} 
                        animate={true}
                    />
                    <Button 
                        varient="primary" 
                        text="Get Started" 
                        onClick={() => { navigate("/signup") }} 
                        animate={true}
                    />
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-40 py-8 md:py-0">
                <div className="flex flex-col items-center md:items-start justify-center gap-4 md:gap-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-2 md:mb-4">
                        Unlock Your <br/> Potential
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 mb-4">
                        Discover a world of knowledge <br/> and learning with Brainly
                    </p>
                    <Button 
                        varient="primary" 
                        text="Get Started" 
                        onClick={() => { navigate("/signup") }} 
                        animate={true}
                    />
                </div>
                <div className="w-full md:w-auto mb-8 md:mb-0">
                    <img 
                        src={HeroImg} 
                        alt="Hero" 
                        className="w-full max-w-md mx-auto md:max-w-none md:w-auto h-auto md:h-[70vh] object-contain"
                    />
                </div>
            </div>
        </div>
    );
}