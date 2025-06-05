
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
import { Filter} from 'lucide-react';

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
          className=" relative"
        >
          <Filter className="w-4 h-4" />
          Filter <p className='sm:block hidden'>by Tags</p>
          {selectedTags.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2  px-2 py-0 text-xs"
            >
              {selectedTags.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 " 
        align="end"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filter by Tags</span>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllTags}
              className="h-6 px-2 text-xs "
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="p-2 max-h-60 overflow-y-auto">
          {allTags.length === 0 ? (
            <div className="text-sm  text-center py-4">
              No tags available
            </div>
          ) : (
            <div className="space-y-2">
              {allTags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center space-x-3 p-2 rounded-md  cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
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
