
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ShopHeroProps {
  shopName: string;
  description: string;
}

const ShopHero: React.FC<ShopHeroProps> = ({ shopName, description }) => {
  return (
    <div className="relative rounded-xl overflow-hidden h-64 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
        <h1 className="text-3xl font-bold mb-2">{shopName}에 오신 것을 환영합니다</h1>
        <p className="text-white/80 mb-6 max-w-lg">
          {description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
        </p>
        <Button className="w-fit bg-white text-blue-600 hover:bg-gray-100">
          상품 구경하기 <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
