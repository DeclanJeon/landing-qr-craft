import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Store, Search, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Remove modal import if it's rendered in the parent
// import PeermallCreateModal from './PeermallCreateModal';

interface NavigationProps {
  onOpenCreateModal: () => void; // Add prop type
}

const Navigation: React.FC<NavigationProps> = ({ onOpenCreateModal }) => { // Use prop
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Remove modal state: const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle handlers to prevent multiple overlays
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

  // Use the passed-in prop to open the modal
  const handleOpenCreateModal = () => {
    setMobileMenuOpen(false); // Close mobile menu if open
    onOpenCreateModal(); // Call the prop function
  };

  return (
    <> {/* Keep fragment if needed, or remove if modal is outside */}
      {/* Updated background transition for dark theme */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg py-3 border-b border-gray-800' : 'bg-transparent py-5'}`}> {/* Header content... */}
        <div className="container mx-auto px-6"> {/* Adjusted padding to match Index */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 ${isScrolled ? 'scale-90' : 'scale-100'} transition-transform duration-300`}>
                  {/* Logo color adjusted slightly */}
                  <span className="text-white font-bold text-xl">P</span> 
                </div>
                 {/* Text color updated for dark theme */}
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
                        // Updated text color, hover effect for dark theme
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-blue-400 relative group ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} 
                      >
                        {item.name}
                        {/* Updated hover underline color */}
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
                {/* Search Button */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="relative"
                >
                  <button 
                    onClick={handleSearchToggle} 
                    // Updated hover background and icon color for dark theme
                    className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'hover:bg-gray-700/50' : 'hover:bg-white/10'}`} 
                  >
                    <Search className={`h-5 w-5 ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} /> 
                  </button>
                  <AnimatePresence>
                    {searchOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        // Dark theme for search dropdown
                        className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 z-50" 
                      >
                        {/* Search content - dark theme */}
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

                {/* Notifications Button */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="relative"
                >
                  <button 
                    onClick={handleNotificationsToggle} 
                    // Updated hover background and icon color for dark theme
                    className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'hover:bg-gray-700/50' : 'hover:bg-white/10'}`} 
                  >
                    <div className="relative">
                      <Bell className={`h-5 w-5 ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`} /> 
                      {/* Adjusted notification dot border for dark theme */}
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-black"></span> 
                    </div>
                  </button>
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        // Dark theme for notifications dropdown
                        className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50" 
                      >
                        {/* Notifications content - dark theme */}
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

                {/* Auth Buttons */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <Link to="/login">
                     {/* Updated Login button style for better visibility */}
                    <Button 
                      variant="secondary" // Use secondary variant or define custom style
                      className={`rounded-full text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 px-4 py-1.5`} // Example: Light background, dark text
                    >
                      로그인
                    </Button>
                  </Link>
                  {/* Changed Link to Button for Modal */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                     {/* Updated Create button style for dark theme */}
                    <Button
                      onClick={handleOpenCreateModal} // Use the new handler
                      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 px-5 py-2"
                    >
                      <Store className="h-4 w-4" />
                      내 피어몰 만들기
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={handleMobileMenuToggle} 
                // Updated hover background and icon color for dark theme
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

        {/* Mobile Menu - Dark Theme */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              // Dark theme for mobile menu
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
                      // Dark theme link styles
                      className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg" 
                      onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 flex flex-col space-y-2">
                  <Link to="/login" className="w-full">
                     {/* Dark theme login button - Mobile */}
                    <Button 
                      variant="secondary" // Use secondary variant or define custom style
                      className="w-full justify-center rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300" // Example: Light background, dark text
                      onClick={() => setMobileMenuOpen(false)} // Close menu
                    >
                      로그인
                    </Button>
                  </Link>
                  {/* Changed Link to Button for Modal */}
                   {/* Dark theme create button */}
                  <Button
                    onClick={handleOpenCreateModal} // Use the new handler
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-full justify-center py-2.5"
                  >
                    <Store className="h-4 w-4" />
                    내 피어몰 만들기
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Remove modal rendering from here */}
      {/* <PeermallCreateModal open={isCreateModalOpen} onClose={closeCreateModal} /> */}
    </>
  );
};

export default Navigation;
