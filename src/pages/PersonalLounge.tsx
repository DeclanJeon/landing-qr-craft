
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { Store } from 'lucide-react';

const PersonalLounge = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="내 피어몰 라운지"
            description="나만의 피어몰 라운지 서비스는 현재 개발 중입니다. 곧 이메일과 연동된 개인 라운지를 이용하실 수 있습니다."
            icon={<Store className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalLounge;
