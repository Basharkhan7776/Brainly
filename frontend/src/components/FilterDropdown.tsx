
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, X } from 'lucide-react';

interface FilterDropdownProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  allTags,
  selectedTags,
  onTagsChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter by Tags
          {selectedTags.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-purple-600 text-white px-2 py-0 text-xs"
            >
              {selectedTags.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 bg-white/95 backdrop-blur-sm border-purple-200" 
        align="end"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filter by Tags</span>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllTags}
              className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700"
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="p-2 max-h-60 overflow-y-auto">
          {allTags.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">
              No tags available
            </div>
          ) : (
            <div className="space-y-2">
              {allTags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-purple-50 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                    className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <label className="text-sm font-medium cursor-pointer flex-1">
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
