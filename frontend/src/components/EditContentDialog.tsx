import { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Bold, Italic, Underline } from 'lucide-react';
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import axios from 'axios';

interface Content {
    _id: string;
    type: 'document' | 'tweet' | 'youtube' | 'link';
    link: string;
    title: string;
    tags: string[];
    content?: string;
}

interface EditContentDialogProps {
    content: Content;
    onClose: () => void;
    onContentUpdated: () => void;
}

export default function EditContentDialog({ content, onClose, onContentUpdated }: EditContentDialogProps) {
    const [link, setLink] = useState(content.link);
    const [title, setTitle] = useState(content.title);
    const [editContent, setEditContent] = useState(content.content || '');
    const [tags, setTags] = useState<string[]>(content.tags);
    const [newTag, setNewTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setEditContent(newText);

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
        if ((content.type === 'document' && !editContent.trim()) ||
            (content.type !== 'document' && !link.trim()) ||
            !title.trim()) {
            toast.error('Validation Error', {
                description: 'Please fill in all required fields'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
                {
                    contentId: content._id,
                    type: content.type,
                    link: content.type === 'document' ? '' : link.trim(),
                    title: title.trim(),
                    tags: tags,
                    content: content.type === 'document' ? editContent.trim() : undefined
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data) {
                toast.success('Content updated successfully');
                onContentUpdated();
                onClose();
            }
        } catch (error) {
            console.error('Error updating content:', error);
            toast.error('Failed to update content', {
                description: 'Please try again later'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" space-y-6 max-h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                    Edit Content
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Link Input - Hidden for document type */}
                {content.type !== 'document' && (
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
                        required
                    />
                </div>

                {/* Document Content Area - Only shown for document type */}
                {content.type === 'document' && (
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
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            required
                        />
                        <p className="text-xs">
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
                            className="flex-1"
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
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
