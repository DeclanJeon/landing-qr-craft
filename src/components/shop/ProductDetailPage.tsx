
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Heart,
  Share,
  ShieldCheck,
  Shield,
  Truck,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from localStorage and sample data
    const fetchProduct = () => {
      setIsLoading(true);
      
      // Get stored products from localStorage
      const storedProducts = localStorage.getItem('peermall-products');
      const localProducts = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Import sampleProducts dynamically
      import('@/constants/sampleData').then(({ sampleProducts }) => {
        // Combine local and sample products
        const allProducts = [...sampleProducts, ...localProducts];
        
        // Find the product with the matching ID
        const foundProduct = allProducts.find(p => p.id.toString() === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        }
        
        setIsLoading(false);
      });
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBuyNow = () => {
    if (product?.externalUrl) {
      window.open(product.externalUrl, '_blank');
      toast({
        title: "외부 사이트로 이동합니다",
        description: "판매자의 사이트에서 구매를 완료해주세요.",
      });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "상품이 장바구니에 추가되었습니다",
        description: `${product.name}이(가) 관심목록에 추가되었습니다.`,
      });
    }
  };

  // New functions for the added buttons
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
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
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Back button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        돌아가기
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full rounded-md object-contain"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <Heart className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <Share className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        {/* Product Information */}
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
          
          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mb-8">
            <Button className="w-full" size="lg" onClick={handleBuyNow}>
              바로 구매하기
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleAddToCart}>
              장바구니에 담기
            </Button>
          </div>
          
          {/* New Information Buttons */}
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
      </div>
    </div>
  );
};

export default ProductDetailPage;
