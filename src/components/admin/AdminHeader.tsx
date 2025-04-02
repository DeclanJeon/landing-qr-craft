
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface AdminHeaderProps {
  shopName: string;
  shopUrl: string;
  onSaveChanges: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ shopName, shopUrl, onSaveChanges }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to={`/shop/${shopUrl}/home`} className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>돌아가기</span>
            </Link>
            <h1 className="text-xl font-bold">{shopName} 관리자 페이지</h1>
          </div>
          <Button onClick={onSaveChanges} className="flex items-center bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            <span>변경사항 저장</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
