
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductRegistrationForm from './ProductRegistrationForm';

interface ProductRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  shopUrl: string;
}

const ProductRegistrationModal: React.FC<ProductRegistrationModalProps> = ({ 
  open, 
  onClose,
  shopUrl
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">상품 등록</DialogTitle>
        </DialogHeader>
        <ProductRegistrationForm onComplete={onClose} shopUrl={shopUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductRegistrationModal;
