
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import { Category, ShopData } from '@/types/shop';

interface ShopSidebarProps {
  categories: Category[];
  shopUrl?: string;
  shopData: ShopData;
  selectedCategoryId?: number;
  onCategorySelect: (categoryId: number) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ 
  categories, 
  shopUrl, 
  shopData, 
  selectedCategoryId,
  onCategorySelect 
}) => {
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: number) => {
    e.preventDefault();
    onCategorySelect(categoryId);
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <h3 className="font-serif text-xl mb-5 text-gray-800">카테고리</h3>
        <ul className="space-y-3">
          {categories.map(category => (
            <li key={category.id}>
              <a 
                href={`/shop/${shopUrl}/category/${category.id}`} 
                className={`flex justify-between items-center hover:text-blue-600 transition-colors py-1 ${selectedCategoryId === category.id ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                <span>{category.name}</span>
                <span className="text-sm py-0.5 px-2 bg-gray-100 rounded-full text-gray-600">{category.count}</span>
              </a>
            </li>
          ))}
          {selectedCategoryId ? (
            <li className="mt-5 pt-3 border-t border-gray-100">
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 text-sm flex items-center transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(0);
                }}
              >
                <span>모든 상품 보기</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-serif text-xl mb-5 text-gray-800">쇼핑몰 정보</h3>
        <ul className="space-y-5">
          <li className="flex items-start">
            <User className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">대표자</p>
              <p className="text-gray-800">{shopData.ownerName}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">연락처</p>
              <p className="text-gray-800">{shopData.contactNumber}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">이메일</p>
              <p className="text-gray-800 break-words">{shopData.email}</p>
            </div>
          </li>
          <li className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">주소</p>
              <p className="text-gray-800">{shopData.address}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopSidebar;
