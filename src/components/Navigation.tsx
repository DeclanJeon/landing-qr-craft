import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Removed unused Button import
import { Store, Search, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthNavigation from './navigation/AuthNavigation';

interface NavigationProps {
  onOpenCreateModal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenCreateModal }) => {
  // Removed console.log
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
    setNotificationsOpen(false);
  };

  const handleOpenCreateModal = () => {
    setMobileMenuOpen(false);
    onOpenCreateModal();
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-200/80 backdrop-blur-lg shadow-lg py-3 border-b border-border' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              {/* 로고 배경은 유지, 텍스트 색상은 항상 밝게 */}
              <div className={`w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center mr-2 ${isScrolled ? 'scale-90' : 'scale-100'} transition-transform duration-300`}>
                <span className="text-bg-100 font-bold text-xl">P</span>
              </div>
              {/* Peermall 텍스트 색상 항상 text-text-100 사용 */}
              <span className={`font-bold text-xl text-text-100 transition-colors duration-300`}>Peermall</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center"
            >
              <ul className="flex space-x-1">
                {[
                  { name: "홈", path: "/" },
                  { name: "피어몰 목록", path: "/peermall-list" },
                  { name: "QR 생성기", path: "/qr-generator" },
                  // { name: "커뮤니티", path: "/community" },
                  // { name: "고객센터", path: "/customer-service" }
                ].map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    {/* 데스크톱 네비게이션 링크 텍스트 색상 항상 text-text-100 사용 */}
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:text-primary-100 relative group text-text-100`}
                    >
                      {item.name}
                      {/* 호버 밑줄 색상 변경 */}
                      <motion.span
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-100 transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"
                        layout
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <div className="flex items-center ml-6 space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative"
              >
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-2 w-72 bg-bg-100 border border-border rounded-xl shadow-lg p-4 z-50"
                    >
                      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-bg-200">
                        <Search className="h-4 w-4 text-text-200 ml-3" />
                        <input type="text" placeholder="검색어를 입력하세요..." className="w-full p-2 outline-none text-sm bg-transparent text-text-100 placeholder-text-200" autoFocus />
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-text-200 mb-2">추천 검색어</p>
                        <div className="flex flex-wrap gap-2">
                          {['QR코드', '쇼핑몰', '인증', '커뮤니티'].map((tag) => (
                            <span key={tag} className="text-xs bg-bg-200 px-2 py-1 rounded-full text-text-200 cursor-pointer hover:bg-bg-300">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="relative"
              >
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-2 w-80 bg-bg-100 border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-border flex justify-between items-center">
                        <h3 className="font-medium text-text-100">알림</h3>
                        <span className="text-xs text-primary-100 hover:text-primary-200 cursor-pointer">모두 읽음 표시</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          { title: "새로운 메시지", desc: "홍길동님이 메시지를 보냈습니다.", time: "5분 전", isNew: true },
                          { title: "QR 코드 스캔", desc: "귀하의 QR 코드가 5회 스캔되었습니다.", time: "1시간 전", isNew: true },
                          { title: "시스템 알림", desc: "시스템 점검이 예정되어 있습니다.", time: "1일 전", isNew: false }
                        ].map((item, i) => (
                          <div key={i} className={`p-3 border-b border-border last:border-b-0 hover:bg-bg-200 cursor-pointer ${item.isNew ? 'bg-primary-100/10' : ''}`}>
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm text-text-100">{item.title}</h4>
                              <span className="text-xs text-text-200">{item.time}</span>
                            </div>
                            <p className="text-xs text-text-200 mt-1">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-border bg-bg-200">
                        <Link to="/notifications" className="text-sm text-primary-100 hover:text-primary-200 hover:underline">모든 알림 보기</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <AuthNavigation />
                {/* Removed commented out Button */}
              </motion.div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'hover:bg-bg-300/50' : 'hover:bg-bg-100/10'}`}
            >
              {/* 모바일 메뉴 아이콘 색상 항상 text-text-100 사용 */}
              {mobileMenuOpen ?
                <X className={`h-6 w-6 ${isScrolled ? 'text-text-100' : 'text-bg-100'}`} /> :
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-text-100' : 'text-bg-100'}`} />
              }
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-100 border-t border-border mt-2" // Corrected background and border
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {[ // Corrected map structure
                  { name: "홈", path: "/" },
                  { name: "피어몰 목록", path: "/peermall-list" },
                  { name: "QR 생성기", path: "/qr-generator" },
                  // { name: "커뮤니티", path: "/community" },
                  // { name: "고객센터", path: "/customer-service" }
                ].map((item) => ( // Ensure correct JSX within map
                  // 모바일 메뉴 링크 텍스트 색상 변경
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-4 py-2 text-text-100 hover:bg-bg-200 rounded-lg" // 텍스트 색상 변경
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="w-full">
                  <AuthNavigation />
                </div>
                {/* Removed commented out Button */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
