
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">상품을 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-6">요청하신 상품 정보가 존재하지 않거나 삭제되었습니다.</p>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        돌아가기
      </Button>
    </div>
  );
};

export default NotFoundState;
