
import React from 'react';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="relative group overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Add to cart button */}
        <Button 
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-blue-600 font-bold">{product.price}</p>
        <div className="mt-3 flex justify-end">
          <a 
            href={product.externalUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>외부 링크</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
