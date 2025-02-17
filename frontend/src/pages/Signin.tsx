import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg h-96 border min-w-48 px-12 ">
        <div className="flex text-2xl font-semibold items-center cursor-default">
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
