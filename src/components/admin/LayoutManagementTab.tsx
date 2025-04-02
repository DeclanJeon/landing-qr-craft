
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

const LayoutManagementTab: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">레이아웃 관리</h2>
      <p className="text-gray-600 mb-6">
        드래그 앤 드롭으로 페이지 섹션의 순서를 변경할 수 있습니다. 각 요소를 클릭하여 세부 설정을 변경하세요.
      </p>
      
      <div className="space-y-4">
        <Card className="cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">헤더 섹션</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">히어로 섹션</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">상품 섹션</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">피어몰 리스트</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">푸터 섹션</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-600">
          드래그 앤 드롭 기능은 현재 구현 중입니다. 곧 업데이트될 예정입니다.
        </p>
      </div>
    </div>
  );
};

export default LayoutManagementTab;
