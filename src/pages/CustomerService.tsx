
import React from 'react';
import Navigation from '@/components/Navigation';
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { MessageSquare } from 'lucide-react';

const CustomerService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <PageUnderConstruction
            title="고객센터 서비스"
            description="1:1 채팅, 화상 채팅, 음성 채팅 서비스는 현재 개발 중입니다. 빠른 시일 내에 다양한 채널로 소통할 수 있는 서비스를 제공해 드리겠습니다."
            icon={<MessageSquare className="h-16 w-16 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
