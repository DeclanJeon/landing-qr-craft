
// Create a helper function to safely convert prices to numbers
const getNumericPrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  // Remove non-numeric characters (like commas, currency symbols) and convert to number
  return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
};

// Function to properly handle product with image property
const prepareProductForDisplay = (product: any) => {
  return {
    ...product,
    // Ensure product has an image property
    image: product.imageUrl || product.image || ''
  };
};

// Example usage in a component:
import React from 'react';
import { Product } from '@/types/shop';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LuxuryProductCardProps {
  product: Product;
  themeSettings?: any;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const LuxuryProductCard: React.FC<LuxuryProductCardProps> = ({ 
  product, 
  themeSettings, 
  onAddToCart,
  onAddToWishlist
}) => {
  // Safely handle price calculations
  const originalPrice = getNumericPrice(product.originalPrice || product.price);
  const currentPrice = getNumericPrice(product.price);
  const discountPercentage = product.originalPrice ? 
    Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  // Prepare product with image property
  const productWithImage = prepareProductForDisplay(product);
  
  return (
    <div className="luxury-product-card">
      {/* Example card content */}
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        <img 
          src={productWithImage.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.title || product.name}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-lg">${currentPrice.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {onAddToWishlist && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onAddToWishlist(product)}
                  className="h-8 w-8"
                >
                  <Heart size={16} />
                </Button>
              )}
              {onAddToCart && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  className="h-8"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  <span>Add</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductCard;
