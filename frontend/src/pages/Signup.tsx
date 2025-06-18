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
import { Eye, EyeOff } from "lucide-react";
import Footer from '@/components/Footer';


const formSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers, and underscores (no spaces or other special characters)"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  repeatPassword: z.string().min(8, "Repeat Password must be at least 8 characters long"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      if (response.data.userId) {
        toast.success('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to sign up'
        : 'Failed to sign up. Please try again.';
      toast.error(errorMessage, {
        description: 'Please check your credentials and try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              Sign up for <a onClick={() => navigate("/")} className="underline cursor-pointer">Brainly</a>
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
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="w-full pr-10"
                                disabled={isLoading}
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                tabIndex={-1}
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
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
                              type={showPassword ? "text" : "password"}
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
      <Footer/>
    </>
  );
};

export default Signup;
