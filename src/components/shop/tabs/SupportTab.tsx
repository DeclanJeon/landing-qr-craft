import React from 'react';
import InquiryBoard from '@/components/community/InquiryBoard'; // Import the InquiryBoard component
import { ShopData } from '@/types/shop'; // Keep ShopData if needed for other parts or future use

interface SupportTabProps {
  shopData: ShopData | null; // Keep shopData prop if InquiryBoard might need it later
}

const SupportTab: React.FC<SupportTabProps> = ({ shopData }) => {
  // TODO: Pass shop-specific context (like shopId or shopData) to InquiryBoard 
  // if inquiries should be filtered per shop in the future.
  // For now, it renders the global/sample inquiry board.
  
  return (
    <div className="space-y-6">
      {/* Render the InquiryBoard component instead of static content */}
      <InquiryBoard /> 
      
      {/* Optionally, keep shop-specific contact info if desired */}
      {/* 
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-medium mb-4">문의하기</h3>
        <p className="text-gray-600 mb-4">
          추가 질문이나 도움이 필요하시면 아래 연락처로 문의해주세요.
        </p>
        <div className="p-4 bg-gray-50 rounded-lg">
          <ul className="space-y-2">
            <li className="flex">
              <span className="font-medium w-24">이메일:</span>
              <span>{shopData?.email || '정보 없음'}</span>
            </li>
            <li className="flex">
              <span className="font-medium w-24">연락처:</span>
              <span>{shopData?.contactNumber || '정보 없음'}</span>
            </li>
            <li className="flex">
              <span className="font-medium w-24">담당자:</span>
              <span>{shopData?.ownerName || '정보 없음'}</span>
            </li>
          </ul>
        </div>
      </div> 
      */}
    </div>
  );
};

export default SupportTab;
