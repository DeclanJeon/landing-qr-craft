
import React, { useState, useEffect } from 'react';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import NavLogo from './navigation/NavLogo';
import MobileMenuButton from './navigation/MobileMenuButton';
import StartButton from './navigation/StartButton';
import Cart from './shop/Cart';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLogo />
        <DesktopNavigation />
        <div className="flex items-center space-x-3">
          <Link to="/product-registration">
            <Button variant="outline" size="sm" className="hidden md:flex items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              <span>상품 등록</span>
            </Button>
          </Link>
          <Cart />
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
        <MobileNavigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        <StartButton />
      </div>
    </header>
  );
};

export default Navigation;
