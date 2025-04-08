
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, Settings, Store, 
  MessageSquare, Users, QrCode, Bell, LogOut, UserCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

const DesktopNavigation = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication status whenever navigation is rendered
    const checkAuth = () => {
      const auth = localStorage.getItem('peermall-user-authenticated') === 'true';
      setIsAuthenticated(auth);
      
      if (auth) {
        setUserNickname(localStorage.getItem('peermall-user-nickname') || '사용자');
        setProfileImage(localStorage.getItem('peermall-user-profile') || null);
      }
    };
    
    checkAuth();
    
    // Add event listener for storage changes
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    localStorage.removeItem('peermall-user-authenticated');
    localStorage.removeItem('peermall-user-nickname');
    setIsAuthenticated(false);
    toast({ title: "로그아웃 되었습니다" });
    
    // Refresh the page to update navigation state
    window.location.reload();
  };
  
  const getInitials = () => {
    return userNickname.substring(0, 2) || '사용자';
  };

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400 font-medium' : ''}`}>
            <Home className="h-4 w-4 mr-1" />
            <span>홈</span>
          </Link>
        </li>
        
        {!isAuthenticated ? (
          <li>
            <Link to="/login" className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors ${isActive('/login') ? 'text-blue-400 font-medium' : ''}`}>
              <User className="h-4 w-4 mr-1" />
              <span>로그인</span>
            </Link>
          </li>
        ) : (
          <li className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center focus:outline-none">
                <Avatar className="h-8 w-8 border-2 border-blue-500/30">
                  {profileImage ? (
                    <AvatarImage src={profileImage} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 border border-gray-700 text-gray-200">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <span className="text-white">{userNickname}</span>
                  <span className="text-xs font-normal text-gray-400">
                    {localStorage.getItem('peermall-user-email')}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-700/50">
                  <Link to="/user-profile">
                    <UserCircle className="h-4 w-4 mr-2 text-blue-400" />
                    <span>내 정보 관리</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-700/50">
                  <Link to="/user-profile?tab=messages">
                    <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
                    <span>쪽지함</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-700/50">
                  <Link to="/user-profile?tab=peermall">
                    <Store className="h-4 w-4 mr-2 text-blue-400" />
                    <span>피어몰 관리</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
        
        <li>
          <Link to="/lounge-admin" className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors ${isActive('/lounge-admin') ? 'text-blue-400 font-medium' : ''}`}>
            <Settings className="h-4 w-4 mr-1" />
            <span>관리자</span>
          </Link>
        </li>
        
        {/* 피어몰 목록 링크 */}
        <li>
          <Link to="/peermall-list" className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors ${isActive('/peermall-list') ? 'text-blue-400 font-medium' : ''}`}>
            <Store className="h-4 w-4 mr-1" />
            <span>피어몰 목록</span>
          </Link>
        </li>
        
        {/* QR 코드 생성 링크 */}
        <li>
          <Link to="/qr-generator" className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors ${isActive('/qr-generator') ? 'text-blue-400 font-medium' : ''}`}>
            <QrCode className="h-4 w-4 mr-1" />
            <span>QR 코드 생성</span>
          </Link>
        </li>
        
        {/* 고객지원 및 커뮤니티 그룹 */}
        <li className="relative group">
          <div className={`flex items-center text-gray-300 hover:text-blue-400 transition-colors cursor-pointer ${isActive('/customer-service') || isActive('/community') ? 'text-blue-400 font-medium' : ''}`}>
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>고객지원</span>
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-700">
            <Link to="/customer-service" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
              고객센터
            </Link>
            <Link to="/community" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
              커뮤니티
            </Link>
          </div>
        </li>
        
        {/* Notification Bell - only show for logged in users */}
        {isAuthenticated && (
          <li className="relative group">
            <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">
              <div className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-700">
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-gray-200">알림</h3>
                <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">모두 읽음 표시</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-gray-700 bg-blue-900/20">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm text-gray-200">새로운 메시지</h4>
                    <span className="text-xs text-gray-500">5분 전</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">admin@peermall.com님이 메시지를 보냈습니다.</p>
                </div>
                <div className="p-3 border-b border-gray-700">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm text-gray-200">QR 코드 스캔</h4>
                    <span className="text-xs text-gray-500">1시간 전</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">귀하의 QR 코드가 5회 스캔되었습니다.</p>
                </div>
              </div>
              <div className="p-3 text-center border-t border-gray-700">
                <Link to="/notifications" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">모든 알림 보기</Link>
              </div>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
