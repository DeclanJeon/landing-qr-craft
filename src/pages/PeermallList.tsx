
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Store, MapPin, Star, ArrowRight, Filter, QrCode } from 'lucide-react';

// 샘플 피어몰 데이터
const peermalls = [
  {
    id: 1,
    name: "테크 월드",
    description: "최신 전자제품을 판매하는 피어몰입니다.",
    category: "전자기기",
    rating: 4.8,
    location: "서울",
    image: "https://placehold.co/400x300/4F46E5/FFFFFF?text=테크월드",
    qrCode: "https://placehold.co/200/4F46E5/FFFFFF?text=QR"
  },
  {
    id: 2,
    name: "패션 클로젯",
    description: "트렌디한 패션 아이템들을 만나보세요.",
    category: "패션",
    rating: 4.6,
    location: "부산",
    image: "https://placehold.co/400x300/10B981/FFFFFF?text=패션클로젯",
    qrCode: "https://placehold.co/200/10B981/FFFFFF?text=QR"
  },
  {
    id: 3,
    name: "홈 리빙 스토어",
    description: "집을 아름답게 꾸미는 모든 제품을 판매합니다.",
    category: "인테리어",
    rating: 4.7,
    location: "인천",
    image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=홈리빙",
    qrCode: "https://placehold.co/200/F59E0B/FFFFFF?text=QR"
  },
  {
    id: 4,
    name: "오가닉 마켓",
    description: "무농약 유기농 식품을 제공하는 피어몰입니다.",
    category: "식품",
    rating: 4.9,
    location: "대전",
    image: "https://placehold.co/400x300/84CC16/FFFFFF?text=오가닉마켓",
    qrCode: "https://placehold.co/200/84CC16/FFFFFF?text=QR"
  },
  {
    id: 5,
    name: "뷰티 샵",
    description: "화장품과 뷰티 제품을 판매합니다.",
    category: "화장품",
    rating: 4.5,
    location: "대구",
    image: "https://placehold.co/400x300/EC4899/FFFFFF?text=뷰티샵",
    qrCode: "https://placehold.co/200/EC4899/FFFFFF?text=QR"
  },
  {
    id: 6,
    name: "키즈 플래닛",
    description: "아이들을 위한 다양한 장난감과 교육용품을 판매합니다.",
    category: "유아/아동",
    rating: 4.6,
    location: "광주",
    image: "https://placehold.co/400x300/8B5CF6/FFFFFF?text=키즈플래닛",
    qrCode: "https://placehold.co/200/8B5CF6/FFFFFF?text=QR"
  },
  {
    id: 7,
    name: "스포츠 월드",
    description: "다양한 스포츠 용품을 판매하는 피어몰입니다.",
    category: "스포츠",
    rating: 4.7,
    location: "울산",
    image: "https://placehold.co/400x300/3B82F6/FFFFFF?text=스포츠월드",
    qrCode: "https://placehold.co/200/3B82F6/FFFFFF?text=QR"
  },
  {
    id: 8,
    name: "북 스토어",
    description: "다양한 장르의 도서를 판매합니다.",
    category: "도서",
    rating: 4.8,
    location: "세종",
    image: "https://placehold.co/400x300/0EA5E9/FFFFFF?text=북스토어",
    qrCode: "https://placehold.co/200/0EA5E9/FFFFFF?text=QR"
  },
  {
    id: 9,
    name: "펫 하우스",
    description: "반려동물을 위한 모든 제품을 판매합니다.",
    category: "반려동물",
    rating: 4.9,
    location: "경기",
    image: "https://placehold.co/400x300/F43F5E/FFFFFF?text=펫하우스",
    qrCode: "https://placehold.co/200/F43F5E/FFFFFF?text=QR"
  },
  {
    id: 10,
    name: "DIY 공방",
    description: "직접 만들 수 있는 DIY 키트와 재료를 판매합니다.",
    category: "취미",
    rating: 4.7,
    location: "강원",
    image: "https://placehold.co/400x300/6366F1/FFFFFF?text=DIY공방",
    qrCode: "https://placehold.co/200/6366F1/FFFFFF?text=QR"
  }
];

const PeermallList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showQR, setShowQR] = useState<number | null>(null);
  
  const filteredPeermalls = peermalls.filter(peermall => 
    peermall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <h1 className="text-3xl font-bold">등록된 피어몰 리스트</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="피어몰 검색..." 
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="px-3 mb-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>모든 카테고리</span>
                </Button>
              </div>
              <div className="px-3 mb-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>모든 지역</span>
                </Button>
              </div>
              <div className="px-3 mb-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>평점순</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeermalls.map(peermall => (
                <Card key={peermall.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={peermall.image} 
                      alt={peermall.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 bg-white rounded-full shadow-sm"
                        onClick={() => setShowQR(showQR === peermall.id ? null : peermall.id)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                    {showQR === peermall.id && (
                      <div className="absolute inset-0 bg-white flex items-center justify-center p-4" onClick={() => setShowQR(null)}>
                        <div className="text-center">
                          <img src={peermall.qrCode} alt="QR Code" className="w-32 h-32 mx-auto mb-2" />
                          <p className="text-sm font-medium">{peermall.name} QR 코드</p>
                          <p className="text-xs text-gray-500">클릭하여 닫기</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">{peermall.name}</h3>
                      <p className="text-sm text-white/90">{peermall.category}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{peermall.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        <span className="text-sm font-medium">{peermall.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{peermall.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      방문하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredPeermalls.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <Store className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-500 mb-6">
                  다른 검색어로 다시 시도해보세요.
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  모든 피어몰 보기
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeermallList;
