
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ExternalLink, QrCode, MessageSquare, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from './Cart';

interface ShopHeaderProps {
  shopName: string;
  shopUrl: string;
  logoUrl?: string; // Add optional logoUrl prop
  page?: string;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopName, shopUrl, logoUrl, page }) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Link wrapping logo or name */}
          <Link to={`/shop/${shopUrl}/home`} className="flex items-center group">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${shopName} Logo`} 
                className="max-h-10 mr-2 transition-opacity duration-300 group-hover:opacity-80" // Adjust max-h as needed
                onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
              />
            ) : (
              <span className="text-2xl font-serif font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {shopName}
              </span>
            )}
          </Link>
          <div className="flex items-center space-x-1 md:space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="상품 검색..."
                className="px-4 py-2 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-60 bg-gray-50 focus:bg-white transition-all duration-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Link to={`/shop/${shopUrl}/admin`}>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full" title="관리 페이지">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-gray-600" />
            </Button>
            <Cart />
          </div>
        </div>
        
        <nav className="mt-5">
          <ul className="flex space-x-6 overflow-x-auto pb-1 border-b border-gray-100">
            <li>
              <Link to={`/shop/${shopUrl}/home`} className={`flex items-center font-medium transition-colors pb-3 ${(!page || page === 'home') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <ExternalLink className="h-4 w-4 mr-1 md:mr-2" />
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/about`} className={`flex items-center font-medium transition-colors pb-3 ${page === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <QrCode className="h-4 w-4 mr-1 md:mr-2" />
                <span>소개</span>
              </Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/service`} className={`flex items-center font-medium transition-colors pb-3 ${page === 'service' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <Users className="h-4 w-4 mr-1 md:mr-2" />
                <span>서비스</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;
