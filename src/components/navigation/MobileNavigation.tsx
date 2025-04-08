import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Home, User, Settings, Store, 
  MessageSquare, Users, QrCode, 
  Bell, LogOut, UserCircle, Mail
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const MobileNavigation = ({ isMenuOpen, closeMenu }: MobileNavigationProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const auth = localStorage.getItem('peermall-user-authenticated') === 'true';
      setIsAuthenticated(auth);
      
      if (auth) {
        setUserNickname(localStorage.getItem('peermall-user-nickname') || '사용자');
        setProfileImage(localStorage.getItem('peermall-user-profile') || null);
      }
    };
    
    checkAuth();
    
    // Set up an interval to periodically check auth status
    const intervalId = setInterval(checkAuth, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isMenuOpen]); // Re-check when menu opens
  
  const handleLogout = () => {
    localStorage.removeItem('peermall-user-authenticated');
    localStorage.removeItem('peermall-user-nickname');
    localStorage.removeItem('peermall-user-email');
    localStorage.removeItem('peermall-user-profile');
    setIsAuthenticated(false);
    toast({ title: "로그아웃 되었습니다" });
    closeMenu();
  };
  
  const getInitials = () => {
    return userNickname.substring(0, 2) || '사용자';
  };
  
  // Don't render if menu is closed
  if (!isMenuOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed top-16 left-0 w-full bg-gray-900 shadow-lg z-50 border-t border-gray-800 backdrop-blur-sm"
    >
      <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
        {isAuthenticated && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-blue-500/30">
                {profileImage ? (
                  <AvatarImage src={profileImage} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="font-medium text-white">{userNickname}</div>
                <div className="text-xs text-gray-400">{localStorage.getItem('peermall-user-email')}</div>
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  closeMenu();
                  window.location.href = '/user-profile';
                }}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                내 정보 관리
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <nav>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <Home className="h-5 w-5 mr-3 text-blue-500" />
                  <span>홈</span>
                </Link>
              </li>
              
              {!isAuthenticated && (
                <li>
                  <Link to="/login" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                    <User className="h-5 w-5 mr-3 text-blue-500" />
                    <span>로그인</span>
                  </Link>
                </li>
              )}
              
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/user-profile?tab=messages" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                      <Mail className="h-5 w-5 mr-3 text-blue-500" />
                      <span>쪽지함</span>
                      <span className="ml-auto px-1.5 py-0.5 bg-blue-900 text-blue-300 text-xs rounded-full">2</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile?tab=peermall" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                      <Store className="h-5 w-5 mr-3 text-blue-500" />
                      <span>내 피어몰 관리</span>
                    </Link>
                  </li>
                </>
              )}
              
              <li>
                <Link to="/lounge-admin" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <Settings className="h-5 w-5 mr-3 text-blue-500" />
                  <span>관리자</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* 피어몰 그룹 */}
          <Separator className="my-4 bg-gray-800" />
          <p className="px-4 text-xs text-gray-500 uppercase mb-2">피어몰</p>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/personal-lounge" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <Store className="h-5 w-5 mr-3 text-blue-500" />
                  <span>내 피어몰 만들기</span>
                </Link>
              </li>
              <li>
                <Link to="/peermall-list" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <Store className="h-5 w-5 mr-3 text-blue-500" />
                  <span>피어몰 목록</span>
                </Link>
              </li>
              <li>
                <Link to="/qr-generator" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <QrCode className="h-5 w-5 mr-3 text-blue-500" />
                  <span>QR 코드 생성</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* 고객지원 그룹 */}
          <Separator className="my-4 bg-gray-800" />
          <p className="px-4 text-xs text-gray-500 uppercase mb-2">고객지원</p>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/customer-service" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <MessageSquare className="h-5 w-5 mr-3 text-blue-500" />
                  <span>고객센터</span>
                </Link>
              </li>
              <li>
                <Link to="/community" className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300" onClick={closeMenu}>
                  <Users className="h-5 w-5 mr-3 text-blue-500" />
                  <span>커뮤니티</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Notifications section for mobile - only if authenticated */}
          {isAuthenticated && (
            <>
              <Separator className="my-4 bg-gray-800" />
              <p className="px-4 text-xs text-gray-500 uppercase mb-2">알림</p>
              <div className="space-y-2">
                <div className="mx-4 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
                  <div className="p-3 bg-blue-900/20 border-b border-gray-700">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm text-gray-200">새로운 메시지</h4>
                      <span className="text-xs text-gray-500">5분 전</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">admin@peermall.com님이 메시지를 보냈습니다.</p>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm text-gray-200">QR 코드 스캔</h4>
                      <span className="text-xs text-gray-500">1시간 전</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">귀하의 QR 코드가 5회 스캔되었습니다.</p>
                  </div>
                </div>
                <div className="px-4">
                  <Link to="/notifications" className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex justify-center py-2" onClick={closeMenu}>
                    모든 알림 보기
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
