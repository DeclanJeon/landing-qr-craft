
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { Link } from 'lucide-react';

const SiteIntegration = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="사이트 연동"
            description="외부 사이트 연동 서비스는 현재 개발 중입니다. 곧 메인 페이지에 외부 링크를 걸 수 있는 기능이 제공될 예정입니다."
            icon={<Link className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteIntegration;
