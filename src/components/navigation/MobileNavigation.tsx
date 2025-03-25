
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, User, Settings, Store, 
  MessageSquare, Users, Link as LinkIcon, QrCode
} from "lucide-react";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const MobileNavigation = ({ isMenuOpen, closeMenu }: MobileNavigationProps) => {
  if (!isMenuOpen) return null;
  
  return (
    <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg p-4 z-50 animate-fade-in-fast">
      <ul className="space-y-3">
        <li>
          <Link to="/" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <Home className="h-5 w-5 mr-3 text-blue-600" />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/login" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <User className="h-5 w-5 mr-3 text-blue-600" />
            <span>로그인</span>
          </Link>
        </li>
        <li>
          <Link to="/lounge-admin" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <Settings className="h-5 w-5 mr-3 text-blue-600" />
            <span>관리자</span>
          </Link>
        </li>

        {/* 피어몰 그룹 */}
        <li className="border-t border-gray-100 pt-2">
          <p className="px-4 text-xs text-gray-500 uppercase">피어몰</p>
        </li>
        <li>
          <Link to="/personal-lounge" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <Store className="h-5 w-5 mr-3 text-blue-600" />
            <span>내 피어몰 만들기</span>
          </Link>
        </li>
        <li>
          <Link to="/peermall-list" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <Store className="h-5 w-5 mr-3 text-blue-600" />
            <span>피어몰 목록</span>
          </Link>
        </li>
        <li>
          <Link to="/qr-generator" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <QrCode className="h-5 w-5 mr-3 text-blue-600" />
            <span>QR 코드 생성</span>
          </Link>
        </li>

        {/* 고객지원 그룹 */}
        <li className="border-t border-gray-100 pt-2">
          <p className="px-4 text-xs text-gray-500 uppercase">고객지원</p>
        </li>
        <li>
          <Link to="/customer-service" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
            <span>고객센터</span>
          </Link>
        </li>
        <li>
          <Link to="/community" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <Users className="h-5 w-5 mr-3 text-blue-600" />
            <span>커뮤니티</span>
          </Link>
        </li>
        
        <li>
          <Link to="/site-integration" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
            <LinkIcon className="h-5 w-5 mr-3 text-blue-600" />
            <span>사이트연동</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigation;
