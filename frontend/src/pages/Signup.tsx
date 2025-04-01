
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";


export function Signup() {
  const navigate = useNavigate();

  
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border h-96 px-12">
        <div className="flex text-2xl font-semibold items-center cursor-pointer" onClick={() => {navigate("/")}}>
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input placeHolder="Password"/>
        <Input placeHolder="Username"/>
        <Input placeHolder="Re-Password"/>
        <div className="flex justify-center w-full items-center">
          <Button
            varient="primary"
            text="Signup"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
