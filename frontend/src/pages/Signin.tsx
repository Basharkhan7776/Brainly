import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../envConfig";
import axios from "axios";
import { useState } from "react";



export function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/v1/signin`, {
        username,
        password
      })
      console.log(response.data);
      if (response.data.token){
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }else{
        setError("Invalid credentials");
      }
    } catch (err:any) {
      setError(err.response?.data?.message || "Signin failed");
    }finally{
      setLoading(false);
    }
  }


  console.log(error);


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form
        className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg border p-12 "
        onSubmit={handleSubmit}
      >
        <div className="flex text-2xl font-semibold items-center cursor-pointer" onClick={() => { navigate("/") }}>
          <div className="mr-4 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <Input
          placeHolder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <Input
          placeHolder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <div className="flex justify-center items-center w-full">
          <Button
            varient="primary"
            text="Signin"
            fullWidth={true}
            loading={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
