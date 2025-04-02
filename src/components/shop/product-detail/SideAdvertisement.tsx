
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SideAdvertisementProps {
  position: 'left' | 'right' | 'hero' | 'products' | 'footer';
  imageUrl?: string;
  link?: string;
  altText?: string;
  id?: number;
}

const SideAdvertisement: React.FC<SideAdvertisementProps> = ({
  position,
  imageUrl = 'https://placehold.co/120x400/FFB6C1/000?text=AD',
  link = '#',
  altText = '광고',
  id
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasSpace, setHasSpace] = useState(true);

  useEffect(() => {
    // Only check space for sidebar ads
    if (position === 'left' || position === 'right') {
      const checkSpace = () => {
        // 1200px (container width) + 2 * (20px + 120px) (left and right margin + ad width)
        const minWidth = 1460;
        setHasSpace(window.innerWidth >= minWidth);
      };
      
      checkSpace();
      window.addEventListener('resize', checkSpace);
      
      return () => window.removeEventListener('resize', checkSpace);
    }
    
    return undefined;
  }, [position]);

  if (!isVisible || ((['left', 'right'].includes(position)) && !hasSpace)) {
    return null;
  }

  // For sidebar ads
  if (position === 'left' || position === 'right') {
    return (
      <div 
        className={`fixed top-1/2 transform -translate-y-1/2 z-10 ${
          position === 'left' ? 'left-5' : 'right-5'
        } transition-all duration-300 hover:opacity-95`}
        data-ad-id={id}
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
              className="rounded-md shadow-md hover:shadow-lg transition-shadow"
              style={{ width: '120px', height: '400px' }}
            />
          </a>
        </div>
      </div>
    );
  }

  // For in-content ads (hero, products, footer)
  return (
    <div 
      className={`relative w-full my-4 ${
        position === 'hero' ? 'max-h-80' : 
        position === 'footer' ? 'max-h-60' : 'max-h-64'
      }`}
      data-ad-id={id}
    >
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded-full border shadow-sm z-10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
            style={{ 
              maxHeight: position === 'hero' ? '320px' : 
                        position === 'footer' ? '200px' : '240px' 
            }}
          />
        </a>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          광고
        </div>
      </div>
    </div>
  );
};

export default SideAdvertisement;
