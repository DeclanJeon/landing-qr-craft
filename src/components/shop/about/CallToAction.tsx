
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-blue-50 p-8 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4 text-blue-700">지금 바로 피어몰을 시작해보세요</h3>
      <p className="text-blue-600 mb-6">자신만의 브랜드를 구축하고 제품을 홍보하며 새로운 비즈니스 기회를 만들어보세요.</p>
      <div className="flex justify-center gap-4">
        <Link to="/personal-lounge">
          <Button size="lg" className="font-semibold">
            피어몰 만들기
          </Button>
        </Link>
        <Link to="/qr-generator">
          <Button variant="outline" size="lg" className="font-semibold">
            QR코드 생성하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
