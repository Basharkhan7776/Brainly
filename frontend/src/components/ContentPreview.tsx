import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  FileText,
  Youtube,
  Twitter,
  Link as LinkIcon
} from 'lucide-react';
import { Tweet } from 'react-tweet'
import ReactMarkdown from 'react-markdown';


interface Content {
  _id: string;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
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


  const renderEmbeddedContent = () => {
    if (content.type === 'youtube') {
      // Extract YouTube video ID from URL (support v=, youtu.be/, and embed/)
      const videoId = content.link.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
      );
      if (videoId && videoId[1]) {
        return (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId[1]}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
              title="YouTube Preview"
            ></iframe>
          </div>
        );
      }
    }

    if (content.type === 'tweet') {
      // Support both twitter.com and x.com links for embedding
      let tweetUrl = content.link;
      // If the link is x.com, convert to twitter.com for twitframe compatibility
      if (tweetUrl.includes('x.com')) {
        tweetUrl = tweetUrl.replace('x.com', 'twitter.com');
      }
      return (
        <div className="justify-center">
          <Tweet
            id={tweetUrl.split('/').pop() || ''}
          />
        </div>
      );
    }

    if (content.type === 'document') {
      // For documents, show a markdown-like preview
      return (
        <Card className="">
          <CardContent className="overflow-y-auto">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">{content.title}</h2>
              <div className="p-4 rounded-lg border">
                <ReactMarkdown>
                  {content.content}
                </ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // For regular links, show a preview card
    return (
      <Card className="bg-gradient-to-br ">
        <CardContent >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10  rounded-full flex items-center justify-center">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Web Link</div>
              <div className="text-sm">{new URL(content.link).hostname}</div>
            </div>
          </div>
          <iframe
            src={content.link}
            className="w-full h-full rounded"
            frameBorder={0}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Embedded Link Preview"
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded `}>
            {getIcon()}
          </div>
          <div>
            <h1 className="text-xl font-bold">{content.title}</h1>
            <p className="text-sm mt-1 break-words whitespace-pre-line">
              {content.link.length > 40
                ? content.link.slice(0, 37) + '...'
                : content.link}
            </p>
          </div>
        </div>


      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {content.tags.map(tag => (
          <Badge
            key={tag}
            variant="secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Content Preview */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Preview</h2>
        {renderEmbeddedContent()}
      </div>
      {content.type != 'document' &&
        <Button
          onClick={() => window.open(content.link, '_blank')}
          variant={"outline"}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      }
    </div>
  );
};

export default ContentPreview;
