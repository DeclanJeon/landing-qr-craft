
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, ExternalLink, QrCode, ShoppingCart, PlusCircle, Info, Store } from 'lucide-react';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductSection from './shop/ProductSection';
import QRCodeDisplay from './shop/QRCodeDisplay';
import ForumPage from './community/ForumPage';
import GroupChatPage from './community/GroupChatPage';
import ProductItem from './shop/ProductItem';
import { sampleProducts, categories } from '@/constants/sampleData';
import { ShopData, Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import ProductRegistrationModal from './shop/ProductRegistrationModal';

interface ShopTemplateProps {
  shopUrl?: string;
  page?: string;
  categoryId?: number;
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({ shopUrl, page, categoryId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const actualShopUrl = shopUrl || params.shopUrl;
  const categoryParam = categoryId || (params.categoryId ? Number(params.categoryId) : 0);
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categoryParam || 0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("products");
  const [communityTab, setCommunityTab] = useState<string>("forum");
  const { getCartCount } = useCart();
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    const parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
    
    if (!parsedShopData || (actualShopUrl && parsedShopData.shopUrl !== actualShopUrl)) {
      if (window.location.pathname.includes('/shop/')) {
        setShopData(null);
      }
    } else {
      setShopData(parsedShopData);
    }

    const storedProducts = localStorage.getItem('peermall-products');
    if (storedProducts) {
      setLocalProducts(JSON.parse(storedProducts));
    }
  }, [actualShopUrl]);
  
  useEffect(() => {
    const allProducts = [...sampleProducts, ...localProducts];
    
    if (selectedCategoryId === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.categoryId === selectedCategoryId);
      setFilteredProducts(filtered);
    }
  }, [selectedCategoryId, localProducts]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const pageContent = () => {
    if (page === 'about') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">피어몰 소개</h2>
          <div className="prose max-w-none">
            <p className="mb-4">피어몰은 사용자가 쉽게 온라인 쇼핑몰을 만들고 관리할 수 있는 혁신적인 플랫폼입니다.</p>
            <p className="mb-4">다양한 외부 상품과 링크를 한곳에 모아 전시하는 프로모션 랜딩 페이지를 손쉽게 만들 수 있으며, QR 코드 생성, 커뮤니티 기능 등을 통합적으로 제공합니다.</p>
            <h3 className="text-xl font-semibold mt-6 mb-3">주요 기능</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>다양한 상품 및 외부 링크 통합 관리</li>
              <li>자동 QR 코드 생성</li>
              <li>커뮤니티 및 고객 지원 시스템</li>
              <li>사용자 맞춤형 디자인</li>
            </ul>
            <p>피어몰과 함께 당신만의 온라인 비즈니스를 시작해보세요!</p>
          </div>
        </div>
      );
    } else if (page === 'services') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">서비스 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">상품 및 링크 관리</h3>
              <p>다양한 외부 상품과 링크를 한곳에 모아 전시하는 프로모션 랜딩 페이지를 쉽게 만들고 관리할 수 있습니다.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">QR 코드 생성</h3>
              <p>모든 상품과 링크에 대한 QR 코드가 자동으로 생성되어 오프라인에서도 쉽게 접근할 수 있습니다.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">커뮤니티 기능</h3>
              <p>고객들과 소통할 수 있는 다양한 커뮤니티 기능을 제공합니다.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">고객 지원</h3>
              <p>효과적인 고객 지원 시스템을 통해 고객의 문의에 신속하게 대응할 수 있습니다.</p>
            </div>
          </div>
        </div>
      );
    } else if (page === 'qrcodes') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">QR 코드</h2>
          <p className="mb-6">각 상품 및 링크에 대한 QR 코드를 확인하고 다운로드할 수 있습니다.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <QRCodeDisplay key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 py-8">QR 코드를 생성할 상품이 없습니다.</p>
          )}
        </div>
      );
    } else if (page === 'community') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">커뮤니티</h2>
          
          <Tabs defaultValue="forum" value={communityTab} onValueChange={setCommunityTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="forum">포럼</TabsTrigger>
              <TabsTrigger value="groupchat">그룹 채팅</TabsTrigger>
              <TabsTrigger value="voice">음성 채팅</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forum">
              <ForumPage />
            </TabsContent>
            
            <TabsContent value="groupchat">
              <GroupChatPage type="text" />
            </TabsContent>
            
            <TabsContent value="voice">
              <GroupChatPage type="voice" />
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (page === 'support') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">고객 지원</h2>
          <p className="mb-6">질문이나 문제가 있으시면 아래의 방법으로 문의해 주세요.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">이메일 문의</h3>
              <p className="mb-2">평일 9:00 - 18:00 이내 답변</p>
              <a href={`mailto:${shopData?.email || 'support@peermall.com'}`} className="text-blue-600 hover:underline">
                {shopData?.email || 'support@peermall.com'}
              </a>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">전화 문의</h3>
              <p className="mb-2">평일 9:00 - 18:00</p>
              <a href={`tel:${shopData?.contactNumber || '02-123-4567'}`} className="text-blue-600 hover:underline">
                {shopData?.contactNumber || '02-123-4567'}
              </a>
            </div>
          </div>
          
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">자주 묻는 질문</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Q: 배송은 얼마나 걸리나요?</h4>
                <p className="text-gray-700">A: 본 페이지는 외부 링크를 모아두는 프로모션 페이지로, 실제 배송은 각 판매처의 정책을 따릅니다.</p>
              </div>
              <div>
                <h4 className="font-medium">Q: 교환이나 환불은 어떻게 하나요?</h4>
                <p className="text-gray-700">A: 각 상품의 판매처에 직접 문의하시기 바랍니다. 본 페이지는 직접적인 판매를 하지 않습니다.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategoryId > 0 
                  ? (categories.find(cat => cat.id === selectedCategoryId)?.name || '상품 목록') 
                  : '추천 상품 및 링크'}
              </h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => setIsProductModalOpen(true)}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span>상품 등록</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 py-8">해당 카테고리에 상품이 없습니다.</p>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <div className="flex items-start">
              <ShoppingCart className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-blue-700">링크 관심목록 정보</h3>
                <p className="text-sm text-blue-600">
                  이 피어몰은 직접 결제 기능이 없는 프로모션 랜딩 페이지입니다. 
                  관심 상품은 외부 사이트에서 직접 구매하셔야 합니다.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  if (!shopData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">피어몰을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 피어몰이 존재하지 않거나 접근할 수 없습니다.</p>
        <Link to="/personal-lounge">
          <Button>피어몰 만들기로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader shopName={shopData.shopName} shopUrl={actualShopUrl || ''} page={page} />

      <main className="container mx-auto px-4 py-8">
        <ShopHero shopName={shopData.shopName} description={shopData.shopDescription} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <ShopSidebar 
            categories={categories} 
            shopUrl={actualShopUrl} 
            shopData={shopData}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />

          <div className="lg:w-3/4">
            {pageContent()}
          </div>
        </div>
      </main>

      <ProductRegistrationModal 
        open={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        shopUrl={actualShopUrl || ''}
      />

      <ShopFooter shopName={shopData.shopName} shopUrl={actualShopUrl || ''} />
    </div>
  );
};

export default ShopTemplate;
