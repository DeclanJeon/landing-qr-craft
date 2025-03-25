
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductSection from './shop/ProductSection';
import { sampleProducts, categories } from '@/constants/sampleData';
import { ShopData } from '@/types/shop';

interface ShopTemplateProps {
  shopUrl?: string;
  page?: string;
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({ shopUrl, page }) => {
  // Get shop data from localStorage (in a real application, this would come from a database)
  const shopDataString = localStorage.getItem('peermallShopData');
  const shopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
  
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
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            <ProductSection 
              title="추천 상품" 
              linkTo={`/shop/${shopUrl}/products`} 
              products={sampleProducts.slice(0, 3)} 
            />

            <ProductSection 
              title="신상품" 
              linkTo={`/shop/${shopUrl}/new`} 
              products={sampleProducts.slice(3, 6)} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <ShopFooter shopName={shopData.shopName} shopUrl={shopUrl || ''} />
    </div>
  );
};

export default ShopTemplate;
