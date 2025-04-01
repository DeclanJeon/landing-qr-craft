
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import PeermallShopForm from './PeermallShopForm';

interface PeermallCreateModalProps {
  open: boolean;
  onClose: () => void;
}

const PeermallCreateModal: React.FC<PeermallCreateModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">내 피어몰 시작하기</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            피어몰은 다양한 외부 상품과 링크를 한곳에 모아 전시하는 프로모션 랜딩 페이지입니다.
            아래 정보를 입력하여 몇 분 안에 나만의 피어몰을 만들어보세요.
          </DialogDescription>
        </DialogHeader>
        <PeermallShopForm onSuccessfulSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default PeermallCreateModal;
