import React, { useState, useEffect } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Copy, Share2, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface ShareBrainDialogProps {
  onClose: () => void;
}

const ShareBrainDialog: React.FC<ShareBrainDialogProps> = ({ onClose }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if sharing is already enabled when component mounts
  useEffect(() => {
    const checkSharingStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.hash) {
          setShareLink(`${window.location.origin}/shared/${response.data.hash}`);
          setIsSharing(true);
        }
      } catch (error) {
        console.error('Error checking sharing status:', error);
      }
    };

    checkSharingStatus();
  }, []);

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const hash = response.data.hash;
      const fullShareLink = `${window.location.origin}/brain/${hash}`;
      setShareLink(fullShareLink);
      setIsSharing(true);
      toast.success('Share link generated successfully!');
    } catch (error) {
      console.error('Error generating share link:', error);
      toast.error('Failed to generate share link');
    } finally {
      setIsGenerating(false);
    }
  };

  const disableSharing = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
        { share: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setIsSharing(false);
      setShareLink('');
      toast.success('Sharing disabled successfully!');
    } catch (error) {
      console.error('Error disabling sharing:', error);
      toast.error('Failed to disable sharing');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Share link copied to clipboard');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center">
          <Share2 className="w-6 h-6 mr-2" />
          Share Your Brain
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Sharing Toggle */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Enable Public Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to view your notes collection through a public link
                </p>
              </div>
              <Switch
                checked={isSharing}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    generateShareLink();
                  } else {
                    disableSharing();
                  }
                }}
                disabled={isGenerating}
              />
            </div>
          </CardContent>
        </Card>

        {/* Share Link Section */}
        {(isSharing || shareLink) && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  Public Share Link
                </Label>
                <p className="text-sm text-muted-foreground">
                  Anyone with this link can view your shared notes
                </p>
              </div>

              <div className="flex space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => window.open(shareLink, '_blank')}
                  variant="outline"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-3 rounded border bg-muted/50">
                <h4 className="font-medium mb-2">What others will see:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Your username</li>
                  <li>• All your public notes and their titles</li>
                  <li>• Tags and content types</li>
                  <li>• Links to original content</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!isSharing && (
          <Card>
            <CardContent className="p-6">
              <h4 className="font-medium mb-3">How sharing works:</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary/50 mr-3 mt-2 flex-shrink-0"></div>
                  Enable sharing to generate a unique public link
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary/50 mr-3 mt-2 flex-shrink-0"></div>
                  Share the link with friends, colleagues, or on social media
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary/50 mr-3 mt-2 flex-shrink-0"></div>
                  Others can view your notes but cannot edit or delete them
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary/50 mr-3 mt-2 flex-shrink-0"></div>
                  You can disable sharing at any time
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!isSharing && (
            <Button 
              onClick={generateShareLink}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Share Link'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareBrainDialog;
