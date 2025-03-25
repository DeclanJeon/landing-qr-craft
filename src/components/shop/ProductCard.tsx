
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    externalUrl: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card key={product.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative h-48 w-full">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
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
