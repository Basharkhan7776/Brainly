import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg border min-w-48 p-4">
        <div className="my-4 ml-12 flex text-2xl font-semibold items-center cursor-default">
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input placeHolder="Username" />
        <Input placeHolder="Password" />
        <div className="flex justify-center items-center">
          <Button varient="primary" text="Signin" fullWidth={true} loading={false}/>
        </div>
      </div>
    </div>
  );
}
