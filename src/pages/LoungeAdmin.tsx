
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { Settings } from 'lucide-react';

const LoungeAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="Peermall 라운지 관리자 페이지"
            description="라운지 관리자 페이지는 현재 개발 중입니다. 빠른 시일 내에 서비스를 제공해 드리겠습니다."
            icon={<Settings className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LoungeAdmin;
