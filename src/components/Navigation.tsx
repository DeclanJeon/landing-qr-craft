import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Store, Search, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthNavigation from './navigation/AuthNavigation';

interface NavigationProps {
  onOpenCreateModal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenCreateModal }) => {
  console.log("Navigation component rendering");
  
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg py-3 border-b border-gray-800' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 ${isScrolled ? 'scale-90' : 'scale-100'} transition-transform duration-300`}>
                <span className="text-white font-bold text-xl">P</span> 
              </div>
              <span className={`font-bold text-xl ${isScrolled ? 'text-gray-100' : 'text-white'} transition-colors duration-300`}>Peermall</span>
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
                    <Link 
                      to={item.path} 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-blue-400 relative group ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} 
                    >
                      {item.name}
                      <motion.span 
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-400 transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2" 
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
                      className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 z-50" 
                    >
                      <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden bg-gray-800"> 
                        <Search className="h-4 w-4 text-gray-500 ml-3" /> 
                        <input type="text" placeholder="검색어를 입력하세요..." className="w-full p-2 outline-none text-sm bg-transparent text-gray-200 placeholder-gray-500" autoFocus /> 
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">추천 검색어</p>
                        <div className="flex flex-wrap gap-2">
                          {['QR코드', '쇼핑몰', '인증', '커뮤니티'].map((tag) => (
                            <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300 cursor-pointer hover:bg-gray-600">{tag}</span> 
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
                      className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50" 
                    >
                      <div className="p-3 border-b border-gray-700 flex justify-between items-center"> 
                        <h3 className="font-medium text-gray-100">알림</h3> 
                        <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">모두 읽음 표시</span> 
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          { title: "새로운 메시지", desc: "홍길동님이 메시지를 보냈습니다.", time: "5분 전", isNew: true },
                          { title: "QR 코드 스캔", desc: "귀하의 QR 코드가 5회 스캔되었습니다.", time: "1시간 전", isNew: true },
                          { title: "시스템 알림", desc: "시스템 점검이 예정되어 있습니다.", time: "1일 전", isNew: false }
                        ].map((item, i) => (
                          <div key={i} className={`p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 cursor-pointer ${item.isNew ? 'bg-blue-900/30' : ''}`}> 
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm text-gray-200">{item.title}</h4> 
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{item.desc}</p> 
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-700"> 
                        <Link to="/notifications" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">모든 알림 보기</Link> 
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
                
                {/* <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Button
                    onClick={handleOpenCreateModal}
                    className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-5 py-2 border border-blue-500/30 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-indigo-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    <Store className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">내 피어몰 만들기</span>
                  </Button>
                </motion.div> */}
              </motion.div>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={handleMobileMenuToggle} 
              className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'hover:bg-gray-700/50' : 'hover:bg-white/10'}`} 
            >
              {mobileMenuOpen ? 
                <X className={`h-6 w-6 ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} /> : 
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} /> 
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
            className="md:hidden bg-gray-900 border-t border-gray-700 mt-2" 
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {[
                  { name: "홈", path: "/" },
                  { name: "피어몰 목록", path: "/peermall-list" },
                  { name: "QR 생성기", path: "/qr-generator" },
                  // { name: "커뮤니티", path: "/community" },
                  // { name: "고객센터", path: "/customer-service" }
                ].map((item) => (
                  <Link
                    key={item.path} 
                    to={item.path} 
                    className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg" 
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
                
                {/* <Button
                  onClick={handleOpenCreateModal}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full justify-center py-2.5 border border-blue-500/30"
                >
                  <Store className="h-4 w-4" />
                  내 피어몰 만들기
                </Button> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
