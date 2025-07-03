import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  FileText,
  Youtube,
  Twitter,
  Link as LinkIcon,
  Trash2,
  Eye,
  Pencil
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ContentPreview from './ContentPreview';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import EditContentDialog from './EditContentDialog';

interface Content {
  _id: string;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
}

interface ContentCardProps {
  content: Content;
  onDelete?: () => void;
  shared?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onDelete, shared = false }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleContentUpdated = () => {
    // Trigger a refresh of the content list
    window.location.reload();
  };

  const getIcon = () => {
    switch (content.type) {
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'tweet':
        return <Twitter className="w-5 h-5" />;
      case 'link':
        return <LinkIcon className="w-5 h-5" />;
    }
  };


  const getGradient = () => {
    return 'from-neutral-700 to-neutral-900 dark:from-neutral-500 dark:to-neutral-600';
  };

  return (
    <Card className="group duration-300 hover:shadow-lg dark:hover:shadow-secondary h-full flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className='flex items-center gap-4 '>
            {getIcon()}
            <h3 className="font-semibold text-wrap">
              {content.title}
            </h3>
          </div>
          <div className="flex space-x-1 ">
            {onDelete && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={onDelete}
                    className="h-8 w-8 p-0 text-red-600 dark:text-red-300 dark:hover:bg-red-900 hover:bg-red-100 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete Content</DialogTitle>
                  <div className='flex flex-wrap justify-between items-center gap-2'>
                    <p>Confirm to delete this content?</p>
                    <Button variant={"destructive"} onClick={onDelete}><Trash2 /> Delete</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          {content.type === 'document' && content.content ? (
            <ScrollArea className="h-16 rounded border p-2">
              <div className="text-sm prose-sm prose-gray">
                <ReactMarkdown>
                  {content.content.substring(0, 100) + (content.content.length > 200 ? '...' : '')}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm truncate">
              {content.link}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {content.tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>


      </CardContent>
      <CardFooter className='w-full'>
        <div className="flex w-full space-x-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 "
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-primary-foreground
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-primary/40">
              <DialogTitle>Content Preview</DialogTitle>
              <DialogDescription>
                View the full content of this item
              </DialogDescription>
              <ContentPreview content={content} />
            </DialogContent>
          </Dialog>

          {content.type !== 'document' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(content.link, '_blank')}
              className={`bg-gradient-to-r ${getGradient()} text-white border-0 hover:opacity-90`}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          {!shared && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`bg-gradient-to-r ${getGradient()} text-white border-0 hover:opacity-90`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-primary-foreground
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-primary/40">
                <EditContentDialog
                  content={content}
                  onClose={() => setIsEditDialogOpen(false)}
                  onContentUpdated={handleContentUpdated}
                />
              </DialogContent>
            </Dialog>)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
