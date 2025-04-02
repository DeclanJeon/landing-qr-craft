
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SideAdvertisementProps {
  position: 'left' | 'right';
  imageUrl?: string;
  link?: string;
  altText?: string;
}

const SideAdvertisement: React.FC<SideAdvertisementProps> = ({
  position,
  imageUrl = 'https://placehold.co/120x400/FFB6C1/000?text=AD',
  link = '#',
  altText = '광고'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasSpace, setHasSpace] = useState(true);

  useEffect(() => {
    const checkSpace = () => {
      // 1200px (container width) + 2 * (20px + 120px) (left and right margin + ad width)
      const minWidth = 1460; 
      setHasSpace(window.innerWidth >= minWidth);
    };
    
    checkSpace();
    window.addEventListener('resize', checkSpace);
    
    return () => window.removeEventListener('resize', checkSpace);
  }, []);

  if (!isVisible || !hasSpace) {
    return null;
  }

  return (
    <div 
      className={`fixed top-1/2 transform -translate-y-1/2 z-10 ${
        position === 'left' ? 'left-5' : 'right-5'
      } transition-all duration-300`}
    >
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -top-2 -right-2 h-6 w-6 bg-white rounded-full border shadow-sm"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="rounded-md shadow-md"
            style={{ width: '120px', height: '400px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default SideAdvertisement;
