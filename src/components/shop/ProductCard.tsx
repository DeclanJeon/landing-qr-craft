
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card key={product.id} className="overflow-hidden h-full hover:shadow-md transition-shadow group">
      <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="relative h-48 w-full">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-blue-600 font-bold">{product.price}</p>
        </CardContent>
      </a>
    </Card>
  );
};

export default ProductCard;
