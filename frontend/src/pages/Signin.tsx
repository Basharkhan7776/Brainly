import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate=useNavigate();


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg border p-12 ">
        <div className="flex text-2xl font-semibold items-center cursor-pointer" onClick={() => {navigate("/")}}>
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input 
        placeHolder="Username"
        required="required"
        />
        <Input 
        placeHolder="Password" 
        required="required"
        />
        <div className="flex justify-center items-center w-full">
          <Button varient="primary" text="Signin" fullWidth={true} loading={false}/>
        </div>
      </form>
    </div>
  );
}
