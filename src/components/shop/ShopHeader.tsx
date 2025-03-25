
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopHeaderProps {
  shopName: string;
  shopUrl: string;
  page?: string;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopName, shopUrl, page }) => {
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
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <Link to={`/shop/${shopUrl}/home`} className={`font-medium ${(!page || page === 'home') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>홈</Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/products`} className={`font-medium ${page === 'products' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>상품</Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/new`} className={`font-medium ${page === 'new' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>신상품</Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/best`} className={`font-medium ${page === 'best' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>베스트</Link>
            </li>
            <li>
              <Link to={`/shop/${shopUrl}/about`} className={`font-medium ${page === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>소개</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;
