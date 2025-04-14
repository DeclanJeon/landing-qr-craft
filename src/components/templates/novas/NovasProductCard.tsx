
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types/shop';

interface NovasProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const NovasProductCard: React.FC<NovasProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-bg-100 rounded-lg overflow-hidden border border-bg-200 hover:border-primary-100 transition-all duration-300 hover:shadow-md group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl || 'https://placehold.co/300x200?text=No+Image'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-bg-100/70 text-text-100 hover:bg-primary-100 hover:text-bg-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-1 text-text-100 line-clamp-1">{product.name}</h3>
        <p className="text-text-200 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-text-100">₩{product.price.toLocaleString()}</span>
          <Button size="sm" onClick={handleAddToCart} className="bg-primary-100 hover:bg-primary-200 text-bg-100">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NovasProductCard;
