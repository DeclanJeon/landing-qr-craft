
import React, { useState, useEffect, useRef } from 'react';
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
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight, 
  Heart, 
  Clock,
  Gift,
  Truck,
  Tag,
  Layers,
  Star,
  TrendingUp,
  Sparkles,
  Menu
} from "lucide-react";

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Leather Handbag",
    price: "₩298,000",
    originalPrice: "₩350,000",
    rating: 4.8,
    reviewCount: 238,
    image: "/lovable-uploads/4f55e5d0-3fb9-4d4c-8be3-5f63048cbaf9.png",
    badge: "인기"
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: "₩459,000", 
    originalPrice: "₩499,000",
    rating: 4.9,
    reviewCount: 521,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    badge: "신상"
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    price: "₩329,000",
    originalPrice: "₩389,000",
    rating: 4.7,
    reviewCount: 345,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    badge: "할인"
  },
  {
    id: 4,
    name: "Luxury Perfume Collection",
    price: "₩198,000",
    originalPrice: "₩240,000",
    rating: 4.9,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2004&auto=format&fit=crop",
    badge: "특별"
  },
  {
    id: 5,
    name: "Premium Kitchen Cookware Set",
    price: "₩549,000",
    originalPrice: "₩649,000",
    rating: 4.8,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1593756291592-ec395fb15fca?q=80&w=2070&auto=format&fit=crop",
    badge: ""
  }
];

const categories = [
  { id: 1, name: "패션", icon: <Tag className="h-5 w-5 mb-1" /> },
  { id: 2, name: "뷰티", icon: <Sparkles className="h-5 w-5 mb-1" /> },
  { id: 3, name: "가전", icon: <Layers className="h-5 w-5 mb-1" /> },
  { id: 4, name: "식품", icon: <Gift className="h-5 w-5 mb-1" /> },
  { id: 5, name: "여행", icon: <Truck className="h-5 w-5 mb-1" /> },
  { id: 6, name: "인기", icon: <TrendingUp className="h-5 w-5 mb-1" /> }
];

const flashDeals = [
  {
    id: 1,
    name: "고급 헤어 드라이어",
    price: "₩89,000",
    originalPrice: "₩150,000",
    discount: 41,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1976&auto=format&fit=crop",
    timeLeft: "08:45:12"
  },
  {
    id: 2,
    name: "고급 면 침구 세트",
    price: "₩59,000",
    originalPrice: "₩99,000",
    discount: 40,
    image: "https://images.unsplash.com/photo-1584100936595-c0848df6ef08?q=80&w=2069&auto=format&fit=crop",
    timeLeft: "03:22:46"
  },
  {
    id: 3,
    name: "프리미엄 블루투스 스피커",
    price: "₩129,000",
    originalPrice: "₩229,000",
    discount: 44,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    timeLeft: "05:19:34"
  }
];

const trendingCategories = [
  {
    id: 1,
    name: "스마트 홈 가전",
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae2d7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "프리미엄 화장품",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2076&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "디자이너 가구",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "고급 주방용품",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
  }
];

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
              {product.badge}
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <Button size="sm" className="bg-white/90 text-gray-800 hover:bg-white rounded-full">
                <ShoppingCart className="h-4 w-4 mr-1" /> 담기
              </Button>
              <Button size="icon" variant="ghost" className="bg-white/90 text-gray-800 hover:bg-white rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-lg font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex items-center text-amber-500 mr-2">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="ml-1">{product.rating}</span>
            </div>
            <span>리뷰 {product.reviewCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Timer component for Flash Deals
const Timer = ({ time }) => {
  return (
    <div className="flex items-center space-x-1 text-sm font-medium">
      <Clock className="h-3.5 w-3.5 text-red-500 mr-1" />
      <span className="text-red-500">{time}</span>
    </div>
  );
};

// Flash Deal Card Component
const FlashDealCard = ({ deal }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={deal.image} 
            alt={deal.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
            {deal.discount}% OFF
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-xs">
              <Timer time={deal.timeLeft} />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-base mb-1 line-clamp-1">{deal.name}</h3>
          <div className="flex items-baseline">
            <span className="text-base font-bold text-red-600">{deal.price}</span>
            <span className="ml-2 text-xs text-gray-500 line-through">{deal.originalPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Category Button Component
const CategoryButton = ({ category }) => {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl p-3 shadow-sm transition-all duration-300 hover:shadow-md w-full"
    >
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-2">
        {category.icon}
      </div>
      <span className="text-sm font-medium">{category.name}</span>
    </motion.button>
  );
};

// Trending Category Card
const TrendingCategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl overflow-hidden h-40 w-full"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-lg">{category.name}</h3>
          <Button variant="link" className="p-0 h-auto text-white/90 hover:text-white flex items-center mt-0.5">
            보러가기 <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Hero Banner
const HeroBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-96">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-white/5 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/5 animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="relative h-full flex">
        <div className="flex-1 flex flex-col justify-center px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              당신의 라이프스타일을<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                더 특별하게
              </span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl">
              전 세계의 프리미엄 제품을 만나보세요. 특별한 쇼핑 경험을 선사합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                둘러보기
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                회원가입 혜택
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            src="/lovable-uploads/c45cb3ed-cd99-46e3-a59f-aa8d7072cdbc.png"
            alt="Premium Products"
            className="max-h-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

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
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
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
                  placeholder="찾고 싶은 상품을 검색하세요"
                  className="pr-10 rounded-full border-gray-200 focus-visible:ring-blue-500"
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
                <Link to="/shop/peermall/category/1" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">베스트</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/2" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">신상품</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/3" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">특가</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/4" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">캐시백</Link>
              </li>
              <li>
                <Link to="/shop/peermall/category/5" className="text-gray-600 hover:text-blue-600 transition-colors px-1 py-2">쿠폰</Link>
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
        {/* Hero Banner */}
        <section className="container mx-auto px-4 pt-6 pb-4">
          <HeroBanner />
        </section>
        
        {/* Category Shortcuts */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(category => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </div>
        </section>
        
        {/* Flash Deals Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">오늘의 특가</h2>
              <Badge variant="outline" className="ml-3 bg-red-50 text-red-600 border-red-200">
                한정 수량
              </Badge>
            </div>
            <Button variant="link" className="font-medium text-blue-600">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {flashDeals.map(deal => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
        
        {/* Premium Selections */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">프리미엄 셀렉션</h2>
            <Button variant="link" className="font-medium text-blue-600">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map(product => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </section>
        
        {/* Trending Categories */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">트렌딩 카테고리</h2>
            <Button variant="link" className="font-medium text-blue-600">
              전체보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {trendingCategories.map(category => (
              <TrendingCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
        
        {/* Featured Collections */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">추천 컬렉션</h2>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-transparent border-b border-gray-100 w-full justify-start h-auto p-0 space-x-8">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10"
              >
                전체
              </TabsTrigger>
              <TabsTrigger 
                value="fashion" 
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10"
              >
                패션
              </TabsTrigger>
              <TabsTrigger 
                value="electronics" 
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10"
              >
                가전
              </TabsTrigger>
              <TabsTrigger 
                value="beauty" 
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10"
              >
                뷰티
              </TabsTrigger>
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10"
              >
                홈리빙
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fashion" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProductCard product={featuredProducts[0]} />
                <ProductCard product={featuredProducts[3]} />
                <ProductCard product={featuredProducts[1]} />
                <ProductCard product={featuredProducts[2]} />
              </div>
            </TabsContent>
            
            <TabsContent value="electronics" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProductCard product={featuredProducts[1]} />
                <ProductCard product={featuredProducts[4]} />
                <ProductCard product={featuredProducts[2]} />
                <ProductCard product={featuredProducts[0]} />
              </div>
            </TabsContent>
            
            <TabsContent value="beauty" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProductCard product={featuredProducts[3]} />
                <ProductCard product={featuredProducts[0]} />
                <ProductCard product={featuredProducts[4]} />
                <ProductCard product={featuredProducts[2]} />
              </div>
            </TabsContent>
            
            <TabsContent value="home" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProductCard product={featuredProducts[4]} />
                <ProductCard product={featuredProducts[2]} />
                <ProductCard product={featuredProducts[1]} />
                <ProductCard product={featuredProducts[3]} />
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Premium Brand Banner */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  프리미엄 브랜드를<br />특별한 가격으로
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-300 mb-6"
                >
                  최대 70% 할인된 가격으로 명품 브랜드를 만나보세요. VIP 회원에게는 추가 혜택을 드립니다.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    VIP 혜택 보기
                  </Button>
                </motion.div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-serif font-bold">G</span>
                    </div>
                    <p className="text-center text-white text-sm">Gucci</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-serif font-bold">P</span>
                    </div>
                    <p className="text-center text-white text-sm">Prada</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-serif font-bold">D</span>
                    </div>
                    <p className="text-center text-white text-sm">Dior</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-serif font-bold">B</span>
                    </div>
                    <p className="text-center text-white text-sm">Burberry</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <h4 className="text-white text-lg font-medium mb-4">쇼핑 정보</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white">판매자 등록</a></li>
                <li><a href="#" className="hover:text-white">공지사항</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-medium mb-4">Peermall 소개</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">회사 소개</a></li>
                <li><a href="#" className="hover:text-white">인재 채용</a></li>
                <li><a href="#" className="hover:text-white">제휴 문의</a></li>
                <li><a href="#" className="hover:text-white">비즈니스 센터</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-medium mb-4">고객 지원</h4>
              <p className="mb-4">궁금한 점이 있으신가요? 연중무휴 24시간 고객센터에 문의하세요.</p>
              <p className="text-xl font-bold text-white mb-2">1588-1588</p>
              <p className="text-sm">support@peermall.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-blue-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Peermall. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Registration Modal */}
      <PeermallCreateModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
