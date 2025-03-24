
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { Users } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="피어몰 커뮤니티"
            description="커뮤니티 게시판 서비스는 현재 개발 중입니다. 곧 다양한 사용자들과 소통하고 정보를 공유할 수 있는 공간이 마련될 예정입니다."
            icon={<Users className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;
