import AnimatedGridPattern from "@/components/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CirclePlay, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { useTheme } from "@/context/themeContext";
import Footer from "@/components/Footer";

const Hero = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (<>
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 w-full h-full"
      >
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={(theme === 'dark') ? 0.2 : 0.3}
          duration={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 h-full skew-y-12"
          )}
        />
      </motion.div>
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Your Second Brain for the Web
        </motion.h1>
        <motion.p
          className="mt-6 text-[17px] md:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          Capture, organize, and share notes, videos, tweets, and links in one beautiful place.
        </motion.p>
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Button size="lg" className=" text-base" onClick={() => navigate('/signup')}>
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base shadow-none"
            onClick={() => navigate('/signin')}
          >
            <CirclePlay className="!h-5 !w-5" /> Login
          </Button>
          <Button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="aspect-square"
            size="lg"
            variant={"outline"}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
    <Footer />
  </>
  );
};

export default Hero;