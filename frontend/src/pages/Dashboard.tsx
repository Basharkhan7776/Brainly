
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContentCard from '@/components/ContentCard';
import FilterDropdown from '@/components/FilterDropdown';
import AddContentDialog from '@/components/AddContentDialog';
import ShareBrainDialog from '@/components/ShareBrainDialog';
import { Toggle } from '@/components/ui/toggle';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Squares } from "@/components/ui/squares-background"


interface Content {
  id: number;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
}
const Dashboard = () => {
  const navigate = useNavigate();
  // State for content, search, and filtering
  const [content, setContent] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('brainly-theme');
    // Check user preference
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) ? 'dark' : 'light';
  });

  // Effect for theme toggling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('brainly-theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    window.location.reload()
  };

  // Fetch content on initial load
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Mock API call - replace with actual API call
        // const response = await fetch('/api/v1/content');
        // const data = await response.json();

        const mockData = {
          content: [
            {
              id: 1,
              type: 'document' as const,
              link: '',
              content: '# How to Take Smart Notes\n\nWhen taking notes, focus on **connecting ideas** rather than just collecting information. Here are some tips:\n\n1. Write in your own words\n2. Connect new notes to existing ones\n3. Keep your notes atomic\n4. Review regularly',
              title: 'How to Take Smart Notes',
              tags: ['productivity', 'learning']
            },
            {
              id: 2,
              type: 'youtube' as const,
              link: 'https://www.youtube.com/watch?v=l5bRPWxun4A',
              title: 'The Science of Learning',
              tags: ['education', 'science']
            },
            {
              id: 3,
              type: 'tweet' as const,
              link: 'https://x.com/_Bashar_khan_/status/1926883300410306980',
              title: 'Insights on Personal Knowledge Management',
              tags: ['productivity', 'PKM']
            },
            {
              id: 4,
              type: 'link' as const,
              link: 'https://medium.com/article-about-note-taking',
              title: 'Best Note-Taking Methods',
              tags: ['productivity', 'creativity']
            },
            {
              id: 5,
              type: 'document' as const,
              link: '',
              content: '# How to Take Smart Notes\n\nWhen taking notes, focus on **connecting ideas** rather than just collecting information. Here are some tips:\n\n1. Write in your own words\n2. Connect new notes to existing ones\n3. Keep your notes atomic\n4. Review regularly',
              title: 'How to Take Smart Notes',
              tags: ['productivity', 'learning']
            },
            {
              id: 6,
              type: 'youtube' as const,
              link: 'https://www.youtube.com/watch?v=l5bRPWxun4A',
              title: 'The Science of Learning',
              tags: ['education', 'science']
            },
            {
              id: 7,
              type: 'tweet' as const,
              link: 'https://x.com/_Bashar_khan_/status/1926883300410306980',
              title: 'Insights on Personal Knowledge Management',
              tags: ['productivity', 'PKM']
            },
            {
              id: 8,
              type: 'link' as const,
              link: 'https://medium.com/article-about-note-taking',
              title: 'Best Note-Taking Methods',
              tags: ['productivity', 'creativity']
            }
          ]
        };

        setContent(mockData.content as Content[]);

        // Extract all unique tags
        const tags = mockData.content.flatMap(item => item.tags);
        const uniqueTags = Array.from(new Set(tags));
        setAllTags(uniqueTags);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  // Filter content based on search term and selected tags
  const filteredContent = content.filter(item => {
    const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
    return matchesSearchTerm && matchesTags;
  });

  // Handle content deletion
  const handleDelete = async (id: number) => {
    try {
      // Mock API call - replace with actual API call
      // await fetch('/api/v1/content', {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ contentId: id.toString() }),
      // });

      // Update state to remove the deleted item
      setContent(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  // Add new content handler
  const handleContentAdded = (newContent: Omit<Content, 'id'>) => {
    const contentWithId: Content = {
      ...newContent,
      id: content.length + 1
    };
    setContent(prev => [...prev, contentWithId]);

    // Update tags
    const newTags = newContent.tags.filter(tag => !allTags.includes(tag));
    if (newTags.length > 0) {
      setAllTags(prev => [...prev, ...newTags]);
    }

    setIsAddDialogOpen(false);
  };

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

  return (
    <div className="min-h-screen ">
      <div className="fixed -z-10 h-full w-full rounded-lg overflow-hidden">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
        />
      </div>
      {/* Navigate to the dashboard page */}
      <header className=" border-b bg-primary-foreground fixed w-screen z-10  shadow">
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
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container pt-24 mx-auto px-4 py-6">
        {/* Second Nav */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full lg:w-1/2">
            <Input
              type="search"
              placeholder="Search notes, links, tweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <FilterDropdown
              allTags={allTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />

            <Button
              variant="outline"
              onClick={() => setIsShareDialogOpen(true)}
              className="flex-shrink-0"
            >
              Share Brain
            </Button>

            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className=" flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Content
            </Button>
          </div>
        </motion.div>

        {/* Content grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredContent.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <ContentCard content={item} onDelete={() => handleDelete(item.id)} />
            </motion.div>
          ))}

          {filteredContent.length === 0 && (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16  rounded mb-4 flex items-center justify-center">
                <Plus className="w-8 h-8 " />
              </div>
              <h3 className="text-lg font-semibold mb-2">No content found</h3>
              <p className="mb-4">
                {searchTerm || selectedTags.length > 0
                  ? "Try changing your search or filters"
                  : "Add your first note, link, or content"}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Dialogs */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <AddContentDialog
            onAdd={handleContentAdded}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <ShareBrainDialog onClose={() => setIsShareDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
