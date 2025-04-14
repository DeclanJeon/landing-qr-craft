
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { Badge } from '@/components/ui/badge';

interface LuxuryProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const LuxuryProductCard: React.FC<LuxuryProductCardProps> = ({ product, onAddToCart }) => {
  // Extract original price (if exists) using type assertion
  const originalPrice = (product as any).originalPrice;
  
  // Calculate discount percentage if originalPrice exists
  const discount = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };
  
  return (
    <div className="bg-bg-100 rounded-lg shadow-md overflow-hidden border border-bg-200 hover:border-primary-100 transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
      <div className="relative">
        <div className="overflow-hidden aspect-[4/3]">
          <img 
            src={product.imageUrl || 'https://placehold.co/400x300?text=No+Image'} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {originalPrice && discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-accent-100 hover:bg-accent-200 text-bg-100">
            {discount}% OFF
          </Badge>
        )}
        
        <div className="absolute top-2 left-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-bg-100/80 text-text-200 hover:bg-accent-100 hover:text-bg-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-medium mb-1 text-text-100 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`h-3 w-3 ${i <= (product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-bg-200'}`} />
              ))}
            </div>
            <span className="text-xs text-text-200 ml-1">({product.rating || 0})</span>
          </div>
          
          <p className="text-text-200 text-sm mb-3 line-clamp-2">
            {product.description || '제품 설명이 없습니다.'}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-text-100">₩{product.price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-text-200 line-through text-sm">₩{originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-primary-100 hover:bg-primary-200 text-bg-100 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" /> 장바구니에 담기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductCard;
