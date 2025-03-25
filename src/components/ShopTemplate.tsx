
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, PlusCircle } from 'lucide-react';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductSection from './shop/ProductSection';
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
    } else {
      return (
        <>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Tabs for different product sections */}
            <Tabs defaultValue="products" className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">상품 및 링크</TabsTrigger>
                <TabsTrigger value="qrcodes">QR 코드</TabsTrigger>
                <TabsTrigger value="community">커뮤니티</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
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
              </TabsContent>

              <TabsContent value="qrcodes">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">QR 코드</h2>
                  <p className="text-gray-600">각 상품 및 링크에 대한 QR 코드를 확인하고 다운로드할 수 있습니다.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="bg-gray-100 p-4 flex justify-center rounded-md">
                        {/* QR 코드 자리 */}
                        <div className="w-32 h-32 border flex items-center justify-center">
                          QR Code
                        </div>
                      </div>
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 text-sm mt-2 justify-end"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span>링크</span>
                      </a>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">커뮤니티</h2>
                  <p className="text-gray-600">고객들과 자유롭게 소통할 수 있는 공간입니다.</p>
                </div>
                
                <div className="border p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">게시판</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-gray-500">아직 게시글이 없습니다. 첫 번째 게시글을 작성해보세요!</p>
                    </div>
                    <Button className="w-full">게시글 작성</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <div className="flex items-start">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
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
