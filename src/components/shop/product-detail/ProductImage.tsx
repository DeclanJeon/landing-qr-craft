
import React from 'react';
import { Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt }) => {
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full rounded-md object-contain"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-white">
          <Heart className="h-4 w-4 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-white">
          <Share className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default ProductImage;
