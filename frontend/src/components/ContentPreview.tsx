
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  FileText, 
  Youtube, 
  Twitter, 
  Link as LinkIcon
} from 'lucide-react';

interface Content {
  id: number;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
}

interface ContentPreviewProps {
  content: Content;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ content }) => {
  const getIcon = () => {
    switch (content.type) {
      case 'document':
        return <FileText className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      case 'tweet':
        return <Twitter className="w-6 h-6" />;
      case 'link':
        return <LinkIcon className="w-6 h-6" />;
    }
  };

  const getTypeColor = () => {
    switch (content.type) {
      case 'document':
        return 'text-blue-600 bg-blue-50';
      case 'youtube':
        return 'text-red-600 bg-red-50';
      case 'tweet':
        return 'text-sky-600 bg-sky-50';
      case 'link':
        return 'text-green-600 bg-green-50';
    }
  };

  const renderEmbeddedContent = () => {
    if (content.type === 'youtube') {
      // Extract YouTube video ID from URL
      const videoId = content.link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      if (videoId && videoId[1]) {
        return (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId[1]}`}
              title={content.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        );
      }
    }

    if (content.type === 'tweet') {
      // For Twitter, we'll show a styled preview since direct embedding requires Twitter's widget
      return (
        <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Twitter Post</div>
                <div className="text-sm text-gray-600">@username</div>
              </div>
            </div>
            <p className="text-gray-800 mb-4">{content.title}</p>
            <div className="text-sm text-gray-500">Click to view on Twitter</div>
          </CardContent>
        </Card>
      );
    }

    if (content.type === 'document') {
      // For documents, show a markdown-like preview
      return (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">{content.title}</h2>
              <div className="bg-white/80 p-4 rounded-lg border">
                <p className="text-gray-700 leading-relaxed">
                  This is a preview of the document content. In a real implementation, 
                  this would render the actual markdown content or document preview.
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 italic">
                    "Document content would be rendered here with proper markdown formatting, 
                    code blocks, images, and other rich content elements."
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // For regular links, show a preview card
    return (
      <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">Web Link</div>
              <div className="text-sm text-gray-600">{new URL(content.link).hostname}</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
          <p className="text-gray-600 mb-4">
            This link contains valuable information related to your notes and research.
          </p>
          <div className="text-sm text-gray-500">Click to open in new tab</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{content.link}</p>
          </div>
        </div>
        
        <Button 
          onClick={() => window.open(content.link, '_blank')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Original
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {content.tags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-purple-100 text-purple-700"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Content Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
        {renderEmbeddedContent()}
      </div>
    </div>
  );
};

export default ContentPreview;
