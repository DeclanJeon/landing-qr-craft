import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PeermallCreateModal from '@/components/PeermallCreateModal';
import { toast } from "@/hooks/use-toast";
import { getPeermalls } from "@/utils/peermallStorage";
import Navigation from '@/components/Navigation'; // Navigation 컴포넌트 import 추가
import { ShopData } from "@/types/shop";
import {
  ChevronRight,
  Star,
  Store,
  Search, // 검색 아이콘은 필터링 결과 표시에 사용될 수 있으므로 유지
  Heart,
  Bell, // CTA 섹션에서 사용
  User, // CTA 섹션에서 사용
  ArrowRight // 모든 피어몰 카드에서 사용
} from "lucide-react";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [peermalls, setPeermalls] = useState<ShopData[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태는 유지 (필터링 로직에 사용)
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
    // 페이지 배경색 변경
    <div className="min-h-screen bg-bg-100">
      {/* Navigation 컴포넌트로 대체 */}
      <Navigation onOpenCreateModal={handleOpenCreateModal} />

      {/* main 태그에 pt-20 정도의 패딩 추가 (fixed 헤더 높이만큼) */}
      <main className="pb-12 pt-20">
        {/* Main Carousel Banner */}
        {/* Carousel 섹션에 container 추가 및 overflow-hidden 추가 */}
        <section className="relative overflow-hidden"> {/* overflow-hidden 추가 */}
          <div className="container mx-auto px-4"> {/* 컨테이너 추가 */}
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
                    {/* 캐러셀 오버레이 및 텍스트 색상 변경 */}
                    {/* 내부 중첩 container 및 패딩 제거 (부모 container 패딩 사용) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-200/70 to-transparent flex items-center"> 
                        <div className="max-w-lg"> {/* 패딩은 부모 container의 px-4를 따름 */}
                          <h2 className="text-3xl md:text-4xl font-bold text-bg-100 mb-2"> {/* 텍스트 색상 변경 */}
                            {slide.title}
                          </h2>
                          <p className="text-lg text-bg-100/90 mb-6"> {/* 텍스트 색상 변경 */}
                            {slide.subtitle}
                          </p>
                          {/* 버튼 배경, 호버, 텍스트 색상 변경 */}
                          <Button className="bg-primary-100 hover:bg-primary-100/80 text-text-100">
                            {slide.buttonText}
                          </Button>
                        </div>
                      {/* </div> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* 캐러셀 버튼 배경, 호버, 아이콘 색상 변경 */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselPrevious className="bg-bg-100/30 hover:bg-bg-100/50 border-none text-text-100" />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselNext className="bg-bg-100/30 hover:bg-bg-100/50 border-none text-text-100" />
            </div>
            </Carousel>
          </div> {/* 컨테이너 닫기 */}
        </section>

        {/* Categories Grid - mt 값 조정 */}
        <section className="container mx-auto px-4 -mt-16 mb-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              // 카테고리 카드 배경, 텍스트, 호버 그림자 색상 변경
              <Link
                key={category.id}
                to={`/shop/peermall/category/${category.id}`}
                className="bg-bg-100 rounded-lg shadow p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow border border-bg-200 hover:border-primary-100"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                {/* 카테고리 이름 텍스트 색상 변경 */}
                <span className="text-sm font-medium text-text-100">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Peermall Listings */}
        <div className="container mx-auto px-4">
          {/* Peermall List Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              {/* 제목, 부제목 텍스트 색상 변경 */}
              <h1 className="text-2xl font-bold text-text-100">피어몰 둘러보기</h1>
              <p className="text-sm text-text-200">원하는 피어몰을 찾아보세요</p>
            </div>
            <div className="flex gap-2">
              {/* Select 컴포넌트 배경색 변경 */}
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[130px] bg-bg-100 border-border text-text-100">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                {/* Select Content 배경, 아이템 텍스트 색상 등은 Select 컴포넌트 내부 스타일 따름 (필요시 shadcn/ui 테마 수정) */}
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                </SelectContent>
              </Select>
              {/* 버튼 배경, 호버, 텍스트 색상 변경 */}
              <Button onClick={handleOpenCreateModal} className="bg-primary-100 hover:bg-primary-100/80 text-text-100">
                <Store className="w-4 h-4 mr-1" />
                <span>내 피어몰 만들기</span>
              </Button>
            </div>
          </div>

          {peermalls.length === 0 ? (
            // 피어몰 없음 영역 배경, 아이콘, 텍스트, 버튼 색상 변경
            <div className="text-center py-12 bg-bg-200 rounded-lg shadow-sm border border-border">
              <div className="w-16 h-16 bg-bg-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-text-200" />
              </div>
              <h3 className="text-xl font-medium text-text-100 mb-2">아직 등록된 피어몰이 없습니다</h3>
              <p className="text-text-200 mb-6">
                첫 번째 피어몰을 만들어 시작해보세요!
              </p>
              <Button onClick={handleOpenCreateModal} className="bg-primary-100 hover:bg-primary-100/80 text-text-100">
                피어몰 시작하기
              </Button>
            </div>
          ) : (
            <>
              {/* Peermall Collections */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  {/* 섹션 제목 텍스트 색상 변경 */}
                  <h2 className="text-xl font-bold text-text-100">추천 피어몰</h2>
                  {/* 링크 텍스트 색상 변경 */}
                  <Link to="/peermall-list" className="text-sm text-primary-100 hover:text-primary-200 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      {/* 카드 배경, 테두리, 호버 효과 변경 */}
                      <div className="bg-bg-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow border border-bg-200 hover:border-primary-100">
                        <div className="h-40 overflow-hidden relative">
                          <img
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}`}
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                          {/* 이미지 오버레이 색상 변경 */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-200/70 to-transparent p-3">
                            {/* 별점 텍스트 색상 변경 */}
                            <div className="flex items-center text-bg-100">
                              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" /> {/* 별 색상은 유지 */}
                              <span className="ml-1 text-xs">{mall.rating || "5.0"}</span>
                            </div>
                          </div>
                          {mall.specialization && (
                            // 배지 배경, 호버, 텍스트 색상 변경
                            <Badge className="absolute top-2 left-2 bg-primary-100 hover:bg-primary-100/80 text-text-100 border-none">
                              {mall.specialization}
                            </Badge>
                          )}
                        </div>
                        {/* 카드 내용 텍스트 색상 변경 */}
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 text-text-100">{mall.shopName}</h3>
                          <p className="text-xs text-text-200 line-clamp-2">
                            {mall.shopDescription || '다양한 제품을 합리적인 가격에 만나보세요.'}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-text-200">방문수: {Math.floor(Math.random() * 5000) + 100}</span>
                            {/* 링크 텍스트 색상 변경 */}
                            <span className="text-xs text-primary-100 hover:text-primary-200">바로가기</span>
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
                  {/* 섹션 제목 텍스트 색상 변경 */}
                  <h2 className="text-xl font-bold text-text-100">최근 등록된 피어몰</h2>
                  {/* 링크 텍스트 색상 변경 */}
                  <Link to="/peermall-list" className="text-sm text-primary-100 hover:text-primary-200 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      {/* 카드 배경, 테두리, 호버 효과 변경 */}
                      <div className="bg-bg-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow h-full border border-bg-200 hover:border-primary-100">
                        <div className="h-32 overflow-hidden">
                          <img
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}-recent`}
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* 카드 내용 텍스트 색상 변경 */}
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 line-clamp-1 text-text-100">{mall.shopName}</h3>
                          <div className="flex items-center text-xs text-text-200">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> {/* 별 색상은 유지 */}
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
                  {/* 섹션 제목 텍스트 색상 변경 */}
                  <h2 className="text-xl font-bold text-text-100">모든 피어몰</h2>
                  <div className="flex items-center gap-2">
                    {/* 필터 버튼 배경, 텍스트, 테두리, 활성 상태 색상 변경 */}
                    <Button variant="outline" size="sm" className={`text-sm ${activeCategory === 'all' ? 'bg-primary-100 text-text-100 border-primary-100' : 'bg-bg-100 text-text-200 border-border hover:bg-bg-200'}`} onClick={() => setActiveCategory('all')}>
                      전체
                    </Button>
                    {categories.slice(0, 4).map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className={`text-sm ${activeCategory === category.id ? 'bg-primary-100 hover:bg-primary-100/80 text-text-100 border-none' : 'bg-bg-100 text-text-200 border-border hover:bg-bg-200'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {filteredPeermalls.length === 0 ? (
                  // 검색 결과 없음 영역 배경, 아이콘, 텍스트, 버튼 색상 변경
                  <div className="text-center py-8 bg-bg-200 rounded-lg shadow-sm border border-border">
                    <Search className="h-10 w-10 mx-auto text-text-200 mb-3" />
                    <h3 className="text-lg font-medium text-text-100 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-text-200 mb-4">다른 검색어로 다시 시도하거나 필터를 변경해보세요.</p>
                    <Button onClick={() => setSearchTerm('')} variant="outline" className="bg-bg-100 border-border text-text-100 hover:bg-bg-200">
                      전체 목록 보기
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPeermalls.map((mall) => (
                      <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                        {/* 카드 배경, 테두리, 호버 효과 변경 */}
                        <div className="bg-bg-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-all h-full border border-bg-200 hover:border-primary-100">
                          <div className="h-40 overflow-hidden relative">
                            <img
                              src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}-all`}
                              alt={mall.shopName}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 flex space-x-1">
                              {/* 하트 버튼 배경, 아이콘, 호버 색상 변경 */}
                              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-bg-100/80 text-text-200 hover:bg-bg-200 hover:text-primary-100">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* 카드 내용 텍스트 색상 변경 */}
                          <div className="p-3">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-medium text-sm text-text-100">{mall.shopName}</h3>
                              <div className="flex items-center">
                                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" /> {/* 별 색상은 유지 */}
                                <span className="text-xs ml-1 text-text-200">{mall.rating || "5.0"}</span>
                              </div>
                            </div>
                            <p className="text-xs text-text-200 line-clamp-2 mb-2">
                              {mall.shopDescription || '다양한 제품을 만나보세요.'}
                            </p>
                            {/* 방문하기 버튼 배경, 텍스트, 테두리, 호버 색상 변경 */}
                            <Button variant="outline" size="sm" className="w-full text-xs justify-between bg-bg-200 hover:bg-bg-300 text-text-100 hover:text-primary-100 border-border hover:border-primary-100">
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
      </main>


      {/* Peermall Creation Modal */}
      <PeermallCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
