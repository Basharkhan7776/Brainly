
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, FileText, Youtube, Twitter, Link as LinkIcon, Bold, Italic, Underline } from 'lucide-react';
import { toast } from "sonner"
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Content {
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
  content?: string;
}

interface AddContentDialogProps {
  onAdd: (content: Content) => void;
  onClose: () => void;
}

const AddContentDialog: React.FC<AddContentDialogProps> = ({ onAdd, onClose }) => {
  const [type, setType] = useState<Content['type']>('document');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const contentTypes = [
    { value: 'document', label: 'Document', icon: FileText, color: 'text-gray-600' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-gray-600' },
    { value: 'tweet', label: 'Tweet', icon: Twitter, color: 'text-gray-600' },
    { value: 'link', label: 'Link', icon: LinkIcon, color: 'text-gray-600' }
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = '';
    let cursorPosition;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      default:
        return;
    }

    const newText = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    setContent(newText);

    // Set cursor position after formatting
    cursorPosition = start + formattedText.length;
    
    // Need to wait for React to update the DOM
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For document type, content is required; for others, link is required
    if ((type === 'document' && !content.trim()) || 
        (type !== 'document' && !link.trim()) || 
        !title.trim()) {
      toast.error('Validation Error',{
        description: 'Please fill in all required fields'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAdd({
        type,
        link: type === 'document' ? '' : link.trim(),
        title: title.trim(),
        tags,
        content: type === 'document' ? content.trim() : undefined
      });
      
      toast.success('Success',{
        description: 'Content added successfully'
      });
    } catch (error) {
      toast.error("Error",{
        description: 'Failed to add content',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (typeValue: string) => {
    const contentType = contentTypes.find(ct => ct.value === typeValue);
    if (!contentType) return null;
    const Icon = contentType.icon;
    return <Icon className={`w-4 h-4 ${contentType.color}`} />;
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Add New Content
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Content Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map((contentType) => {
              const Icon = contentType.icon;
              return (
                <Card
                  key={contentType.value}
                  className={`cursor-pointer transition-all duration-200 ${
                    type === contentType.value
                      ? 'ring-2 ring-gray-500 bg-gray-50 dark:bg-gray-800 dark:ring-gray-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setType(contentType.value as Content['type'])}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${contentType.color}`} />
                    <div className="font-medium">{contentType.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Link Input - Hidden for document type */}
        {type !== 'document' && (
          <div className="space-y-2">
            <Label htmlFor="link" className="text-base font-semibold">
              URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="link"
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-white dark:bg-gray-800"
              required
            />
          </div>
        )}

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white dark:bg-gray-800"
            required
          />
        </div>

        {/* Document Content Area - Only shown for document type */}
        {type === 'document' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content" className="text-base font-semibold">
                Content <span className="text-red-500">*</span>
              </Label>
              <ToggleGroup type="multiple" className="justify-start">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => applyFormatting('bold')}>
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => applyFormatting('italic')}>
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => applyFormatting('underline')}>
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Textarea
              id="content"
              placeholder="Write your content in Markdown format..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] bg-white dark:bg-gray-800 font-mono"
              required
            />
            <p className="text-xs text-gray-500">
              Supports Markdown formatting. Use **bold**, *italic*, or __underline__ for formatting.
            </p>
          </div>
        )}

        {/* Tags Input */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Tags</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="flex-1 bg-white dark:bg-gray-800"
            />
            <Button type="button" onClick={addTag} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Display Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="pr-1"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag)}
                    className="ml-1 h-4 w-4 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Content'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddContentDialog;
