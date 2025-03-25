
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
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">카테고리</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <a 
                href={`/shop/${shopUrl}/category/${category.id}`} 
                className={`flex justify-between items-center hover:text-blue-600 ${selectedCategoryId === category.id ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">{category.count}</span>
              </a>
            </li>
          ))}
          {selectedCategoryId && (
            <li className="mt-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-blue-600 text-sm flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(0);
                }}
              >
                <span>모든 상품 보기</span>
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4">쇼핑몰 정보</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <User className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">대표자</p>
              <p className="text-gray-700">{shopData.ownerName}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Phone className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">연락처</p>
              <p className="text-gray-700">{shopData.contactNumber}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">이메일</p>
              <p className="text-gray-700">{shopData.email}</p>
            </div>
          </li>
          <li className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">주소</p>
              <p className="text-gray-700">{shopData.address}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopSidebar;
