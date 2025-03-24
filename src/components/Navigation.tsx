
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, User, Settings, QrCode, List, Store, 
  MessageSquare, Users, Link as LinkIcon, Menu, X 
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          <span>Peermall</span>
        </Link>

        {/* Desktop Navigation */}
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
            
            {/* QR 코드 관련 그룹 */}
            <li className="relative group">
              <div className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer ${isActive('/qr-generator') || isActive('/qr-list') ? 'text-blue-600 font-medium' : ''}`}>
                <QrCode className="h-4 w-4 mr-1" />
                <span>QR코드</span>
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/qr-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
                  QR코드 생성
                </Link>
                <Link to="/qr-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
                  QR코드 목록
                </Link>
              </div>
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
                <Link to="/customer-service" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
                  고객센터
                </Link>
                <Link to="/community" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="메뉴 열기/닫기"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
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
              <li>
                <Link to="/personal-lounge" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
                  <Store className="h-5 w-5 mr-3 text-blue-600" />
                  <span>내 피어몰 만들기</span>
                </Link>
              </li>

              {/* QR 코드 그룹 */}
              <li className="border-t border-gray-100 pt-2">
                <p className="px-4 text-xs text-gray-500 uppercase">QR 코드</p>
              </li>
              <li>
                <Link to="/qr-generator" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
                  <QrCode className="h-5 w-5 mr-3 text-blue-600" />
                  <span>QR코드 생성</span>
                </Link>
              </li>
              <li>
                <Link to="/qr-list" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
                  <List className="h-5 w-5 mr-3 text-blue-600" />
                  <span>QR코드 목록</span>
                </Link>
              </li>

              <li>
                <Link to="/peermall-list" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md" onClick={closeMenu}>
                  <Store className="h-5 w-5 mr-3 text-blue-600" />
                  <span>피어몰 목록</span>
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
        )}

        <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">
          <Link to="/qr-generator" className="text-white">시작하기</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navigation;
