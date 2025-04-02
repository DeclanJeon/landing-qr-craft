
import React, { useState, useEffect } from 'react';
import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MyProductListProps {
  shopUrl?: string;
  products: Product[];
}

const MyProductList: React.FC<MyProductListProps> = ({ shopUrl, products }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) ||
        (product.description && product.description.toLowerCase().includes(lowercaseSearch))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleViewProduct = (productId: number) => {
    if (shopUrl) {
      navigate(`/shop/${shopUrl}/product/${productId}`);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold mb-3 sm:mb-0">내 상품 목록</h2>
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="상품 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
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
          <h3 className="text-lg font-medium text-gray-700">
            {searchTerm ? '검색 결과가 없습니다' : '등록된 상품이 없습니다'}
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm 
              ? '다른 검색어로 시도해보세요.' 
              : '아직 등록한 상품이 없습니다.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProductList;
