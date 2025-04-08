import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import { Product, Category } from '@/types/shop';
import ProductItem from '@/components/shop/ProductItem'; // Assuming ProductItem is correctly located
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ProductsTabProps {
  shopUrl: string;
  products: Product[];
  categories: Category[]; // Assuming categories are passed if needed for display, though filtering happens outside
  selectedCategoryId: number; // To display the current category name
  onOpenProductRegistration: () => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({
  shopUrl,
  products,
  categories,
  selectedCategoryId,
  onOpenProductRegistration,
  onDeleteProduct,
}) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {selectedCategoryId > 0
              ? (categories.find(cat => cat.id === selectedCategoryId)?.name || '상품 목록')
              : '추천 상품 및 링크'}
          </h2>
          <Button variant="outline" size="sm" className="flex items-center" onClick={onOpenProductRegistration}>
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>상품 등록</span>
          </Button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              // Use navigate for product detail view
              <div key={product.id} className="cursor-pointer" onClick={() => navigate(`/shop/${shopUrl}/product/${product.id}`)}>
                <ProductItem
                  product={product}
                  onDelete={onDeleteProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 상품이 없습니다</h3>
            <p className="text-gray-500 mb-4">상품을 등록하여 고객에게 소개해보세요.</p>
            <Button onClick={onOpenProductRegistration} className="flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              상품 등록하기
            </Button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <ShoppingCart className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-blue-700">링크 관심목록 정보</h3>
            <p className="text-sm text-blue-600">
              이 피어몰은 직접 결제 기능이 없는 프로모션 랜딩 페이지입니다.
              관심 상품은 외부 사이트에서 직접 구매하셔야 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;
