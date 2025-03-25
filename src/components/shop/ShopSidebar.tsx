
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, User } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  count: number;
}

interface ShopSidebarProps {
  categories: Category[];
  shopUrl?: string;
  shopData: {
    ownerName: string;
    contactNumber: string;
    email: string;
    address: string;
  };
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ categories, shopUrl, shopData }) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">카테고리</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/shop/${shopUrl}/category/${category.id}`} className="flex justify-between items-center text-gray-700 hover:text-blue-600">
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">{category.count}</span>
              </Link>
            </li>
          ))}
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
