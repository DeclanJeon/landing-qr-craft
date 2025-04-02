import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, ExternalLink, QrCode, ShoppingCart, PlusCircle, Settings } from 'lucide-react';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductSection from './shop/ProductSection';
import QRCodeDisplay from './shop/QRCodeDisplay';
import ForumPage from './community/ForumPage';
import GroupChatPage from './community/GroupChatPage';
import ProductItem from './shop/ProductItem';
import ProductDetailPage from './shop/ProductDetailPage';
import ProductRegistrationModal from './shop/ProductRegistrationModal';
import AboutPage from './shop/AboutPage';
import ServicePage from './shop/ServicePage';
import CustomerPeerMalls from './shop/CustomerPeerMalls';
import RecommendedPeerMalls from './shop/RecommendedPeerMalls';
import PeerMalls from './shop/CustomerPeerMalls';
import { sampleProducts, categories } from '@/constants/sampleData';
import { ShopData, Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';

interface ShopTemplateProps {
  shopUrl?: string;
  page?: string;
  categoryId?: number;
  productId?: string;
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({ shopUrl, page, categoryId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const actualShopUrl = shopUrl || params.shopUrl;
  const categoryParam = categoryId || (params.categoryId ? Number(params.categoryId) : 0);
  const productId = params.productId;
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categoryParam || 0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("products");
  const [communityTab, setCommunityTab] = useState<string>("forum");
  const [isProductRegistrationOpen, setIsProductRegistrationOpen] = useState(false);
  const { getCartCount } = useCart();
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  const customerMalls = [
    {
      id: '1',
      userName: '김철수',
      userImageUrl: 'https://placehold.co/100',
      mallName: '철수의 피어몰',
      url: 'chulsu',
      comment: '다양한 제품을 한 곳에서 확인할 수 있어 편리합니다.',
      date: '2023-04-15'
    },
    {
      id: '2',
      userName: '이영희',
      userImageUrl: 'https://placehold.co/100',
      mallName: '영희 컬렉션',
      url: 'younghee',
      comment: '제가 좋아하는 제품들을 모아놓은 컬렉션입니다.',
      date: '2023-05-20'
    },
    {
      id: '3',
      userName: '박지민',
      userImageUrl: 'https://placehold.co/100',
      mallName: '지민의 추천',
      url: 'jimin',
      comment: '제가 직접 사용해보고 좋았던 제품들만 모았습니다.',
      date: '2023-06-10'
    },
    {
      id: '4',
      userName: '최수진',
      userImageUrl: 'https://placehold.co/100',
      mallName: '수진의 쇼핑몰',
      url: 'soojin',
      comment: '트렌디한 제품들을 모아놓은 컬렉션입니다.',
      date: '2023-07-05'
    },
    {
      id: '5',
      userName: '정민준',
      userImageUrl: 'https://placehold.co/100',
      mallName: '민준의 추천',
      url: 'minjun',
      comment: '가성비 좋은 제품들만 엄선했습니다.',
      date: '2023-08-15'
    },
    {
      id: '6',
      userName: '김서연',
      userImageUrl: 'https://placehold.co/100',
      mallName: '서연의 피어몰',
      url: 'seoyeon',
      comment: '고품질 제품들을 소개합니다.',
      date: '2023-09-20'
    },
    {
      id: '7',
      userName: '이준호',
      userImageUrl: 'https://placehold.co/100',
      mallName: '준호의 피어몰',
      url: 'junho',
      comment: '다양한 카테고리의 제품을 확인할 수 있습니다.',
      date: '2023-10-10'
    }
  ];

  const recommendedMalls = [
    {
      id: '1',
      name: '베스트 가전',
      logo: 'https://placehold.co/100',
      url: 'bestelectronics',
      rating: 4.8,
      category: '가전제품',
      products: [
        { id: 101, name: '스마트 TV', price: '599,000원', imageUrl: 'https://placehold.co/300', categoryId: 1, externalUrl: 'https://example.com/tv' },
        { id: 102, name: '무선 청소기', price: '329,000원', imageUrl: 'https://placehold.co/300', categoryId: 1, externalUrl: 'https://example.com/cleaner' },
        { id: 103, name: '에어프라이어', price: '129,000원', imageUrl: 'https://placehold.co/300', categoryId: 1, externalUrl: 'https://example.com/airfryer' },
        { id: 104, name: '로봇 청소기', price: '399,000원', imageUrl: 'https://placehold.co/300', categoryId: 1, externalUrl: 'https://example.com/robotcleaner' }
      ]
    },
    {
      id: '2',
      name: '패션 하우스',
      logo: 'https://placehold.co/100',
      url: 'fashionhouse',
      rating: 4.5,
      category: '패션',
      products: [
        { id: 201, name: '남성 코트', price: '189,000원', imageUrl: 'https://placehold.co/300', categoryId: 2, externalUrl: 'https://example.com/coat' },
        { id: 202, name: '여성 니트', price: '79,000원', imageUrl: 'https://placehold.co/300', categoryId: 2, externalUrl: 'https://example.com/knit' },
        { id: 203, name: '스니커즈', price: '99,000원', imageUrl: 'https://placehold.co/300', categoryId: 2, externalUrl: 'https://example.com/sneakers' },
        { id: 204, name: '가죽 백팩', price: '159,000원', imageUrl: 'https://placehold.co/300', categoryId: 2, externalUrl: 'https://example.com/backpack' }
      ]
    },
    {
      id: '3',
      name: '홈 데코',
      logo: 'https://placehold.co/100',
      url: 'homedeco',
      rating: 4.3,
      category: '인테리어',
      products: [
        { id: 301, name: '북유럽 스타일 쿠션', price: '39,000원', imageUrl: 'https://placehold.co/300', categoryId: 3, externalUrl: 'https://example.com/cushion' },
        { id: 302, name: '원목 테이블 램프', price: '89,000원', imageUrl: 'https://placehold.co/300', categoryId: 3, externalUrl: 'https://example.com/lamp' },
        { id: 303, name: '모던 벽시계', price: '59,000원', imageUrl: 'https://placehold.co/300', categoryId: 3, externalUrl: 'https://example.com/clock' },
        { id: 304, name: '패브릭 러그', price: '129,000원', imageUrl: 'https://placehold.co/300', categoryId: 3, externalUrl: 'https://example.com/rug' }
      ]
    },
    {
      id: '4',
      name: '베이커리 숍',
      logo: 'https://placehold.co/100',
      url: 'bakery',
      rating: 4.7,
      category: '식품',
      products: [
        { id: 401, name: '크로와상', price: '4,500원', imageUrl: 'https://placehold.co/300', categoryId: 4, externalUrl: 'https://example.com/croissant' },
        { id: 402, name: '소금빵', price: '3,200원', imageUrl: 'https://placehold.co/300', categoryId: 4, externalUrl: 'https://example.com/saltbread' },
        { id: 403, name: '초코 머핀', price: '3,800원', imageUrl: 'https://placehold.co/300', categoryId: 4, externalUrl: 'https://example.com/muffin' },
        { id: 404, name: '바게트', price: '4,000원', imageUrl: 'https://placehold.co/300', categoryId: 4, externalUrl: 'https://example.com/baguette' }
      ]
    }
  ];

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
    } else {
      setLocalProducts([]);
    }
  }, [actualShopUrl]);
  
  useEffect(() => {
    if (selectedCategoryId === 0) {
      setFilteredProducts(localProducts);
    } else {
      const filtered = localProducts.filter(product => product.categoryId === selectedCategoryId);
      setFilteredProducts(filtered);
    }
  }, [selectedCategoryId, localProducts]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const openProductRegistration = () => {
    setIsProductRegistrationOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = localProducts.filter(product => product.id !== productId);
    setLocalProducts(updatedProducts);
    localStorage.setItem('peermall-products', JSON.stringify(updatedProducts));
    const storedQRCodes = localStorage.getItem('peermall-qrcodes');
    if (storedQRCodes) {
      const qrCodes = JSON.parse(storedQRCodes);
      const productToDelete = localProducts.find(p => p.id === productId);
      if (productToDelete) {
        const updatedQRCodes = qrCodes.filter((qr: any) => qr.name !== productToDelete.name);
        localStorage.setItem('peermall-qrcodes', JSON.stringify(updatedQRCodes));
      }
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

  const renderContent = () => {
    if (productId) {
      return <ProductDetailPage />;
    }
    
    if (page === 'about') {
      return <AboutPage shopData={shopData} />;
    }

    if (page === 'service') {
      return <ServicePage shopData={shopData} />;
    }

    return (
      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">상품 및 링크</span>
          </TabsTrigger>
          <TabsTrigger value="qrcodes" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            <span className="hidden sm:inline">QR 코드</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">커뮤니티</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">고객지원</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategoryId > 0 
                  ? (categories.find(cat => cat.id === selectedCategoryId)?.name || '상품 목록') 
                  : '추천 상품 및 링크'}
              </h2>
              <Button variant="outline" size="sm" className="flex items-center" onClick={openProductRegistration}>
                <PlusCircle className="h-4 w-4 mr-1" />
                <span>상품 등록</span>
              </Button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="cursor-pointer" onClick={() => navigate(`/shop/${actualShopUrl}/product/${product.id}`)}>
                    <ProductItem 
                      product={product} 
                      onDelete={handleDeleteProduct}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 상품이 없습니다</h3>
                <p className="text-gray-500 mb-4">상품을 등록하여 고객에게 소개해보세요.</p>
                <Button onClick={openProductRegistration} className="flex items-center">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  상품 등록하기
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
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
        </TabsContent>

        <TabsContent value="qrcodes" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">QR 코드 목록</h2>
            <p className="text-gray-600 mb-4">
              아래 QR 코드를 스캔하여 각 상품 및 링크에 직접 접근하세요.
            </p>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <QRCodeDisplay 
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 QR 코드가 없습니다</h3>
                <p className="text-gray-500 mb-4">상품을 등록하면 자동으로 QR 코드가 생성됩니다.</p>
                <Button onClick={openProductRegistration} className="flex items-center">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  상품 등록하기
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Tabs defaultValue="forum" value={communityTab} onValueChange={setCommunityTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="forum" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>포럼 & 게시판</span>
                </TabsTrigger>
                <TabsTrigger value="groupchat" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>그룹 채팅</span>
                </TabsTrigger>
                <TabsTrigger value="voicechat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>음성 채팅</span>
                </TabsTrigger>
                <TabsTrigger value="videochat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>화상 채팅</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forum">
                <ForumPage />
              </TabsContent>

              <TabsContent value="groupchat">
                <GroupChatPage type="text" />
              </TabsContent>

              <TabsContent value="voicechat">
                <GroupChatPage type="voice" />
              </TabsContent>

              <TabsContent value="videochat">
                <GroupChatPage type="video" />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">고객 지원</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">자주 묻는 질문</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">피어몰은 어떤 서비스인가요?</h4>
                  <p className="text-gray-600 mt-2">
                    피어몰은 다양한 외부 상품과 링크를 한곳에 모아 전시하는 프로모션 랜딩 페이지입니다.
                    직접적인 결제 시스템은 없으며, 상품 구매는 연결된 외부 사이트에서 이루어집니다.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">QR 코드는 어떻게 사용하나요?</h4>
                  <p className="text-gray-600 mt-2">
                    각 상품과 링크에 자동으로 생성된 QR 코드를 스캔하면 해당 외부 사이트로 바로 이동할 수 있습니다.
                    이를 통해 오프라인에서도 손쉽게 온라인 콘텐츠에 접근할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">문의하기</h3>
              <p className="text-gray-600 mb-4">
                추가 질문이나 도움이 필요하시면 아래 연락처로 문의해주세요.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-24">이메일:</span>
                    <span>{shopData?.email}</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-24">연락처:</span>
                    <span>{shopData?.contactNumber}</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-24">담당자:</span>
                    <span>{shopData?.ownerName}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader shopName={shopData?.shopName || ''} shopUrl={actualShopUrl || ''} page={page} />

      <ProductRegistrationModal 
        open={isProductRegistrationOpen} 
        onClose={() => setIsProductRegistrationOpen(false)} 
      />

      <main className="container mx-auto px-4 py-8">
        {page !== 'about' && page !== 'service' && !productId && (
          <ShopHero shopName={shopData?.shopName || ''} description={shopData?.shopDescription} />
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full">
            {renderContent()}
          </div>
        </div>
        
        {(!page || page === 'home') && !productId && (
          <div className="mt-12">
            <CustomerPeerMalls customerMalls={customerMalls} recommendedMalls={recommendedMalls} />
          </div>
        )}
      </main>

      <ShopFooter 
        shopName={shopData?.shopName || ''} 
        shopUrl={actualShopUrl || ''} 
        shopData={shopData || undefined}
      />
    </div>
  );
};

export default ShopTemplate;
