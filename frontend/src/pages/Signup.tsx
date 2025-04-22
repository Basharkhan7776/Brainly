
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../envConfig";
import { useState } from "react";
import axios from "axios";


export function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/v1/signup`, {
        username,
        password
      });
      console.log(response.data);
      if (response.data.message === "User signed up") {
        navigate("/signin");
      } else {
        setError("User already exists");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }


  console.log(error);

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form
        className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border p-12"
        onSubmit={handleSignup}
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
        <Input
          placeHolder="Re-Password"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required={true}
        />
        <div className="flex justify-center w-full items-center">
          <Button
            varient="primary"
            text="Signup"
            fullWidth={true}
            loading={loading}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
}
