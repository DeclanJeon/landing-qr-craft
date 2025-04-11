
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PeermallCreateModal from '@/components/PeermallCreateModal';
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { getPeermalls } from "@/utils/peermallStorage";
import { ShopData } from "@/types/shop";
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight, 
  Heart, 
  Star,
  TrendingUp,
  Store,
  Menu,
  Globe,
  Zap,
  Filter,
  Clock,
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

  // Filter peermalls based on search term and active category
  const filteredPeermalls = peermalls.filter(peermall => {
    const matchesSearch = 
      peermall.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (peermall.shopDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      (peermall.category?.toLowerCase() || '').includes(activeCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

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

  // Categories for filtering
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'fashion', name: '패션' },
    { id: 'beauty', name: '뷰티' },
    { id: 'tech', name: '테크' },
    { id: 'home', name: '홈리빙' },
    { id: 'food', name: '식품' }
  ];

  // Featured peermalls (could be based on rating, visits, etc.)
  const featuredPeermalls = peermalls.length > 0 
    ? [...peermalls].sort((a, b) => (b.rating || 5) - (a.rating || 5)).slice(0, 4) 
    : [];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Header */}
          <div className="py-1 border-b border-gray-100 hidden md:flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span className="text-gray-500">고객센터: 1588-1588</span>
              <Link to="/community" className="text-gray-500 hover:text-blue-600">커뮤니티</Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-500 hover:text-blue-600">로그인</Link>
              <Link to="/personal-lounge" className="text-gray-500 hover:text-blue-600">회원가입</Link>
              <Link to="/customer-service" className="text-gray-500 hover:text-blue-600">고객센터</Link>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button className="lg:hidden mr-4">
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Peermall</span>
                <span className="ml-2 text-lg text-gray-700">Premium</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="피어몰 또는 제품 검색"
                  className="pr-10 rounded-full border-gray-200 focus-visible:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-blue-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-1 md:space-x-4">
              <Link to="/search" className="md:hidden">
                <Button size="icon" variant="ghost" className="text-gray-700 hover:bg-gray-100 rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/personal-lounge">
                <Button size="icon" variant="ghost" className="text-gray-700 hover:bg-gray-100 rounded-full relative">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop/peermall/cart">
                <Button size="icon" variant="ghost" className="text-gray-700 hover:bg-gray-100 rounded-full relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
              <Button
                onClick={handleOpenCreateModal} 
                className="hidden md:flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>내 피어몰 시작</span>
              </Button>
            </div>
          </div>
          
          {/* Categories Navigation */}
          <nav className="py-3 overflow-x-auto scrollbar-none">
            <ul className="flex space-x-8 min-w-max">
              <li>
                <Link to="/" className="text-blue-600 font-medium border-b-2 border-blue-600 px-1 py-2">홈</Link>
              </li>
              <li>
                <Link to="/peermall-list" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">피어몰 목록</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/1" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">베스트</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/3" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">특가</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/6" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">기획전</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/7" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">브랜드</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Header for Peer Mall List */}
        <section className="container mx-auto px-4 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800">피어몰 둘러보기</h1>
              <p className="text-gray-600 mt-1">다양한 피어몰을 발견하고 쇼핑을 시작하세요</p>
            </div>
            <div className="flex gap-2">
              <Link to="/peermall-list">
                <Button variant="outline" className="flex gap-1 items-center">
                  <Globe className="w-4 h-4" />
                  <span>전체보기</span>
                </Button>
              </Link>
              <Button onClick={handleOpenCreateModal} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <Store className="w-4 h-4 mr-1" />
                <span>내 피어몰 만들기</span>
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto pb-3 scrollbar-none space-x-2 mb-6">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {peermalls.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">아직 등록된 피어몰이 없습니다</h3>
              <p className="text-gray-500 mb-6">
                첫 번째 피어몰을 만들어 시작해보세요!
              </p>
              <Button onClick={handleOpenCreateModal} className="bg-blue-600 hover:bg-blue-700 text-white">
                피어몰 시작하기
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Peer Malls - Only show if we have peer malls */}
              {featuredPeermalls.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium">추천 피어몰</h2>
                    <Button variant="ghost" className="text-blue-600 flex items-center gap-1">
                      더보기 <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                      {featuredPeermalls.map((mall) => (
                        <CarouselItem key={mall.shopUrl} className="pl-4 md:basis-1/2 lg:basis-1/4">
                          <Link to={`/shop/${mall.shopUrl}/home`}>
                            <motion.div
                              whileHover={{ y: -8 }}
                              transition={{ duration: 0.3 }}
                              className="relative h-72 overflow-hidden rounded-xl luxury-card shadow-md"
                            >
                              <img 
                                src={mall.introImageUrl || mall.logoUrl || "https://via.placeholder.com/400x600?text=Peermall"} 
                                alt={mall.shopName}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <Badge className="absolute top-3 right-3 bg-blue-600 border-0">추천</Badge>
                              <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                                <div className="flex items-center mb-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 text-sm font-medium">{mall.rating || 5.0}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-1">{mall.shopName}</h3>
                                <p className="text-sm text-gray-300 mb-4 line-clamp-1">{mall.shopDescription || '프리미엄 피어몰'}</p>
                                <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-white/90">
                                  방문하기
                                </Button>
                              </div>
                            </motion.div>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="-left-12" />
                      <CarouselNext className="-right-12" />
                    </div>
                  </Carousel>
                </div>
              )}

              {/* All Peer Malls Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-medium">모든 피어몰</h2>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <select 
                      className="bg-transparent text-sm text-gray-600 font-medium border-none focus:ring-0"
                      defaultValue="newest"
                    >
                      <option value="newest">최신순</option>
                      <option value="rating">평점순</option>
                      <option value="popular">인기순</option>
                    </select>
                  </div>
                </div>
                
                {filteredPeermalls.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-500 mb-4">
                      다른 검색어로 다시 시도하거나 필터를 변경해보세요.
                    </p>
                    <Button onClick={() => setSearchTerm('')} variant="outline">
                      전체 목록 보기
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredPeermalls.map((mall) => (
                      <motion.div
                        key={mall.shopUrl}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="group"
                      >
                        <Card className="overflow-hidden border-gray-100 hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={mall.introImageUrl || mall.logoUrl || "https://via.placeholder.com/400x300?text=Peermall"}
                              alt={mall.shopName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {mall.specialization && (
                              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
                                {mall.specialization}
                              </Badge>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white text-sm ml-1 font-medium">{mall.rating || "5.0"}</span>
                            </div>
                          </div>
                          <CardContent className="p-4 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                                {mall.shopName}
                              </h3>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                NEW
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                              {mall.shopDescription || '피어몰에서 다양한 제품을 만나보세요.'}
                            </p>
                            <Link to={`/shop/${mall.shopUrl}/home`} className="mt-auto">
                              <Button variant="ghost" className="w-full justify-between text-blue-600 group-hover:bg-blue-50">
                                방문하기
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* Trending on Peermall */}
        {peermalls.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-medium text-gray-900">인기 제품</h2>
              <Button variant="link" className="font-medium text-blue-600 flex items-center gap-1">
                전체보기 <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <motion.div
                  key={id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={`https://picsum.photos/400/500?random=${id}`} 
                        alt="Product" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                        인기
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-white/90">
                          <ShoppingCart className="h-4 w-4 mr-2" /> 
                          장바구니에 추가
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        프리미엄 제품 {id}
                      </h3>
                      <div className="flex items-baseline mb-2">
                        <span className="text-lg font-bold text-gray-900">₩{(149000 + id * 15000).toLocaleString()}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">₩{(189000 + id * 20000).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="flex items-center text-amber-500 mr-2">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="ml-1">4.{7 + (id % 3)}</span>
                        </div>
                        <span>리뷰 {(id * 57 + 120).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Info Section with VIP Benefits */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-medium mb-4">피어몰에서 쇼핑을 시작하세요</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                다양한 판매자들의 피어몰에서 특별한 제품을 발견하거나, 직접 피어몰을 만들어 판매를 시작해보세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                  <Store className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-3">피어몰 만들기</h3>
                <p className="text-gray-600 mb-6">
                  몇 분 안에 나만의 피어몰을 구축하고 온라인 비즈니스를 시작하세요. 쉽고 간편한 설정으로 빠르게 시작할 수 있습니다.
                </p>
                <Button variant="outline" onClick={handleOpenCreateModal} className="w-full">피어몰 만들기</Button>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-6">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-3">쇼핑하기</h3>
                <p className="text-gray-600 mb-6">
                  수많은 피어몰에서 다양한 제품을 발견하고 쇼핑해보세요. 독특한 아이템부터 일상 필수품까지 모두 만나볼 수 있습니다.
                </p>
                <Link to="/peermall-list">
                  <Button variant="outline" className="w-full">쇼핑 시작하기</Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-3">VIP 혜택</h3>
                <p className="text-gray-600 mb-6">
                  VIP 멤버십에 가입하고 특별한 혜택을 누리세요. 추가 할인, 특별 이벤트 초대, 프리미엄 고객 지원 서비스를 제공합니다.
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">VIP 가입하기</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Peermall</span>
                <span className="ml-2 text-lg text-gray-300">Premium</span>
              </div>
              <p className="text-gray-400 mb-6">
                피어몰은 고객에게 최상의 쇼핑 경험과 판매자에게는 최고의 비즈니스 플랫폼을 제공합니다.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white text-lg font-medium mb-4">쇼핑 정보</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white">판매자 등록</a></li>
                <li><a href="#" className="hover:text-white">공지사항</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-medium mb-4">고객 서비스</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">고객센터</a></li>
                <li><a href="#" className="hover:text-white">자주묻는 질문</a></li>
                <li><a href="#" className="hover:text-white">주문 조회</a></li>
                <li><a href="#" className="hover:text-white">교환 및 반품</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-medium mb-4">연락처</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  1588-1588
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  support@peermall.com
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  서울시 강남구 테헤란로 123
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  평일 09:00 - 18:00
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Peermall. All rights reserved.</p>
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
