
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShopData } from '@/types/shop';

// Define the type for footer settings from ShopData
type FooterSettings = NonNullable<ShopData['footerSettings']>;

interface ShopFooterProps {
  shopName: string;
  shopUrl: string;
  shopData?: ShopData;
  footerSettingsOverride?: FooterSettings;
  handleOpenCreateModal?: () => void;
}

const ShopFooter: React.FC<ShopFooterProps> = ({
  shopName,
  shopUrl,
  shopData,
  footerSettingsOverride,
  handleOpenCreateModal
}) => {
  const params = useParams();
  const actualShopUrl = shopUrl || params.shopUrl || '';

  return (
    <footer className="bg-primary-200 text-bg-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-bg-300/20">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-primary-300">Peer</span>
              <span className="text-bg-100">mall</span>
            </Link>
            <p className="mt-2 text-sm text-bg-200 max-w-md">
              피어몰은 판매자와 구매자를 연결하는 온라인 마켓플레이스입니다.
              지금 바로 쇼핑을 시작하거나 나만의 온라인 스토어를 만들어보세요.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-bg-100 text-sm font-medium mb-4">쇼핑</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/peermall-list" className="hover:text-primary-300 transition-colors">인기 피어몰</Link></li>
                <li><Link to="/shop/peermall/category/new" className="hover:text-primary-300 transition-colors">신규 피어몰</Link></li>
                <li><Link to="/shop/peermall/category/today" className="hover:text-primary-300 transition-colors">오늘의 특가</Link></li>
                <li><Link to="/qr-generator" className="hover:text-primary-300 transition-colors">QR코드</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-bg-100 text-sm font-medium mb-4">판매하기</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" onClick={handleOpenCreateModal} className="hover:text-primary-300 transition-colors">피어몰 만들기</Link></li>
                <li><Link to="/site-integration" className="hover:text-primary-300 transition-colors">사이트 통합</Link></li>
                <li><Link to="/shop/peermall/admin" className="hover:text-primary-300 transition-colors">판매자 센터</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-bg-100 text-sm font-medium mb-4">고객지원</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/customer-service" className="hover:text-primary-300 transition-colors">고객센터</Link></li>
                <li><Link to="/community" className="hover:text-primary-300 transition-colors">커뮤니티</Link></li>
                <li><a href="mailto:contact@peermall.com" className="hover:text-primary-300 transition-colors">이메일 문의</a></li>
                <li><a href="tel:1588-1588" className="hover:text-primary-300 transition-colors">전화: 1588-1588</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-bg-200">
          <p>&copy; {new Date().getFullYear()} Peermall. 모든 권리 보유.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/" className="text-bg-200 hover:text-bg-100 transition-colors">이용약관</Link>
            <Link to="/" className="text-bg-200 hover:text-bg-100 transition-colors">개인정보처리방침</Link>
            <Link to="/" className="text-bg-200 hover:text-bg-100 transition-colors">판매자 이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
