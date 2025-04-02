import React from 'react';
import { 
  ShieldCheck, 
  Shield, 
  Truck, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { toast } from '@/hooks/use-toast';
import CustomerServiceButton from './CustomerServiceButton';

interface ProductInfoProps {
  product: Product;
  handleBuyNow: () => void;
  handleAddToCart: () => void;
  handleConsultChat: () => void;
  handleConsultVoice: () => void;
  handleConsultVideo: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  handleBuyNow,
  handleAddToCart,
  handleConsultChat,
  handleConsultVoice,
  handleConsultVideo
}) => {
  const handleAuthenticity = () => {
    toast({
      title: "진품 인증 정보",
      description: "이 제품은 공식 인증기관을 통해 진품 확인이 가능합니다.",
    });
  };

  const handleOwnership = () => {
    toast({
      title: "소유권 인증 정보",
      description: "블록체인 기반 소유권 증명 서비스를 제공합니다.",
    });
  };

  const handleShipping = () => {
    toast({
      title: "배송 정보",
      description: "주문 후 1-3일 이내 출고되며, 택배사에 따라 배송일이 달라질 수 있습니다.",
    });
  };

  const handleProductInfo = () => {
    toast({
      title: "제품 정보",
      description: "상세 제품정보 및 사양을 확인하실 수 있습니다.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}</p>
      
      {(product.distributor || product.manufacturer) && (
        <div className="mb-6 space-y-2">
          {product.distributor && (
            <div className="flex items-center text-sm text-gray-600">
              <span>유통사: {product.distributor}</span>
            </div>
          )}
          {product.manufacturer && (
            <div className="flex items-center text-sm text-gray-600">
              <span>제조사: {product.manufacturer}</span>
            </div>
          )}
        </div>
      )}
      
      {product.description && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">상품 설명</h3>
          <p className="text-gray-700">{product.description}</p>
        </div>
      )}
      
      <div className="flex flex-col space-y-4 mb-8">
        <Button className="w-full" size="lg" onClick={handleBuyNow}>
          바로 구매하기
        </Button>
        <Button variant="outline" className="w-full" size="lg" onClick={handleAddToCart}>
          장바구니에 담기
        </Button>
        
        <CustomerServiceButton 
          onChatConsult={handleConsultChat}
          onVoiceConsult={handleConsultVoice}
          onVideoConsult={handleConsultVideo}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-6">
        <Button variant="outline" onClick={handleAuthenticity} className="flex items-center justify-start">
          <ShieldCheck className="h-4 w-4 mr-2" />
          진품 인증
        </Button>
        <Button variant="outline" onClick={handleOwnership} className="flex items-center justify-start">
          <Shield className="h-4 w-4 mr-2" />
          소유권 인증
        </Button>
        <Button variant="outline" onClick={handleShipping} className="flex items-center justify-start">
          <Truck className="h-4 w-4 mr-2" />
          배송 정보
        </Button>
        <Button variant="outline" onClick={handleProductInfo} className="flex items-center justify-start">
          <FileText className="h-4 w-4 mr-2" />
          제품 정보
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <p>이 상품은 외부 판매자의 상품입니다. 구매 시 판매자의 웹사이트로 이동합니다.</p>
      </div>
    </div>
  );
};

export default ProductInfo;
