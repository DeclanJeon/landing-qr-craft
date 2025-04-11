
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PeermallCreateModal from '@/components/PeermallCreateModal';
import { toast } from "@/hooks/use-toast";
import { getPeermalls } from "@/utils/peermallStorage";
import { ShopData } from "@/types/shop";
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight,
  ChevronLeft, 
  Star,
  Store,
  Menu,
  MapPin,
  ChevronDown,
  Heart,
  Bell,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [peermalls, setPeermalls] = useState<ShopData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load peermalls from localStorage
    const loadedPeermalls = getPeermalls();
    setPeermalls(loadedPeermalls);
  }, []);

  // Filter peermalls based on search term
  const filteredPeermalls = peermalls.filter(peermall => 
    peermall.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (peermall.shopDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    // Check if user is authenticated before opening
    const isAuthenticated = localStorage.getItem('peermall-user-authenticated') === 'true';
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "피어몰을 생성하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return; 
    }
    setIsCreateModalOpen(true);
  };

  // Categories for display
  const categories = [
    { id: 'fashion', name: '패션', icon: '👕' },
    { id: 'beauty', name: '뷰티', icon: '💄' },
    { id: 'electronics', name: '전자제품', icon: '📱' },
    { id: 'home', name: '홈리빙', icon: '🏠' },
    { id: 'food', name: '식품', icon: '🍔' },
    { id: 'books', name: '도서', icon: '📚' },
    { id: 'toys', name: '완구/취미', icon: '🎮' },
    { id: 'sports', name: '스포츠', icon: '⚽' }
  ];

  // Banner slides
  const bannerSlides = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/1200/300?random=1',
      title: '인기 피어몰 둘러보기',
      subtitle: '다양한 상품들을 만나보세요',
      buttonText: '쇼핑하기'
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/1200/300?random=2',
      title: '지금 피어몰 만들고 할인 받기',
      subtitle: '쉽고 빠른 온라인 스토어 제작',
      buttonText: '시작하기'
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/1200/300?random=3',
      title: '특별한 혜택, 한정 기간',
      subtitle: '최대 50% 할인 이벤트 진행중',
      buttonText: '더 알아보기'
    }
  ];

  // Featured peermalls
  const featuredPeermalls = peermalls.length > 0 
    ? [...peermalls].sort((a, b) => (b.rating || 5) - (a.rating || 5)).slice(0, 4) 
    : [];

  // Recently added peermalls
  const recentPeermalls = peermalls.length > 0 
    ? [...peermalls].slice(0, 8) 
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white">
        {/* Upper Nav */}
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold mr-4">
              <span className="text-orange-400">Peer</span>
              <span className="text-white">mall</span>
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center space-x-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="text-gray-300">배송지:</span>
              <span className="font-medium">대한민국</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-3xl mx-4">
            <div className="relative flex">
              <Select defaultValue="all">
                <SelectTrigger className="w-[80px] rounded-l-md rounded-r-none border-r border-gray-400 bg-gray-100 text-gray-800">
                  <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="fashion">패션</SelectItem>
                  <SelectItem value="beauty">뷰티</SelectItem>
                  <SelectItem value="electronics">전자제품</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="피어몰 또는 상품 검색"
                className="flex-1 rounded-none border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="rounded-l-none rounded-r-md bg-orange-400 hover:bg-orange-500 text-white">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Account & Lists */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-300">안녕하세요, 로그인하세요</span>
              <Link to="/login" className="text-sm font-medium flex items-center">
                계정 및 목록
                <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-300">반품</span>
              <Link to="/shop/peermall/returns" className="text-sm font-medium">
                & 주문
              </Link>
            </div>

            <Link to="/shop/peermall/cart" className="flex items-end">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="font-medium ml-1">장바구니</span>
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/login">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/shop/peermall/cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Lower Nav */}
        <div className="bg-slate-800 py-2">
          <div className="container mx-auto px-4 flex items-center">
            <button className="flex items-center text-white mr-6">
              <Menu className="h-5 w-5 mr-2" />
              <span>전체 카테고리</span>
            </button>
            <nav className="flex space-x-6 overflow-x-auto scrollbar-none text-sm">
              <Link to="/peermall-list" className="text-white whitespace-nowrap">베스트 피어몰</Link>
              <Link to="/shop/peermall/category/new" className="text-white whitespace-nowrap">신규 피어몰</Link>
              <Link to="/shop/peermall/category/today" className="text-white whitespace-nowrap">오늘의 딜</Link>
              <Link to="/qr-generator" className="text-white whitespace-nowrap">QR코드 생성</Link>
              <Link to="/community" className="text-white whitespace-nowrap">커뮤니티</Link>
              <Link to="/customer-service" className="text-white whitespace-nowrap">고객센터</Link>
            </nav>
            <div className="ml-auto">
              <Button onClick={handleOpenCreateModal} className="bg-transparent hover:bg-slate-700 text-white border border-gray-500">
                내 피어몰 시작
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-12">
        {/* Main Carousel Banner */}
        <section className="relative bg-gray-800">
          <Carousel className="mx-auto">
            <CarouselContent>
              {bannerSlides.map((slide) => (
                <CarouselItem key={slide.id} className="relative">
                  <div className="relative h-[300px] md:h-[350px] w-full">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                      <div className="container mx-auto px-8 md:px-16">
                        <div className="max-w-lg">
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {slide.title}
                          </h2>
                          <p className="text-lg text-white/90 mb-6">
                            {slide.subtitle}
                          </p>
                          <Button className="bg-orange-400 hover:bg-orange-500 text-white">
                            {slide.buttonText}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselPrevious className="bg-white/30 hover:bg-white/50 border-none text-white" />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselNext className="bg-white/30 hover:bg-white/50 border-none text-white" />
            </div>
          </Carousel>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 -mt-6 mb-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/shop/peermall/category/${category.id}`}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Peermall Listings */}
        <div className="container mx-auto px-4">
          {/* Peermall List Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">피어몰 둘러보기</h1>
              <p className="text-sm text-gray-600">원하는 피어몰을 찾아보세요</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[130px] bg-white">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleOpenCreateModal} className="bg-orange-400 hover:bg-orange-500 text-white">
                <Store className="w-4 h-4 mr-1" />
                <span>내 피어몰 만들기</span>
              </Button>
            </div>
          </div>

          {peermalls.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">아직 등록된 피어몰이 없습니다</h3>
              <p className="text-gray-500 mb-6">
                첫 번째 피어몰을 만들어 시작해보세요!
              </p>
              <Button onClick={handleOpenCreateModal} className="bg-orange-400 hover:bg-orange-500 text-white">
                피어몰 시작하기
              </Button>
            </div>
          ) : (
            <>
              {/* Peermall Collections */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">추천 피어몰</h2>
                  <Link to="/peermall-list" className="text-sm text-orange-500 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                  
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}`} 
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <div className="flex items-center text-white">
                              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-xs">{mall.rating || "5.0"}</span>
                            </div>
                          </div>
                          {mall.specialization && (
                            <Badge className="absolute top-2 left-2 bg-orange-400 hover:bg-orange-400 border-none">
                              {mall.specialization}
                            </Badge>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1">{mall.shopName}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {mall.shopDescription || '다양한 제품을 합리적인 가격에 만나보세요.'}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">방문수: {Math.floor(Math.random() * 5000) + 100}</span>
                            <span className="text-xs text-orange-500">바로가기</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Peermalls Grid */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">최근 등록된 피어몰</h2>
                  <Link to="/peermall-list" className="text-sm text-orange-500 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow h-full">
                        <div className="h-32 overflow-hidden">
                          <img
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}-recent`}
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 line-clamp-1">{mall.shopName}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1">{mall.rating || "5.0"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* All Peermalls with Filters */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">모든 피어몰</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-sm bg-white" onClick={() => setActiveCategory('all')}>
                      전체
                    </Button>
                    {categories.slice(0, 4).map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className={`text-sm ${activeCategory === category.id ? 'bg-orange-400 hover:bg-orange-500 border-none' : 'bg-white'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {filteredPeermalls.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <Search className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-500 mb-4">다른 검색어로 다시 시도하거나 필터를 변경해보세요.</p>
                    <Button onClick={() => setSearchTerm('')} variant="outline" className="bg-white">
                      전체 목록 보기
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPeermalls.map((mall) => (
                      <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                        <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all h-full border border-gray-100 hover:border-orange-200">
                          <div className="h-40 overflow-hidden relative">
                            <img
                              src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}-all`}
                              alt={mall.shopName}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 flex space-x-1">
                              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-white/80 text-gray-700 hover:bg-white hover:text-orange-500">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-medium text-sm">{mall.shopName}</h3>
                              <div className="flex items-center">
                                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs ml-1">{mall.rating || "5.0"}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {mall.shopDescription || '다양한 제품을 만나보세요.'}
                            </p>
                            <Button variant="outline" size="sm" className="w-full text-xs justify-between bg-gray-50 hover:bg-orange-50 hover:text-orange-500 border-gray-200">
                              방문하기
                              <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        {/* CTAs Before Footer */}
        {peermalls.length > 0 && (
          <section className="bg-gray-50 py-10 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-4">
                      <Store className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">내 피어몰 만들기</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">간단한 설정으로 나만의 온라인 스토어를 만들고 수익을 창출하세요.</p>
                  <Button onClick={handleOpenCreateModal} className="bg-orange-400 hover:bg-orange-500 text-white w-full">시작하기</Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-4">
                      <Bell className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">특별 할인 알림</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">주요 특가 및 할인 소식을 놓치지 마세요. 이메일로 최신 정보를 받아보세요.</p>
                  <div className="flex">
                    <Input placeholder="이메일 입력" className="rounded-r-none" />
                    <Button className="rounded-l-none bg-orange-400 hover:bg-orange-500 text-white">구독</Button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                      <User className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium">고객 지원</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">문의사항이 있으신가요? 언제든지 고객센터로 연락주세요. 24시간 이내 답변드립니다.</p>
                  <Link to="/customer-service">
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300">문의하기</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-800">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-orange-400">Peer</span>
                <span className="text-white">mall</span>
              </Link>
              <p className="mt-2 text-sm text-gray-400 max-w-md">
                피어몰은 판매자와 구매자를 연결하는 온라인 마켓플레이스입니다. 
                지금 바로 쇼핑을 시작하거나 나만의 온라인 스토어를 만들어보세요.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white text-sm font-medium mb-4">쇼핑</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/peermall-list" className="hover:text-orange-400">인기 피어몰</Link></li>
                  <li><Link to="/shop/peermall/category/new" className="hover:text-orange-400">신규 피어몰</Link></li>
                  <li><Link to="/shop/peermall/category/today" className="hover:text-orange-400">오늘의 특가</Link></li>
                  <li><Link to="/qr-generator" className="hover:text-orange-400">QR코드</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-4">판매하기</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" onClick={handleOpenCreateModal} className="hover:text-orange-400">피어몰 만들기</Link></li>
                  <li><Link to="/site-integration" className="hover:text-orange-400">사이트 통합</Link></li>
                  <li><Link to="/shop/peermall/admin" className="hover:text-orange-400">판매자 센터</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-4">고객지원</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/customer-service" className="hover:text-orange-400">고객센터</Link></li>
                  <li><Link to="/community" className="hover:text-orange-400">커뮤니티</Link></li>
                  <li><a href="mailto:contact@peermall.com" className="hover:text-orange-400">이메일 문의</a></li>
                  <li><a href="tel:1588-1588" className="hover:text-orange-400">전화: 1588-1588</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Peermall. 모든 권리 보유.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link to="/" className="text-gray-400 hover:text-white">이용약관</Link>
              <Link to="/" className="text-gray-400 hover:text-white">개인정보처리방침</Link>
              <Link to="/" className="text-gray-400 hover:text-white">판매자 이용약관</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Peermall Creation Modal */}
      <PeermallCreateModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
