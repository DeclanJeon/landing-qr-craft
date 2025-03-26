
import React from 'react';
import { Award } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-6">피어몰의 가치와 혜택</h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start">
          <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
          <span>자신만의 브랜드와 제품을 만들고 유통할 수 있는 기회</span>
        </li>
        <li className="flex items-start">
          <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
          <span>제조사, 유통사와의 직접적인 소통을 통한 투명한 거래</span>
        </li>
        <li className="flex items-start">
          <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
          <span>QR코드를 통한 간편한 제품 정보 접근 및 인증</span>
        </li>
        <li className="flex items-start">
          <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
          <span>커뮤니티를 통한 다양한 소통 방식 제공</span>
        </li>
        <li className="flex items-start">
          <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
          <span>스스로 거버넌스할 수 있는 자유로운 환경 제공</span>
        </li>
      </ul>
    </div>
  );
};

export default BenefitsSection;
