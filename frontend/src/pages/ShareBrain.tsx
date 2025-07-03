import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";
import ContentCard from "@/components/ContentCard";
import { useTheme } from "@/context/themeContext";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";

interface Content {
  _id: string;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
}

interface SharedBrain {
  username: string;
  content: Content[];
}

export default function ShareBrain() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sharedBrain, setSharedBrain] = useState<SharedBrain | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      if (!shareLink) {
        toast.error("Invalid share link");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/${shareLink}`);
        console.log('Fetched shared brain:', response.data);
        setSharedBrain(response.data);
        toast.success("Shared brain loaded successfully");
      } catch (error) {
        console.error('Error fetching shared brain:', error);
        toast.error("Failed to load shared brain. The link may be invalid or expired.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [shareLink, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster />
      <header className="border-b bg-primary-foreground fixed w-screen z-10 shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            Brainly
          </motion.h1>

          <div className="flex items-center space-x-3">
            <Toggle
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Toggle>
          </div>
        </div>
      </header>

      <main className="container pt-24 mx-auto px-4 py-6">
        {sharedBrain ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-2">
                {sharedBrain.username}'s Brain
              </h2>
              <p className="text-muted-foreground">
                A collection of {sharedBrain.content.length} items
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sharedBrain.content.map((item) => (
                <motion.div
                  key={`content-${item._id}`}
                  variants={itemVariants}
                >
                  <ContentCard content={item} shared/>
                </motion.div>
              ))}

              {sharedBrain.content.length === 0 && (
                <motion.div
                  key="empty-state"
                  className="col-span-full flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-2">No content found</h3>
                  <p className="text-muted-foreground">
                    This brain is empty
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Brain Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The shared brain you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Return to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
