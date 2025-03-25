
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Home, Users, Info, Settings, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from './Cart';
import ProductRegistrationModal from './ProductRegistrationModal';

interface ShopHeaderProps {
  shopName: string;
  shopUrl: string;
  page?: string;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopName, shopUrl, page }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to={`/shop/${shopUrl}/home`} className="text-2xl font-bold text-blue-600">
            {shopName}
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="상품 검색..."
                className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Cart />
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex space-x-6 overflow-x-auto pb-2">
            <li>
              <Link to={`/shop/${shopUrl}/home`} className={`flex items-center font-medium ${(!page || page === 'home') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <Home className="h-4 w-4 mr-1 md:mr-2" />
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/about`} className={`flex items-center font-medium ${page === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <Info className="h-4 w-4 mr-1 md:mr-2" />
                <span>소개</span>
              </Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/services`} className={`flex items-center font-medium ${page === 'services' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                <Store className="h-4 w-4 mr-1 md:mr-2" />
                <span>서비스</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Product Registration Modal */}
      <ProductRegistrationModal 
        open={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        shopUrl={shopUrl}
      />
    </header>
  );
};

export default ShopHeader;
