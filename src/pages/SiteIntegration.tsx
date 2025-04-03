
import React from 'react';
// Removed redundant Navigation import
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { Link } from 'lucide-react'; // Keep Link icon import

const SiteIntegration = () => {
  return (
    // Apply dark theme background and adjust padding
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16"> 
      {/* Removed extra div wrapper */}
      <div className="container mx-auto px-6"> {/* Consistent padding */}
        {/* Update icon color for dark theme */}
        <PageUnderConstruction
          title="사이트 연동"
          description="외부 사이트 연동 서비스는 현재 개발 중입니다. 곧 메인 페이지에 외부 링크를 걸 수 있는 기능이 제공될 예정입니다."
          icon={<Link className="h-16 w-16 text-blue-400" />} 
        />
      </div>
      {/* Added missing closing div */}
    </div>
  );
};

export default SiteIntegration;
