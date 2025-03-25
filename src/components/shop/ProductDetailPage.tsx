
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Heart,
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
                  <Truck className="h-4 w-4 mr-2" />
                  <span>유통사: {product.distributor}</span>
                </div>
              )}
              {product.manufacturer && (
                <div className="flex items-center text-sm text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
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
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
            <p>이 상품은 외부 판매자의 상품입니다. 구매 시 판매자의 웹사이트로 이동합니다.</p>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="details">제품 정보</TabsTrigger>
            <TabsTrigger value="shipping">배송 정보</TabsTrigger>
            <TabsTrigger value="reviews">구매 후기</TabsTrigger>
            <TabsTrigger value="support">고객 지원</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-6">
            <h3 className="text-lg font-medium mb-4">제품 상세 정보</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                {product.description || "제품에 대한 상세 정보가 제공되지 않았습니다."}
              </p>
              {product.manufacturer && (
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">제조사 정보</h4>
                    <p className="text-gray-700">{product.manufacturer}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="py-6">
            <h3 className="text-lg font-medium mb-4">배송 안내</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <h4 className="font-medium">배송 정책</h4>
                  <p className="text-gray-700">
                    {product.distributor 
                      ? `${product.distributor}에서 배송을 담당합니다.` 
                      : "판매자 웹사이트의 배송 정책을 참고해주세요."}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <h3 className="text-lg font-medium mb-4">구매 후기</h3>
            <p className="text-gray-600">아직 등록된 구매 후기가 없습니다.</p>
          </TabsContent>
          
          <TabsContent value="support" className="py-6">
            <h3 className="text-lg font-medium mb-4">고객 지원</h3>
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <h4 className="font-medium">문의하기</h4>
                <p className="text-gray-700">
                  제품에 대한 문의사항은 판매자에게 직접 문의해주세요.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailPage;
