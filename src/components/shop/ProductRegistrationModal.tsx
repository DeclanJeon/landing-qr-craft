
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; // Corrected hook name
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button"; // Import Button for Drawer footer
import ProductRegistrationForm from './ProductRegistrationForm';

interface ProductRegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductRegistrationModal: React.FC<ProductRegistrationModalProps> = ({ open, onClose }) => {
  const isMobile = useIsMobile(); // Corrected hook usage

  const FormContent = (
    <ProductRegistrationForm onSuccessfulSubmit={onClose} />
  );

  const CommonHeader = (
    <>
      <DialogTitle className="text-2xl">상품 등록하기</DialogTitle>
      <DialogDescription className="text-gray-600 mt-2">
        피어몰에 판매하거나 소개할 상품 정보를 등록해주세요.
        상품을 등록하면 QR코드가 자동으로 생성됩니다.
      </DialogDescription>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh]"> {/* Set max height for scroll */}
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl">상품 등록하기</DrawerTitle>
            <DrawerDescription className="text-gray-600 mt-2">
              피어몰에 판매하거나 소개할 상품 정보를 등록해주세요.
              상품을 등록하면 QR코드가 자동으로 생성됩니다.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto"> {/* Make content scrollable */}
            {FormContent}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop view using Dialog
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {CommonHeader}
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  );
};

export default ProductRegistrationModal;
// Removed duplicated code block that was here
