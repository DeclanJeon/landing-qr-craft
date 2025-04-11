
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
  Menu,
  Globe,
  Shield,
  Zap,
  Bookmark
} from "lucide-react";

// Main Hero Section
const HeroBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-xl">
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-white/5 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-blue-500/5 animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="absolute inset-0 z-10">
        <div className="container h-full mx-auto px-4 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                당신을 위한 프리미엄<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  쇼핑 경험
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                피어몰에서 엄선된 프리미엄 제품과 서비스를 만나보세요. 새로운 쇼핑 경험을 선사합니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                  둘러보기
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg">
                  내 피어몰 시작하기
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex justify-center items-center relative"
            >
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/c45cb3ed-cd99-46e3-a59f-aa8d7072cdbc.png"
                  alt="Premium Products"
                  className="max-h-[350px] object-contain"
                />
                {/* Floating badges */}
                <div className="absolute -left-4 top-12 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-sm">100% 정품 보증</span>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/3 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-medium text-sm">빠른 배송</span>
                  </div>
                </div>
                <div className="absolute bottom-12 left-1/4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <span className="font-medium text-sm">고객 만족도 97%</span>
                  </div>
                </div>
              </div>
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Products Section
const FeaturedProducts = () => {
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
    }
  ];
  
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-medium text-gray-900">베스트 셀러</h2>
        <Button variant="link" className="font-medium text-blue-600 flex items-center gap-1">
          전체보기 <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-white/90">
                    <ShoppingCart className="h-4 w-4 mr-2" /> 
                    장바구니에 추가
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
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
        ))}
      </div>
    </section>
  );
};

// Categories Section with elegant design
const CategoriesSection = () => {
  const categories = [
    { id: 1, name: "패션", icon: <Tag className="h-6 w-6" />, color: "from-blue-500 to-indigo-600", count: 124 },
    { id: 2, name: "뷰티", icon: <Sparkles className="h-6 w-6" />, color: "from-pink-500 to-rose-500", count: 89 },
    { id: 3, name: "테크", icon: <Layers className="h-6 w-6" />, color: "from-indigo-500 to-purple-600", count: 65 },
    { id: 4, name: "홈", icon: <Gift className="h-6 w-6" />, color: "from-amber-500 to-orange-600", count: 112 },
    { id: 5, name: "여행", icon: <Globe className="h-6 w-6" />, color: "from-emerald-500 to-teal-600", count: 47 },
    { id: 6, name: "건강", icon: <Heart className="h-6 w-6" />, color: "from-red-500 to-rose-600", count: 58 },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-gray-900 mb-3">카테고리 둘러보기</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            다양한 카테고리에서 엄선된 최고의 제품을 만나보세요. 당신의 라이프스타일에 맞는 특별한 아이템이 기다리고 있습니다.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
              className="group bg-white rounded-xl border border-gray-100 p-6 text-center cursor-pointer"
            >
              <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-lg mb-1 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-500 text-sm">{category.count}개 상품</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// VIP Section with luxury appeal
const VipSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-slate-900 to-gray-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <Badge className="bg-amber-500 text-white border-0 mb-4 w-fit">VIP EXCLUSIVE</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              VIP 멤버십으로<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                특별한 혜택
              </span>을 누리세요
            </h2>
            <p className="text-gray-300 mb-8">
              프리미엄 고객을 위한 특별한 혜택과 서비스를 제공합니다. 
              VIP 멤버십에 가입하고 특별한 쇼핑 경험을 즐기세요.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-amber-500/20 rounded-full p-1 mt-1 mr-3">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-gray-200">모든 상품 5% 추가 할인</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-500/20 rounded-full p-1 mt-1 mr-3">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-gray-200">신상품 우선 알림 및 선구매 기회</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-500/20 rounded-full p-1 mt-1 mr-3">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-gray-200">전담 쇼핑 어드바이저 서비스</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-500/20 rounded-full p-1 mt-1 mr-3">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-gray-200">프리미엄 배송 서비스 (당일/익일)</span>
              </li>
            </ul>
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white w-fit px-8 py-3 rounded-lg shadow-lg">
              VIP 멤버십 가입하기
            </Button>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1573739711422-34a9d2b3f8a7?q=80&w=1970&auto=format&fit=crop" 
              alt="VIP Experience" 
              className="h-full w-full object-cover"
            />
            {/* VIP Badge Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-md rounded-full"></div>
                <div className="relative bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full w-32 h-32 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">VIP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trending Products with Tabs
const TrendingProducts = () => {
  const productsByCategory = {
    all: [
      {
        id: 1,
        name: "Ultra HD Smart TV",
        price: "₩1,299,000",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
        badge: "신상",
        rating: 4.9
      },
      {
        id: 2,
        name: "Premium Coffee Machine",
        price: "₩549,000",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=2070&auto=format&fit=crop",
        badge: "",
        rating: 4.7
      },
      {
        id: 3,
        name: "Designer Sunglasses",
        price: "₩389,000",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
        badge: "인기",
        rating: 4.8
      },
      {
        id: 4,
        name: "Portable Bluetooth Speaker",
        price: "₩229,000",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
        badge: "할인",
        rating: 4.6
      }
    ],
    tech: [
      {
        id: 1,
        name: "Ultra HD Smart TV",
        price: "₩1,299,000",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
        badge: "신상",
        rating: 4.9
      },
      {
        id: 5,
        name: "Wireless Earbuds Pro",
        price: "₩279,000",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2070&auto=format&fit=crop",
        badge: "",
        rating: 4.8
      },
      {
        id: 4,
        name: "Portable Bluetooth Speaker",
        price: "₩229,000",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
        badge: "할인",
        rating: 4.6
      },
      {
        id: 6,
        name: "Smart Home Hub",
        price: "₩199,000",
        image: "https://images.unsplash.com/photo-1558002038-1055e2dae2d7?q=80&w=2070&auto=format&fit=crop",
        badge: "",
        rating: 4.5
      }
    ],
    home: [
      {
        id: 7,
        name: "Modern Lounge Chair",
        price: "₩789,000",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974&auto=format&fit=crop",
        badge: "",
        rating: 4.7
      },
      {
        id: 2,
        name: "Premium Coffee Machine",
        price: "₩549,000",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=2070&auto=format&fit=crop",
        badge: "",
        rating: 4.7
      },
      {
        id: 8,
        name: "Ceramic Dinnerware Set",
        price: "₩369,000",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
        badge: "신상",
        rating: 4.9
      },
      {
        id: 9,
        name: "Luxury Bed Linen",
        price: "₩459,000",
        image: "https://images.unsplash.com/photo-1584100936595-c0848df6ef08?q=80&w=2069&auto=format&fit=crop",
        badge: "",
        rating: 4.8
      }
    ],
    fashion: [
      {
        id: 10,
        name: "Designer Watch",
        price: "₩1,890,000",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
        badge: "프리미엄",
        rating: 5.0
      },
      {
        id: 3,
        name: "Designer Sunglasses",
        price: "₩389,000",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
        badge: "인기",
        rating: 4.8
      },
      {
        id: 11,
        name: "Luxury Handbag",
        price: "₩2,490,000",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
        badge: "",
        rating: 4.9
      },
      {
        id: 12,
        name: "Premium Leather Boots",
        price: "₩890,000",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1974&auto=format&fit=crop",
        badge: "",
        rating: 4.7
      }
    ]
  };
  
  const ProductCard = ({ product }) => {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-50">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                {product.badge}
              </Badge>
            )}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm ml-1 font-medium">{product.rating}</span>
            </div>
            <Button variant="outline" size="icon" className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white border-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{product.price}</span>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-medium text-gray-900">트렌딩 제품</h2>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">더 많은 상품</span>
          <Button variant="outline" size="sm" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-8">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10 font-medium"
          >
            전체
          </TabsTrigger>
          <TabsTrigger 
            value="tech" 
            className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10 font-medium"
          >
            테크
          </TabsTrigger>
          <TabsTrigger 
            value="home" 
            className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10 font-medium"
          >
            홈리빙
          </TabsTrigger>
          <TabsTrigger 
            value="fashion" 
            className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none h-10 font-medium"
          >
            패션
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productsByCategory.all.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tech" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productsByCategory.tech.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="home" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productsByCategory.home.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="fashion" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productsByCategory.fashion.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <Badge className="bg-white text-blue-600 border-0 mb-4">NEWSLETTER</Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              최신 제품과 특별한 혜택<br />
              가장 먼저 받아보세요
            </h2>
            <p className="text-blue-100 mb-8">
              뉴스레터에 가입하고 프리미엄 제품 출시, 특별 혜택, 비공개 세일 정보를 먼저 받아보세요.
              구독자에게는 첫 구매 10% 할인 쿠폰을 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="이메일 주소 입력" 
                className="bg-white/90 border-0 placeholder:text-gray-500"
              />
              <Button className="bg-white text-blue-600 hover:bg-white/90 border-0 whitespace-nowrap">
                구독하기
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-3">
              ✓ 언제든지 구독을 취소할 수 있으며, 개인정보는 안전하게 보호됩니다.
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center relative p-12">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/4f55e5d0-3fb9-4d4c-8be3-5f63048cbaf9.png"
                alt="Exclusive Products"
                className="max-h-[250px] object-contain"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-400/30 blur-xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400/30 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-6 pb-4">
          <HeroBanner />
        </section>
        
        {/* Categories Section */}
        <CategoriesSection />
        
        {/* Best Sellers Section */}
        <FeaturedProducts />
        
        {/* VIP Section */}
        <VipSection />
        
        {/* Trending Products with Tabs */}
        <TrendingProducts />
        
        {/* Newsletter Section */}
        <NewsletterSection />
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
                피어몰은 고객에게 최상의 쇼핑 경험과 프리미엄 제품을 제공하는 플랫폼입니다.
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

      {/* Product Registration Modal */}
      <PeermallCreateModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
