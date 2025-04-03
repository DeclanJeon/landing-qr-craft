
import React from 'react';
// Removed redundant Navigation import
import PageUnderConstruction from '@/components/PageUnderConstruction';
import { MessageSquare } from 'lucide-react';

const CustomerService = () => {
  return (
    // Apply dark theme background and adjust padding
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16"> 
      {/* Removed extra div wrapper */}
      <div className="container mx-auto px-6"> {/* Consistent padding */}
        {/* Update icon color for dark theme */}
        <PageUnderConstruction
          title="고객센터 서비스"
          description="1:1 채팅, 화상 채팅, 음성 채팅 서비스는 현재 개발 중입니다. 빠른 시일 내에 다양한 채널로 소통할 수 있는 서비스를 제공해 드리겠습니다."
          icon={<MessageSquare className="h-16 w-16 text-blue-400" />} 
        />
      </div>
      {/* Added missing closing div */}
    </div>
  );
};

export default CustomerService;
