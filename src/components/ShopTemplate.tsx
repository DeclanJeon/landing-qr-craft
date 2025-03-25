
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductSection from './shop/ProductSection';
import { sampleProducts, categories } from '@/constants/sampleData';
import { ShopData, Product } from '@/types/shop';

interface ShopTemplateProps {
  shopUrl?: string;
  page?: string;
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({ shopUrl, page }) => {
  const params = useParams();
  const categoryParam = params.page === 'category' ? Number(params.categoryId) : 0;
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categoryParam || 0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);

  // Get shop data from localStorage (in a real application, this would come from a database)
  const shopDataString = localStorage.getItem('peermallShopData');
  const shopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
  
  // Filter products when selectedCategoryId changes
  useEffect(() => {
    if (selectedCategoryId === 0) {
      // Show all products when no category is selected
      setFilteredProducts(sampleProducts);
    } else {
      // Filter products by selected category
      const filtered = sampleProducts.filter(product => product.categoryId === selectedCategoryId);
      setFilteredProducts(filtered);
    }
  }, [selectedCategoryId]);

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  if (!shopData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">피어몰을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 피어몰이 존재하지 않거나 접근할 수 없습니다.</p>
        <Link to="/personal-lounge">
          <Button>피어몰 만들기로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <ShopHeader shopName={shopData.shopName} shopUrl={shopUrl || ''} page={page} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <ShopHero shopName={shopData.shopName} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ShopSidebar 
            categories={categories} 
            shopUrl={shopUrl} 
            shopData={shopData}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            {selectedCategoryId > 0 ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  {categories.find(cat => cat.id === selectedCategoryId)?.name || '상품 목록'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductSection.Item key={product.id} product={product} />
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">해당 카테고리에 상품이 없습니다.</p>
                )}
              </div>
            ) : (
              <>
                <ProductSection 
                  title="추천 상품" 
                  linkTo={`/shop/${shopUrl}/products`} 
                  products={filteredProducts.slice(0, 3)} 
                />

                <ProductSection 
                  title="신상품" 
                  linkTo={`/shop/${shopUrl}/new`} 
                  products={filteredProducts.slice(3, 6)} 
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <ShopFooter shopName={shopData.shopName} shopUrl={shopUrl || ''} />
    </div>
  );
};

export default ShopTemplate;
