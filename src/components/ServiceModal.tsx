import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ServiceModalProps {
  service: {
    id: string;
    name: string;
    description: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  // 서비스 ID에 따라 다른 UI 렌더링
  const renderServiceContent = () => {
    switch(service.id) {
      case 'create-mall':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">피어몰 생성 단계</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>기본 정보 입력 (스토어 이름, 카테고리)</li>
              <li>디자인 테마 선택</li>
              <li>상품 등록 (이미지, 가격, 설명)</li>
              <li>결제 시스템 연결</li>
            </ol>
            <Button className="w-full mt-4">시작하기</Button>
          </div>
        );
      case 'generate-number':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-bg-200 rounded-lg">
              <p className="text-center text-2xl font-mono">PM-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            </div>
            <p className="text-sm">이 고유 번호로 고객과 직접 연결됩니다.</p>
            <Button className="w-full">번호 생성하기</Button>
          </div>
        );
      case 'build-community':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-100"></div>
              <input 
                type="text" 
                placeholder="커뮤니티 이름 입력" 
                className="flex-1 p-2 border rounded"
              />
            </div>
            <textarea 
              placeholder="커뮤니티 설명 (예: 이 커뮤니티는 ___을 위한 공간입니다)"
              className="w-full p-2 border rounded min-h-[100px]"
            />
            <Button className="w-full">커뮤니티 만들기</Button>
          </div>
        );
      case 'direct-communication':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-bg-200 rounded-lg">
              <p className="text-center">고객의 피어몰 번호를 입력해 연결하세요</p>
              <input 
                type="text" 
                placeholder="PM-XXXXXX"
                className="w-full p-2 mt-2 border rounded text-center"
              />
            </div>
            <Button className="w-full">연결 시작</Button>
          </div>
        );
      default:
        return <div>{service.description}</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {service.name}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        {renderServiceContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
