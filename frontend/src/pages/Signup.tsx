import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import signupImg from "@/assets/signupImg.png";
import { Toaster, toast } from "sonner";
import axios from 'axios';
import { useState } from 'react';

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  repeatPassword: z.string().min(8, "Repeat Password must be at least 8 characters long"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try { 
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
        username: data.username,
        password: data.password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Account created successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Failed to sign up'
        : 'Failed to sign up. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster />
      <div className="w-full h-full grid lg:grid-cols-2">
        <motion.div
          className="max-h-screen bg-muted hidden lg:block"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img src={signupImg} alt="Signup Background" className="w-full h-full" />
        </motion.div>
        <motion.div
          className="max-w-xs m-auto w-full flex flex-col items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="mt-4 text-xl font-bold tracking-tight">
            Sign up for <a onClick={() => navigate("/")} className="cursor-pointer">Brainly</a>
          </p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form {...form}>
              <form
                className="w-full space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Choose a username"
                            className="w-full"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="w-full"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                >
                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            Already have an account?
            <a onClick={() => navigate("/signin")} className="ml-1 underline text-muted-foreground cursor-pointer">
              Log in
            </a>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;
