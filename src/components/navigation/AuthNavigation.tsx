
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const AuthNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication status whenever component renders
    const checkAuth = () => {
      const auth = localStorage.getItem('peermall-user-authenticated') === 'true';
      setIsAuthenticated(auth);
      
      if (auth) {
        setUserNickname(localStorage.getItem('peermall-user-nickname') || '사용자');
        setProfileImage(localStorage.getItem('peermall-user-profile') || null);
      }
    };
    
    checkAuth();
    
    // Add event listener for storage changes (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'peermall-user-authenticated') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up an interval to periodically check auth status
    const intervalId = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('peermall-user-authenticated');
    localStorage.removeItem('peermall-user-nickname');
    localStorage.removeItem('peermall-user-email');
    localStorage.removeItem('peermall-user-profile');
    toast({ title: "로그아웃 되었습니다" });
    setIsAuthenticated(false);
    // Instead of using useNavigate, we'll reload the page to reset state
    window.location.href = '/';
  };
  
  const getInitials = () => {
    return userNickname.substring(0, 2) || '사용자';
  };
  
  if (isAuthenticated) {
    return (
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="h-8 w-8 border-2 border-blue-500/30 cursor-pointer hover:opacity-90 transition-all duration-200">
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
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300">
              <LogOut className="h-4 w-4 mr-2" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  
  return (
    <Link to="/login">
      <Button 
        variant="secondary"
        className="rounded-full text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 px-4 py-1.5"
      >
        로그인
      </Button>
    </Link>
  );
};

export default AuthNavigation;
