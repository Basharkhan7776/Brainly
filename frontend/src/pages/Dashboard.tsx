import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContentCard from '@/components/ContentCard';
import FilterDropdown from '@/components/FilterDropdown';
import AddContentDialog from '@/components/AddContentDialog';
import ShareBrainDialog from '@/components/ShareBrainDialog';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useTheme } from '@/context/themeContext';
import { Toggle } from '@/components/ui/toggle';
import Footer from '@/components/Footer';


interface Content {
  _id: string;
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
  const { theme, toggleTheme } = useTheme();

  // Fetch content on initial load
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setContent(response.data.content as Content[]);

        // Extract all unique tags
        const tags = (response.data.content as Content[]).flatMap((item: Content) => item.tags);
        const uniqueTags = Array.from(new Set(tags)) as string[];
        setAllTags(uniqueTags);

        toast.success('Content loaded successfully');
      } catch (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to load content. Please try again later.');
        // Fallback to mock data in case of error
        const mockData = {
          content: [
            {
              _id: "1",
              type: 'document' as const,
              link: '',
              content: '# How to Take Smart Notes\n\nWhen taking notes, focus on **connecting ideas** rather than just collecting information. Here are some tips:\n\n1. Write in your own words\n2. Connect new notes to existing ones\n3. Keep your notes atomic\n4. Review regularly',
              title: 'How to Take Smart Notes',
              tags: ['productivity', 'learning']
            },
            {
              _id: "2",
              type: 'youtube' as const,
              link: 'https://www.youtube.com/watch?v=l5bRPWxun4A',
              title: 'The Science of Learning',
              tags: ['education', 'science']
            },
            {
              _id: "3",
              type: 'tweet' as const,
              link: 'https://x.com/_Bashar_khan_/status/1926883300410306980',
              title: 'Insights on Personal Knowledge Management',
              tags: ['productivity', 'PKM']
            },
            {
              _id: "4",
              type: 'link' as const,
              link: 'https://medium.com/article-about-note-taking',
              title: 'Best Note-Taking Methods',
              tags: ['productivity', 'creativity']
            },
            {
              _id: "5",
              type: 'document' as const,
              link: '',
              content: '# How to Take Smart Notes\n\nWhen taking notes, focus on **connecting ideas** rather than just collecting information. Here are some tips:\n\n1. Write in your own words\n2. Connect new notes to existing ones\n3. Keep your notes atomic\n4. Review regularly',
              title: 'How to Take Smart Notes',
              tags: ['productivity', 'learning']
            },
            {
              _id: "6",
              type: 'youtube' as const,
              link: 'https://www.youtube.com/watch?v=l5bRPWxun4A',
              title: 'The Science of Learning',
              tags: ['education', 'science']
            },
            {
              _id: "7",
              type: 'tweet' as const,
              link: 'https://x.com/_Bashar_khan_/status/1926883300410306980',
              title: 'Insights on Personal Knowledge Management',
              tags: ['productivity', 'PKM']
            }
          ]
        };
        setContent(mockData.content as Content[]);
        const tags = mockData.content.flatMap(item => item.tags);
        const uniqueTags = Array.from(new Set(tags)) as string[];
        setAllTags(uniqueTags);
      }
    };

    fetchContent();
  }, []);

  // Filter content based on search term and selected tags
  const filteredContent = content.filter(item => {
    const matchesSearchTerm = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags?.includes(tag) ?? false);
    return matchesSearchTerm && matchesTags;
  });

  // Handle content deletion
  const handleDelete = async (_id: string) => {
    if (_id === undefined || _id === null) {
      toast.error('Invalid content ID');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: { contentId: _id.toString() }
      });

      // Update state to remove the deleted item
      setContent(prev => prev.filter(item => item._id !== _id));
      toast.success('Content deleted successfully');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content. Please try again later.');
    }
  };

  // Add new content handler
  const handleContentAdded = async (newContent: Omit<Content, "_id">) => {
    try {
      console.log('Adding new content:', newContent);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, newContent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const addedContent = response.data;

      setContent(prev => [...prev, addedContent]);

      // Update tags
      const newTags = newContent.tags.filter(tag => !allTags.includes(tag));
      if (newTags.length > 0) {
        setAllTags(prev => [...prev, ...newTags]);
      }

      setIsAddDialogOpen(false);
      toast.success('Content added successfully');
    } catch (error) {
      console.error('Error adding content:', error);
      toast.error('Failed to add content. Please try again later.');
    }
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

  return (<>
    <div className="min-h-screen ">
      <Toaster />
      <div className="fixed -z-10 h-full w-full rounded-lg overflow-hidden">
        {/* Add background  */}
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

          <div className="flex gap-2 w-full lg:w-auto justify-end">
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
            <motion.div
              key={`content-${item._id}`}
              variants={itemVariants}
            >
              <ContentCard content={item} onDelete={() => handleDelete(item._id)} />
            </motion.div>
          ))}

          {filteredContent.length === 0 && (
            <motion.div
              key="empty-state"
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
          <DialogTitle>Add New Content</DialogTitle>
          <DialogDescription>
            Add a new note, link, tweet, or YouTube video to your collection
          </DialogDescription>
          <AddContentDialog
            onAdd={handleContentAdded}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle>Share Your Brain</DialogTitle>
          <DialogDescription>
            Share your collection with others by generating a shareable link
          </DialogDescription>
          <ShareBrainDialog onClose={() => setIsShareDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
    <Footer/>
  </>
  );
};

export default Dashboard;
