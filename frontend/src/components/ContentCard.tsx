
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  FileText, 
  Youtube, 
  Twitter, 
  Link as LinkIcon,
  Trash2,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContentPreview from './ContentPreview';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Content {
  id: number;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
}

interface ContentCardProps {
  content: Content;
  onDelete: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onDelete }) => {
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

  const getTypeColor = () => {
    switch (content.type) {
      case 'document':
        return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
      case 'youtube':
        return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
      case 'tweet':
        return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
      case 'link':
        return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
    }
  };

  const getGradient = () => {
    return 'from-gray-700 to-gray-900 dark:from-gray-500 dark:to-gray-600';
  };

  return (
    <Card className="group border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <ContentPreview content={content} />
              </DialogContent>
            </Dialog>
            
            {content.type !== 'document' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.open(content.link, '_blank')}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {content.title}
          </h3>
          
          {content.type === 'document' && content.content ? (
            <ScrollArea className="h-28 rounded-md border border-gray-200 dark:border-gray-700 p-2">
              <div className="text-sm text-gray-700 dark:text-gray-300 prose-sm prose-gray">
                {content.content.substring(0, 200)}
                {content.content.length > 200 && '...'}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {content.link}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {content.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
