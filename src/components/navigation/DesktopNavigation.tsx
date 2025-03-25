
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, Settings, Store, 
  MessageSquare, Users, Link as LinkIcon
} from "lucide-react";

const DesktopNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : ''}`}>
            <Home className="h-4 w-4 mr-1" />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/login" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/login') ? 'text-blue-600 font-medium' : ''}`}>
            <User className="h-4 w-4 mr-1" />
            <span>로그인</span>
          </Link>
        </li>
        <li>
          <Link to="/lounge-admin" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/lounge-admin') ? 'text-blue-600 font-medium' : ''}`}>
            <Settings className="h-4 w-4 mr-1" />
            <span>관리자</span>
          </Link>
        </li>
        <li>
          <Link to="/personal-lounge" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/personal-lounge') ? 'text-blue-600 font-medium' : ''}`}>
            <Store className="h-4 w-4 mr-1" />
            <span>내 피어몰 만들기</span>
          </Link>
        </li>
        
        <li>
          <Link to="/peermall-list" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/peermall-list') ? 'text-blue-600 font-medium' : ''}`}>
            <Store className="h-4 w-4 mr-1" />
            <span>피어몰 목록</span>
          </Link>
        </li>
        
        {/* 고객지원 및 커뮤니티 그룹 */}
        <li className="relative group">
          <div className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer ${isActive('/customer-service') || isActive('/community') ? 'text-blue-600 font-medium' : ''}`}>
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>고객지원</span>
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link to="/customer-service" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              고객센터
            </Link>
            <Link to="/community" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              커뮤니티
            </Link>
          </div>
        </li>
        
        <li>
          <Link to="/site-integration" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${isActive('/site-integration') ? 'text-blue-600 font-medium' : ''}`}>
            <LinkIcon className="h-4 w-4 mr-1" />
            <span>사이트연동</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
