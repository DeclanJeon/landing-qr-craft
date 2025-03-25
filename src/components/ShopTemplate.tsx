import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, ExternalLink, QrCode, ShoppingCart } from 'lucide-react';
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

  // Get shop data from localStorage
  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    const parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
    
    // If there's no shop data or the URLs don't match, shop might not exist
    if (!parsedShopData || (actualShopUrl && parsedShopData.shopUrl !== actualShopUrl)) {
      // Only navigate if we're on a shop page
      if (window.location.pathname.includes('/shop/')) {
        setShopData(null);
      }
    } else {
      setShopData(parsedShopData);
    }
  }, [actualShopUrl]);
  
  // Filter products when selectedCategoryId changes
  useEffect(() => {
    if (selectedCategoryId === 0) {
      // Show all products when no category is selected
      setFilteredProducts(sampleProducts);
    } else {
      // Filter products by selected category
      const filtered = sampleProducts.filter(product => product.categoryId === selectedCategoryId);
      setFilteredProducts(filtered);
    }
  }, [selectedCategoryId]);

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
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
      {/* Shop Header */}
      <ShopHeader shopName={shopData.shopName} shopUrl={actualShopUrl || ''} page={page} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner with Shop Description */}
        <ShopHero shopName={shopData.shopName} description={shopData.shopDescription} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar */}
          <ShopSidebar 
            categories={categories} 
            shopUrl={actualShopUrl} 
            shopData={shopData}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Tabs for different sections */}
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

              {/* Products/Links Tab Content */}
              <TabsContent value="products" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">
                    {selectedCategoryId > 0 
                      ? (categories.find(cat => cat.id === selectedCategoryId)?.name || '상품 목록') 
                      : '추천 상품 및 링크'}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductItem key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 py-8">해당 카테고리에 상품이 없습니다.</p>
                  )}
                </div>
                
                {/* Shopping Cart Note (Link Aggregator) */}
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

              {/* QR Codes Tab Content */}
              <TabsContent value="qrcodes" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">QR 코드 목록</h2>
                  <p className="text-gray-600 mb-4">
                    아래 QR 코드를 스캔하여 각 상품 및 링크에 직접 접근하세요.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <QRCodeDisplay 
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Community Tab Content */}
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

              {/* Support Tab Content */}
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
                          <span>{shopData.email}</span>
                        </li>
                        <li className="flex">
                          <span className="font-medium w-24">연락처:</span>
                          <span>{shopData.contactNumber}</span>
                        </li>
                        <li className="flex">
                          <span className="font-medium w-24">담당자:</span>
                          <span>{shopData.ownerName}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <ShopFooter shopName={shopData.shopName} shopUrl={actualShopUrl || ''} />
    </div>
  );
};

export default ShopTemplate;
