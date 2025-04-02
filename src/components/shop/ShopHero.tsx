
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface ShopHeroProps {
  shopName: string;
  description: string;
}

const ShopHero: React.FC<ShopHeroProps> = ({ shopName, description }) => {
  const { shopUrl } = useParams();
  const [heroSettings, setHeroSettings] = useState({
    background: "bg-gradient-to-r from-blue-500 to-indigo-600",
    title: "",
    description: "",
    buttonText: "상품 구경하기",
    buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
  });

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    if (shopDataString) {
      const shopData = JSON.parse(shopDataString);
      
      if (shopData.shopUrl === shopUrl && shopData.heroSettings) {
        setHeroSettings(shopData.heroSettings);
      }
    }
  }, [shopUrl]);

  return (
    <div className={`relative rounded-xl overflow-hidden h-64 mb-8 ${heroSettings.background}`}>
      <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
        <h1 className="text-3xl font-bold mb-2">
          {heroSettings.title || `${shopName}에 오신 것을 환영합니다`}
        </h1>
        <p className="text-white/80 mb-6 max-w-lg">
          {heroSettings.description || description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
        </p>
        <Button className={`w-fit ${heroSettings.buttonColor}`}>
          {heroSettings.buttonText} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
