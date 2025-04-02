
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
    background: "bg-gradient-to-r from-blue-600 to-indigo-700",
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
    <div className={`relative rounded-2xl overflow-hidden h-96 mb-12 ${heroSettings.background}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
      </div>
      
      <div className="absolute inset-0 p-12 flex flex-col justify-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight max-w-xl">
          {heroSettings.title || `${shopName}에 오신 것을 환영합니다`}
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
          {heroSettings.description || description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
        </p>
        <Button className={`w-fit text-base px-6 py-5 shadow-lg ${heroSettings.buttonColor} font-medium rounded-full`}>
          {heroSettings.buttonText} <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
