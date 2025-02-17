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
      <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border h-96 px-12">
        <div className="flex text-2xl font-semibold items-center cursor-default">
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input placeHolder="Username" ref={usernameRef}/>
        <Input placeHolder="Password" ref={passwordRef}/>
        <Input placeHolder="Re-Password" ref={passwordRef}/>
        <div className="flex justify-center w-full items-center">
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
