
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

interface ShopFooterProps {
  shopName: string;
  shopUrl: string;
  shopData?: {
    ownerName?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
  };
}

const ShopFooter: React.FC<ShopFooterProps> = ({ shopName, shopUrl, shopData }) => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">{shopName}</h3>
            <p className="text-gray-400 max-w-md">
              {shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-lg font-medium mb-3">쇼핑몰 정보</h4>
              <ul className="space-y-2">
                <li><Link to={`/shop/${shopUrl}/about`} className="text-gray-400 hover:text-white">소개</Link></li>
                <li><Link to={`/shop/${shopUrl}/service`} className="text-gray-400 hover:text-white">서비스</Link></li>
                <li><Link to={`/shop/${shopUrl}/terms`} className="text-gray-400 hover:text-white">이용약관</Link></li>
                <li><Link to={`/shop/${shopUrl}/privacy`} className="text-gray-400 hover:text-white">개인정보처리방침</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">고객 서비스</h4>
              <ul className="space-y-2">
                <li><Link to={`/shop/${shopUrl}/faq`} className="text-gray-400 hover:text-white">자주 묻는 질문</Link></li>
                <li><Link to={`/shop/${shopUrl}/contact`} className="text-gray-400 hover:text-white">문의하기</Link></li>
                <li><Link to={`/shop/${shopUrl}/shipping`} className="text-gray-400 hover:text-white">배송 안내</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">연락처 정보</h4>
              {shopData && (
                <ul className="space-y-2 text-gray-400">
                  {shopData.ownerName && <li>대표자: {shopData.ownerName}</li>}
                  {shopData.contactNumber && (
                    <li className="flex items-center">
                      <Link to={`/shop/${shopUrl}/call`} className="flex items-center hover:text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        연락처: {shopData.contactNumber}
                      </Link>
                    </li>
                  )}
                  {shopData.email && <li>이메일: {shopData.email}</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
          <p className="mt-1">Powered by Peermall</p>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
