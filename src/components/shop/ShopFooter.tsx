
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const params = useParams();
  const actualShopUrl = shopUrl || params.shopUrl || '';
  const [footerSettings, setFooterSettings] = useState({
    background: "bg-gray-800",
    textColor: "text-white",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    if (shopDataString) {
      const parsedShopData = JSON.parse(shopDataString);
      
      if (parsedShopData.shopUrl === actualShopUrl && parsedShopData.footerSettings) {
        setFooterSettings(parsedShopData.footerSettings);
      }
    }
  }, [actualShopUrl]);

  return (
    <footer className={`${footerSettings.background} ${footerSettings.textColor} py-10`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">{shopName}</h3>
            <p className={`${footerSettings.textColor}/80 max-w-md`}>
              {shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-lg font-medium mb-3">쇼핑몰 정보</h4>
              <ul className="space-y-2">
                <li><Link to={`/shop/${actualShopUrl}/about`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>소개</Link></li>
                <li><Link to={`/shop/${actualShopUrl}/service`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>서비스</Link></li>
                <li><Link to={`/shop/${actualShopUrl}/terms`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>이용약관</Link></li>
                <li><Link to={`/shop/${actualShopUrl}/privacy`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>개인정보처리방침</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">고객 서비스</h4>
              <ul className="space-y-2">
                <li><Link to={`/shop/${actualShopUrl}/faq`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>자주 묻는 질문</Link></li>
                <li><Link to={`/shop/${actualShopUrl}/contact`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>문의하기</Link></li>
                <li><Link to={`/shop/${actualShopUrl}/shipping`} className={`${footerSettings.textColor}/70 hover:${footerSettings.textColor}`}>배송 안내</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">연락처 정보</h4>
              <ul className={`space-y-2 ${footerSettings.textColor}/70`}>
                {(shopData?.ownerName || footerSettings.ownerName) && 
                  <li>대표자: {footerSettings.ownerName || shopData?.ownerName}</li>
                }
                {(shopData?.contactNumber || footerSettings.contactNumber) && (
                  <li className="flex items-center">
                    <Link to={`/shop/${actualShopUrl}/call`} className={`flex items-center hover:${footerSettings.textColor}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      연락처: {footerSettings.contactNumber || shopData?.contactNumber}
                    </Link>
                  </li>
                )}
                {(shopData?.email || footerSettings.email) && 
                  <li>이메일: {footerSettings.email || shopData?.email}</li>
                }
                {footerSettings.address && 
                  <li>주소: {footerSettings.address}</li>
                }
              </ul>
            </div>
          </div>
        </div>
        
        <div className={`border-t border-${footerSettings.textColor}/20 mt-8 pt-6 text-center ${footerSettings.textColor}/70`}>
          <p>© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
          <p className="mt-1">Powered by Peermall</p>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
