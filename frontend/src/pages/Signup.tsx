import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import axios from "axios";
const backendUrl = import.meta.env.BACKEND_URL;


export function Signup() {
  const usernameRef=useRef<HTMLInputElement>();
  const passwordRef=useRef<HTMLInputElement>();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`http://localhost:3000/api/v1/signup`,{
        username,
        password
    })
    alert("You have signed up");
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg border min-w-48 p-4">
        <div className="my-4 ml-12 flex text-2xl font-semibold items-center cursor-default">
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input placeHolder="Username" ref={usernameRef}/>
        <Input placeHolder="Password" ref={passwordRef}/>
        <div className="flex justify-center items-center">
          <Button
            onClick={signup}
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
