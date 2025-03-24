
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { List } from 'lucide-react';

const PeermallList = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="등록된 피어몰 리스트"
            description="등록된 피어몰 목록 서비스는 현재 개발 중입니다. 곧 다양한 피어몰을 둘러보실 수 있습니다."
            icon={<List className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default PeermallList;
