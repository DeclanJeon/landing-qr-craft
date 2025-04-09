import React from 'react';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ExternalLink, Truck, Factory, Star } from 'lucide-react';

interface LuxuryProductDisplayProps {
  product: Product;
}

// Making sure price calculations work properly by converting string prices to numbers first
const getNumericPrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  // Remove non-numeric characters and convert to number
  return parseFloat(price.replace(/[^\d.]/g, ''));
};

const LuxuryProductDisplay: React.FC<LuxuryProductDisplayProps> = ({ product }) => {
  const originalPrice = getNumericPrice(product.originalPrice || product.price);
  const currentPrice = getNumericPrice(product.price);
  const discountPercentage = product.originalPrice ?
    Math.round(((getNumericPrice(product.originalPrice) - getNumericPrice(product.price)) / getNumericPrice(product.originalPrice)) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          {discountPercentage > 0 && (
            <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-2xl mb-2">{product.name}</h3>
        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-gray-700">4.5 (128 리뷰)</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            {product.originalPrice && (
              <span className="text-gray-500 line-through mr-2">
                {product.originalPrice}
              </span>
            )}
            <span className="text-blue-600 font-bold text-xl">
              {product.price}
            </span>
          </div>
          <Button variant="primary" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            장바구니 추가
          </Button>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        {(product.distributor || product.manufacturer) && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700">제조 정보</h4>
            <div className="text-gray-600 text-sm">
              {product.distributor && (
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>{product.distributor}</span>
                </div>
              )}
              {product.manufacturer && (
                <div className="flex items-center">
                  <Factory className="h-4 w-4 mr-2" />
                  <span>{product.manufacturer}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>자세히 보기</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductDisplay;
