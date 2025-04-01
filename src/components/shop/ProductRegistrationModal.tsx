
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import ProductRegistrationForm from './ProductRegistrationForm';

interface ProductRegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductRegistrationModal: React.FC<ProductRegistrationModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">상품 등록하기</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            피어몰에 판매하거나 소개할 상품 정보를 등록해주세요.
            상품을 등록하면 QR코드가 자동으로 생성됩니다.
          </DialogDescription>
        </DialogHeader>
        <ProductRegistrationForm onSuccessfulSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductRegistrationModal;
