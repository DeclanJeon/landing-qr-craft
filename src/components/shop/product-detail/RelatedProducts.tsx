
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/shop';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const navigate = useNavigate();

  if (products.length === 0) return null;

  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-xl font-bold mb-4">관련 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map(product => (
          <div 
            key={product.id} 
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/shop/${window.location.pathname.split('/')[2]}/product/${product.id}`)}
          >
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium truncate">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
