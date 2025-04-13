import React from 'react';
import { Link, useParams } from 'react-router-dom';
// Icons might not be used in the provided snippet, but keep imports for safety or future use
import { Phone, Mail, MapPin } from 'lucide-react';
import { ShopData } from '@/types/shop'; // Keep type import

// Define the type for footer settings from ShopData (Keep this definition)
type FooterSettings = NonNullable<ShopData['footerSettings']>;

// Interface needs to match the component usage
interface ShopFooterProps {
  shopName: string; // Used in snippet
  shopUrl: string; // Used for internal logic (params fallback)
  shopData?: ShopData; // Potentially used for fallbacks if snippet logic changes
  footerSettingsOverride?: FooterSettings; // Keep for potential future use
  handleOpenCreateModal?: () => void; // Add this based on the snippet usage
}

const ShopFooter: React.FC<ShopFooterProps> = ({
  shopName, // Used in snippet
  shopUrl, // Used for internal logic
  shopData, // Keep for potential future use
  footerSettingsOverride, // Keep for potential future use
  handleOpenCreateModal // Destructure the new prop
}) => {
  // Keep this logic as it might be relevant for links or other parts not shown
  const params = useParams();
  const actualShopUrl = shopUrl || params.shopUrl || '';

  // Directly return the JSX provided by the user
  return (
    <footer className="bg-primary-200 text-bg-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-bg-300">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold">
              {/* Footer 로고 색상 변경 */}
              <span className="text-primary-100">Peer</span>
              <span className="text-bg-100">mall</span>
            </Link>
            {/* Footer 설명 텍스트 색상 변경 */}
            <p className="mt-2 text-sm text-bg-200 max-w-md">
              피어몰은 판매자와 구매자를 연결하는 온라인 마켓플레이스입니다.
              지금 바로 쇼핑을 시작하거나 나만의 온라인 스토어를 만들어보세요.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              {/* Footer 제목 텍스트 색상 변경 */}
              <h3 className="text-bg-100 text-sm font-medium mb-4">쇼핑</h3>
              <ul className="space-y-2 text-sm">
                {/* Footer 링크 텍스트, 호버 색상 변경 */}
                <li><Link to="/peermall-list" className="hover:text-primary-100">인기 피어몰</Link></li>
                <li><Link to="/shop/peermall/category/new" className="hover:text-primary-100">신규 피어몰</Link></li>
                <li><Link to="/shop/peermall/category/today" className="hover:text-primary-100">오늘의 특가</Link></li>
                <li><Link to="/qr-generator" className="hover:text-primary-100">QR코드</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-bg-100 text-sm font-medium mb-4">판매하기</h3>
              <ul className="space-y-2 text-sm">
                {/* Ensure handleOpenCreateModal is passed if this link is used */}
                <li><Link to="/" onClick={handleOpenCreateModal} className="hover:text-primary-100">피어몰 만들기</Link></li>
                <li><Link to="/site-integration" className="hover:text-primary-100">사이트 통합</Link></li>
                <li><Link to="/shop/peermall/admin" className="hover:text-primary-100">판매자 센터</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-bg-100 text-sm font-medium mb-4">고객지원</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/customer-service" className="hover:text-primary-100">고객센터</Link></li>
                <li><Link to="/community" className="hover:text-primary-100">커뮤니티</Link></li>
                <li><a href="mailto:contact@peermall.com" className="hover:text-primary-100">이메일 문의</a></li>
                <li><a href="tel:1588-1588" className="hover:text-primary-100">전화: 1588-1588</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Copyright 텍스트 색상 변경 */}
        <div className="mt-8 text-center text-sm text-bg-200">
          <p>&copy; {new Date().getFullYear()} Peermall. 모든 권리 보유.</p>
          <div className="flex justify-center space-x-4 mt-4">
            {/* Footer 하단 링크 텍스트, 호버 색상 변경 */}
            <Link to="/" className="text-bg-200 hover:text-bg-100">이용약관</Link>
            <Link to="/" className="text-bg-200 hover:text-bg-100">개인정보처리방침</Link>
            <Link to="/" className="text-bg-200 hover:text-bg-100">판매자 이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
