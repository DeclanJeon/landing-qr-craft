
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PeermallCreateModal from '@/components/PeermallCreateModal';
import { toast } from "@/hooks/use-toast";
import { getPeermalls } from "@/utils/peermallStorage";
import Navigation from '@/components/Navigation'; 
import ServiceSection from '@/components/service/ServiceSection';
import { ShopData } from "@/types/shop";
import {
  ChevronRight,
  Star,
  Store,
  ArrowRight,
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

  // Featured peermalls
  const featuredPeermalls = peermalls.length > 0
    ? [...peermalls].sort((a, b) => (b.rating || 5) - (a.rating || 5)).slice(0, 4)
    : [];

  // Recently added peermalls
  const recentPeermalls = peermalls.length > 0
    ? [...peermalls].slice(0, 8)
    : [];

  return (
    <div className="min-h-screen bg-bg-100 text-text-100">
      {/* Navigation */}
      <Navigation onOpenCreateModal={handleOpenCreateModal} />

      <main className="pb-12 pt-20">
        {/* Hero Section - Simplified */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text-100 mb-4">
              당신의 디지털 공간을 완성하세요
            </h1>
            <p className="text-xl text-text-200 mb-8">
              피어몰로 시작하는 나만의 온라인 프레즌스
            </p>
            <Button 
              onClick={handleOpenCreateModal}
              className="px-8 py-6 text-lg bg-accent-100 hover:bg-accent-200 text-bg-100"
            >
              지금 시작하기
            </Button>
          </div>
        </section>

        {/* Core Services Section */}
        <ServiceSection />

        {/* Peermall Listings */}
        <div className="container mx-auto px-4">
          {/* Peermall List Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-100">피어몰 둘러보기</h1>
              <p className="text-sm text-text-200">원하는 피어몰을 찾아보세요</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[130px] bg-bg-100 border-border text-text-100">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleOpenCreateModal} className="bg-primary-100 hover:bg-primary-100/80 text-bg-100">
                <Store className="w-4 h-4 mr-1" />
                <span>내 피어몰 만들기</span>
              </Button>
            </div>
          </div>

          {peermalls.length === 0 ? (
            <div className="text-center py-12 bg-bg-200 rounded-lg shadow-sm border border-border">
              <div className="w-16 h-16 bg-bg-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-text-200" />
              </div>
              <h3 className="text-xl font-medium text-text-100 mb-2">아직 등록된 피어몰이 없습니다</h3>
              <p className="text-text-200 mb-6">
                첫 번째 피어몰을 만들어 시작해보세요!
              </p>
              <Button onClick={handleOpenCreateModal} className="bg-primary-100 hover:bg-primary-100/80 text-bg-100">
                피어몰 시작하기
              </Button>
            </div>
          ) : (
            <>
              {/* Peermall Collections */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-text-100">추천 피어몰</h2>
                  <Link to="/peermall-list" className="text-sm text-primary-100 hover:text-primary-200 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      <div className="bg-bg-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow border border-bg-200 hover:border-primary-100">
                        <div className="h-40 overflow-hidden relative">
                          <img
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}`}
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-200/70 to-transparent p-3">
                            <div className="flex items-center text-bg-100">
                              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-xs">{mall.rating || "5.0"}</span>
                            </div>
                          </div>
                          {mall.specialization && (
                            <Badge className="absolute top-2 left-2 bg-primary-100 hover:bg-primary-100/80 text-bg-100 border-none">
                              {mall.specialization}
                            </Badge>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 text-text-100">{mall.shopName}</h3>
                          <p className="text-xs text-text-200 line-clamp-2">
                            {mall.shopDescription || '다양한 제품을 합리적인 가격에 만나보세요.'}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-text-200">방문수: {Math.floor(Math.random() * 5000) + 100}</span>
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
                  <h2 className="text-xl font-bold text-text-100">최근 등록된 피어몰</h2>
                  <Link to="/peermall-list" className="text-sm text-primary-100 hover:text-primary-200 flex items-center">
                    모두 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentPeermalls.map((mall) => (
                    <Link key={mall.shopUrl} to={`/shop/${mall.shopUrl}/home`}>
                      <div className="bg-bg-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow h-full border border-bg-200 hover:border-primary-100">
                        <div className="h-32 overflow-hidden">
                          <img
                            src={mall.introImageUrl || mall.logoUrl || `https://picsum.photos/400/300?random=${mall.shopName}-recent`}
                            alt={mall.shopName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm mb-1 line-clamp-1 text-text-100">{mall.shopName}</h3>
                          <div className="flex items-center text-xs text-text-200">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1">{mall.rating || "5.0"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
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
