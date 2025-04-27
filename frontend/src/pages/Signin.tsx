import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../envConfig";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../hooks/useToast";

export function Signin() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/v1/signin`, {
        username,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        showSuccess("Successfully signed in!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form
        className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg border p-12"
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
