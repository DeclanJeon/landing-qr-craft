
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart, Search, ChevronRight, Phone, Mail, MapPin, User } from 'lucide-react';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: '프리미엄 티셔츠',
    price: '29,900원',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product1',
  },
  {
    id: 2,
    name: '클래식 데님 팬츠',
    price: '59,900원',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product2',
  },
  {
    id: 3,
    name: '캐주얼 스니커즈',
    price: '89,000원',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product3',
  },
  {
    id: 4,
    name: '가죽 크로스백',
    price: '129,000원',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product4',
  },
  {
    id: 5,
    name: '프리미엄 모자',
    price: '36,500원',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product5',
  },
  {
    id: 6,
    name: '디자이너 선글라스',
    price: '179,000원',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product6',
  },
];

// Categories
const categories = [
  { id: 1, name: '의류', count: 24 },
  { id: 2, name: '신발', count: 18 },
  { id: 3, name: '가방', count: 12 },
  { id: 4, name: '액세서리', count: 20 },
  { id: 5, name: '디지털', count: 8 },
];

const ShopTemplate = () => {
  const { shopUrl } = useParams();
  
  // Get shop data from localStorage (in a real application, this would come from a database)
  const shopDataString = localStorage.getItem('peermallShopData');
  const shopData = shopDataString ? JSON.parse(shopDataString) : null;
  
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to={`/shop/${shopUrl}/home`} className="text-2xl font-bold text-blue-600">
              {shopData.shopName}
            </Link>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="상품 검색..."
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <nav className="mt-4">
            <ul className="flex space-x-6">
              <li>
                <Link to={`/shop/${shopUrl}/home`} className="text-blue-600 font-medium">홈</Link>
              </li>
              <li>
                <Link to={`/shop/${shopUrl}/products`} className="text-gray-600 hover:text-blue-600">상품</Link>
              </li>
              <li>
                <Link to={`/shop/${shopUrl}/new`} className="text-gray-600 hover:text-blue-600">신상품</Link>
              </li>
              <li>
                <Link to={`/shop/${shopUrl}/best`} className="text-gray-600 hover:text-blue-600">베스트</Link>
              </li>
              <li>
                <Link to={`/shop/${shopUrl}/about`} className="text-gray-600 hover:text-blue-600">소개</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden h-64 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">{shopData.shopName}에 오신 것을 환영합니다</h1>
            <p className="text-white/80 mb-6 max-w-lg">
              최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.
            </p>
            <Button className="w-fit bg-white text-blue-600 hover:bg-gray-100">
              상품 구경하기 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">카테고리</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <Link to={`/shop/${shopUrl}/category/${category.id}`} className="flex justify-between items-center text-gray-700 hover:text-blue-600">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">쇼핑몰 정보</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <User className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">대표자</p>
                    <p className="text-gray-700">{shopData.ownerName}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">연락처</p>
                    <p className="text-gray-700">{shopData.contactNumber}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">이메일</p>
                    <p className="text-gray-700">{shopData.email}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">주소</p>
                    <p className="text-gray-700">{shopData.address}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">추천 상품</h2>
                <Link to={`/shop/${shopUrl}/products`} className="text-blue-600 flex items-center hover:underline">
                  더 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.slice(0, 3).map(product => (
                  <Card key={product.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-48 w-full">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-blue-600 font-bold">{product.price}</p>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">신상품</h2>
                <Link to={`/shop/${shopUrl}/new`} className="text-blue-600 flex items-center hover:underline">
                  더 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.slice(3, 6).map(product => (
                  <Card key={product.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-48 w-full">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-blue-600 font-bold">{product.price}</p>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">{shopData.shopName}</h3>
              <p className="text-gray-400 max-w-md">
                {shopData.shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-lg font-medium mb-3">쇼핑몰 정보</h4>
                <ul className="space-y-2">
                  <li><Link to={`/shop/${shopUrl}/about`} className="text-gray-400 hover:text-white">소개</Link></li>
                  <li><Link to={`/shop/${shopUrl}/terms`} className="text-gray-400 hover:text-white">이용약관</Link></li>
                  <li><Link to={`/shop/${shopUrl}/privacy`} className="text-gray-400 hover:text-white">개인정보처리방침</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">고객 서비스</h4>
                <ul className="space-y-2">
                  <li><Link to={`/shop/${shopUrl}/faq`} className="text-gray-400 hover:text-white">자주 묻는 질문</Link></li>
                  <li><Link to={`/shop/${shopUrl}/contact`} className="text-gray-400 hover:text-white">문의하기</Link></li>
                  <li><Link to={`/shop/${shopUrl}/shipping`} className="text-gray-400 hover:text-white">배송 안내</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {shopData.shopName}. All rights reserved.</p>
            <p className="mt-1">Powered by Peermall</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopTemplate;
