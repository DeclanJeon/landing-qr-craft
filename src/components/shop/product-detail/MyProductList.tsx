
import React from 'react';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MyProductListProps {
  shopUrl?: string;
  products: Product[];
}

const MyProductList: React.FC<MyProductListProps> = ({ shopUrl, products }) => {
  const navigate = useNavigate();

  const handleViewProduct = (productId: number) => {
    if (shopUrl) {
      navigate(`/shop/${shopUrl}/product/${productId}`);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">내 상품 목록</h2>
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                  <p className="text-blue-600 font-medium mt-1">{product.price}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={() => handleViewProduct(product.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-700">등록된 상품이 없습니다</h3>
          <p className="text-gray-500 mt-1">아직 등록한 상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyProductList;
