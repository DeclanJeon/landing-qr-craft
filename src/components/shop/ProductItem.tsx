
import React from 'react';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink, Truck, Factory, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from "@/hooks/use-toast";

interface ProductItemProps {
  product: Product;
  onDelete?: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  const { addToCart } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product detail
    addToCart(product);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product detail
    
    if (onDelete) {
      onDelete(product.id);
      toast({
        title: "상품이 삭제되었습니다",
        description: `${product.name} 상품이 목록에서 제거되었습니다.`
      });
    }
  };

  return (
    <div className="relative group overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button 
            variant="secondary"
            size="icon"
            className="bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button 
              variant="destructive"
              size="icon"
              className="bg-white bg-opacity-80 hover:bg-red-500"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-blue-600 font-bold">{product.price}</p>

        {(product.distributor || product.manufacturer) && (
          <div className="mt-2 space-y-1 text-xs text-gray-500">
            {product.distributor && (
              <div className="flex items-center">
                <Truck className="h-3 w-3 mr-1" />
                <span>{product.distributor}</span>
              </div>
            )}
            {product.manufacturer && (
              <div className="flex items-center">
                <Factory className="h-3 w-3 mr-1" />
                <span>{product.manufacturer}</span>
              </div>
            )}
          </div>
        )}

        {product.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        )}
        
        <div className="mt-3 flex justify-end">
          <a 
            href={product.externalUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center"
            onClick={(e) => e.stopPropagation()} // Prevent navigation to product detail
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
