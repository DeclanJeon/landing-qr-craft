
import React from 'react';
import { ShopData } from '@/types/shop';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopHero from '@/components/shop/ShopHero';
import ShopFooter from '@/components/shop/ShopFooter';

// Ensure the theme settings are properly initialized with default values
const defaultThemeSettings = {
  primaryColor: '#3B82F6',
  secondaryColor: '#6366F1',
  fontFamily: 'system-ui, sans-serif',
  borderRadius: 'rounded-lg',
  skin: 'default',
  accentColor: '#F59E0B',
  textColor: '#111827',
  cardStyle: 'shadow',
  buttonStyle: 'filled',
  headerStyle: 'classic',
  luxuryEffects: true,
  animations: 'subtle'
};

interface LuxuryTemplateProps {
  shopData: ShopData;
  page?: string;
  // Add other props as needed
}

const LuxuryTemplate: React.FC<LuxuryTemplateProps> = ({ shopData, page = 'home' }) => {
  // Use the theme settings with proper fallback
  const themeSettings = shopData?.themeSettings || defaultThemeSettings;
  
  return (
    <div className="luxury-template" 
      style={{ 
        '--primary-color': themeSettings.primaryColor,
        '--secondary-color': themeSettings.secondaryColor,
        '--font-family': themeSettings.fontFamily,
        '--text-color': themeSettings.textColor || '#111827'
      } as React.CSSProperties}
    >
      {/* Header Section */}
      <ShopHeader 
        shopName={shopData.shopName}
        shopUrl={shopData.shopUrl || ''}
        logoUrl={shopData.logoUrl}
        logoText={shopData.logoText}
        logoTextStyle={shopData.logoTextStyle}
        page={page}
      />

      {/* Hero Section - Only shown on the home page */}
      {page === 'home' && shopData.heroSettings && (
        <ShopHero 
          shopName={shopData.shopName}
          description={shopData.shopDescription || ''}
          settings={shopData.heroSettings}
        />
      )}

      {/* Premium Collections Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-medium text-gray-800">
            프리미엄 컬렉션
          </h2>
          <div className="flex items-center space-x-4">
            <span className="h-[1px] w-24 bg-gray-300"></span>
            <span className="text-gray-500 text-sm uppercase tracking-wider">Curated Selection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Premium Collection Card 1 */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src="/lovable-uploads/4f55e5d0-3fb9-4d4c-8be3-5f63048cbaf9.png"
                alt="Premium Leather Goods" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">럭셔리 가죽 컬렉션</h3>
              <p className="text-gray-600 mb-4">장인정신이 깃든 최고급 가죽 제품을 만나보세요.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">32 제품</span>
                <button className="text-blue-600 text-sm font-medium group-hover:underline">컬렉션 보기</button>
              </div>
            </div>
          </div>

          {/* Premium Collection Card 2 */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=2070&auto=format&fit=crop"
                alt="Exclusive Watches" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium mb-2 group-hover:text-amber-600 transition-colors">명품 시계 컬렉션</h3>
              <p className="text-gray-600 mb-4">시간을 초월한 가치를 지닌 최고급 시계를 만나보세요.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">18 제품</span>
                <button className="text-amber-600 text-sm font-medium group-hover:underline">컬렉션 보기</button>
              </div>
            </div>
          </div>

          {/* Premium Collection Card 3 */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2004&auto=format&fit=crop"
                alt="Luxury Fragrances" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium mb-2 group-hover:text-purple-600 transition-colors">프리미엄 향수 컬렉션</h3>
              <p className="text-gray-600 mb-4">당신만의 감성을 표현할 특별한 향기를 찾아보세요.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">24 제품</span>
                <button className="text-purple-600 text-sm font-medium group-hover:underline">컬렉션 보기</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Visual Showcase */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-4">EXCLUSIVE</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">
                시선을 사로잡는<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  특별한 컬렉션
                </span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                독창적인 디자인과 뛰어난 품질로 당신의 라이프스타일을 한 단계 업그레이드 해보세요.
                한정 수량으로 제공되는 특별한 기회를 놓치지 마세요.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">프리미엄 소재</h3>
                    <p className="text-gray-600 text-sm">엄선된 최고급 소재만을 사용합니다.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">장인정신</h3>
                    <p className="text-gray-600 text-sm">수십 년의 경험을 가진 장인이 제작합니다.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">품질 보증</h3>
                    <p className="text-gray-600 text-sm">모든 제품은 품질 보증서가 함께 제공됩니다.</p>
                  </div>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                컬렉션 둘러보기
              </button>
            </div>
            
            {/* Visual Product Showcase */}
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
                      alt="Product 1" 
                      className="rounded-lg h-48 w-full object-cover"
                    />
                    <div className="mt-3">
                      <h4 className="font-medium">프리미엄 시계</h4>
                      <p className="text-blue-600 font-medium">₩780,000</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
                      alt="Product 2" 
                      className="rounded-lg h-40 w-full object-cover"
                    />
                    <div className="mt-3">
                      <h4 className="font-medium">미니멀 선글라스</h4>
                      <p className="text-blue-600 font-medium">₩235,000</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057&auto=format&fit=crop" 
                      alt="Product 3" 
                      className="rounded-lg h-40 w-full object-cover"
                    />
                    <div className="mt-3">
                      <h4 className="font-medium">명품 핸드백</h4>
                      <p className="text-blue-600 font-medium">₩1,250,000</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=2030&auto=format&fit=crop" 
                      alt="Product 4" 
                      className="rounded-lg h-52 w-full object-cover"
                    />
                    <div className="mt-3">
                      <h4 className="font-medium">프리미엄 향수</h4>
                      <p className="text-blue-600 font-medium">₩320,000</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-medium text-center mb-8">파트너 브랜드</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-serif font-bold text-gray-500 hover:text-gray-900 transition-colors">Gucci</span>
          </div>
          <div className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-serif font-bold text-gray-500 hover:text-gray-900 transition-colors">Prada</span>
          </div>
          <div className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-serif font-bold text-gray-500 hover:text-gray-900 transition-colors">Louis V</span>
          </div>
          <div className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-serif font-bold text-gray-500 hover:text-gray-900 transition-colors">Dior</span>
          </div>
          <div className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-serif font-bold text-gray-500 hover:text-gray-900 transition-colors">Rolex</span>
          </div>
        </div>
      </section>

      {/* Shopping Experience Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-4">EXPERIENCE</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">
              최상의 쇼핑 경험을 선사합니다
            </h2>
            <p className="text-gray-600">
              고객 만족을 위한 다양한 서비스와 혜택을 제공합니다. 
              Peermall에서 특별한 쇼핑 경험을 즐기세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">무료 배송</h3>
              <p className="text-gray-600">
                30만원 이상 구매 시 전국 어디서나 무료 배송 혜택을 제공해 드립니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">30일 무료 반품</h3>
              <p className="text-gray-600">
                구매 후 30일 이내에 무료로 반품이 가능합니다. 고객 만족을 최우선으로 생각합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">24/7 고객 지원</h3>
              <p className="text-gray-600">
                궁금한 점이 있으신가요? 언제든지 연중무휴 24시간 고객센터로 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ShopFooter
        shopName={shopData.shopName}
        shopUrl={shopData.shopUrl || ''}
        shopData={shopData}
      />
    </div>
  );
};

export default LuxuryTemplate;
