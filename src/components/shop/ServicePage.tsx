
import React from 'react';
import { ShoppingBag, Truck, Headphones, RotateCcw, Clock, CreditCard } from 'lucide-react';

interface ServicePageProps {
  shopData: {
    shopName: string;
  };
}

const ServicePage: React.FC<ServicePageProps> = ({ shopData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{shopData.shopName} 서비스</h2>
      
      <p className="text-lg text-gray-700 mb-8">
        {shopData.shopName}은 고객님께 다양한 서비스를 제공하여 최상의 쇼핑 경험을 드리기 위해 노력하고 있습니다.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">다양한 제품 컬렉션</h3>
            <p className="text-gray-600">
              최신 트렌드에 맞는 다양한 제품들을 엄선하여 제공하고 있습니다. 
              고객님의 취향과 필요에 맞는 제품을 찾아보세요.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">신속한 배송 서비스</h3>
            <p className="text-gray-600">
              주문 후 최대한 빠른 시간 내에 제품을 받아보실 수 있도록 
              효율적인 배송 시스템을 운영하고 있습니다.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
              <Headphones className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">24/7 고객 지원</h3>
            <p className="text-gray-600">
              언제든지 문의사항이 있으시면 저희 고객 지원팀이 
              신속하고 친절하게 도와드리겠습니다.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">간편한 교환/환불</h3>
            <p className="text-gray-600">
              제품에 만족하지 못하셨다면, 간편한 절차를 통해 
              교환 또는 환불을 도와드립니다.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-2xl font-bold mb-6">이용 안내</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-bold">운영 시간</h4>
            </div>
            <p className="text-gray-600">평일: 09:00 - 18:00</p>
            <p className="text-gray-600">토요일: 09:00 - 13:00</p>
            <p className="text-gray-600">일요일 및 공휴일: 휴무</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-bold">결제 방법</h4>
            </div>
            <p className="text-gray-600">신용카드, 체크카드, 계좌이체</p>
            <p className="text-gray-600">간편결제(카카오페이, 네이버페이 등)</p>
            <p className="text-gray-600">모바일 결제</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-5 rounded-lg">
        <h3 className="text-xl font-bold mb-3">서비스 문의</h3>
        <p className="text-gray-700 mb-2">
          추가 문의사항이 있으시면 아래 연락처로 문의해주세요.
        </p>
        <p className="text-gray-700">
          이메일: service@{shopData.shopName.toLowerCase()}.com
        </p>
        <p className="text-gray-700">
          전화: 02-1234-5678 (평일 09:00-18:00)
        </p>
      </div>
    </div>
  );
};

export default ServicePage;
