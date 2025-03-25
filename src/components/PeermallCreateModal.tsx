
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">내 피어몰 시작하기</DialogTitle>
          <DialogDescription>
            아래 정보를 입력하여 몇 분 안에 나만의 온라인 스토어를 만들어보세요.
          </DialogDescription>
        </DialogHeader>
        <PeermallShopForm onSuccessfulSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default PeermallCreateModal;
