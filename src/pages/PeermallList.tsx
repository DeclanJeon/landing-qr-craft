import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Store, MapPin, Star, ArrowRight, Filter, QrCode } from 'lucide-react';
import { ShopData } from '@/types/shop';
import { getPeermalls } from '@/utils/peermallStorage';

interface PeermallWithExtras extends ShopData {
  id: number;
  image: string;
  qrCode: string;
}

const defaultPeermalls = [
  {
    id: 1,
    shopName: "테크 월드",
    shopDescription: "최신 전자제품을 판매하는 피어몰입니다.",
    shopUrl: "tech-world",
    ownerName: "김기술",
    contactNumber: "010-1234-5678",
    email: "tech@example.com",
    address: "서울시 강남구",
    category: "전자기기",
    rating: 4.8,
    location: "서울",
    image: "https://placehold.co/400x300/4F46E5/FFFFFF?text=테크월드",
    qrCode: "https://placehold.co/200/4F46E5/FFFFFF?text=QR"
  },
  {
    id: 2,
    shopName: "패션 클로젯",
    shopDescription: "트렌디한 패션 아이템들을 만나보세요.",
    shopUrl: "fashion-closet",
    ownerName: "이패션",
    contactNumber: "010-2345-6789",
    email: "fashion@example.com",
    address: "부산시 해운대구",
    category: "패션",
    rating: 4.6,
    location: "부산",
    image: "https://placehold.co/400x300/10B981/FFFFFF?text=패션클로젯",
    qrCode: "https://placehold.co/200/10B981/FFFFFF?text=QR"
  },
  {
    id: 3,
    shopName: "홈 리빙 스토어",
    shopDescription: "집을 아름답게 꾸미는 모든 제품을 판매합니다.",
    shopUrl: "home-living",
    ownerName: "박인테리어",
    contactNumber: "010-3456-7890",
    email: "home@example.com",
    address: "인천시 연수구",
    category: "인테리어",
    rating: 4.7,
    location: "인천",
    image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=홈리빙",
    qrCode: "https://placehold.co/200/F59E0B/FFFFFF?text=QR"
  }
];

const PeermallList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showQR, setShowQR] = useState<number | null>(null);
  const [peermalls, setPeermalls] = useState<PeermallWithExtras[]>([]);
  
  useEffect(() => {
    // Get peermalls from localStorage
    const storedPeermalls = getPeermalls();
    
    // Convert stored peermalls to the format we need with default values for missing fields
    const processedPeermalls = storedPeermalls.map((peermall, index) => ({
      ...peermall,
      id: index + 1 + defaultPeermalls.length,
      category: peermall.category || (peermall.shopDescription ? peermall.shopDescription.split(' ')[0] : '일반'),
      rating: peermall.rating || 5.0,
      location: peermall.location || (peermall.address ? peermall.address.split(' ')[0] : '온라인'),
      image: `https://placehold.co/400x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${peermall.shopName}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://peermall.com/shop/${peermall.shopUrl}/home`)}`
    }));
    
    // Combine default peermalls with stored ones
    setPeermalls([...defaultPeermalls, ...processedPeermalls]);
  }, []);
  
  const filteredPeermalls = peermalls.filter(peermall => 
    peermall.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.shopDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (peermall.category && peermall.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (peermall.location && peermall.location.toLowerCase().includes(searchTerm.toLowerCase()))
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
                      alt={peermall.shopName} 
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
                          <p className="text-sm font-medium">{peermall.shopName} QR 코드</p>
                          <p className="text-xs text-gray-500">클릭하여 닫기</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">{peermall.shopName}</h3>
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
                    <p className="text-sm text-gray-600 line-clamp-2">{peermall.shopDescription}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Link to={`/shop/${peermall.shopUrl}/home`}>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        방문하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
