
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, Store, MapPin, Star, ArrowRight, Filter, QrCode, ShoppingBag, Users, Globe } from 'lucide-react';
import { ShopData } from '@/types/shop';

interface PeermallWithExtras extends ShopData {
  id: string;
  image: string;
  qrCode: string;
  type: 'seller' | 'buyer' | 'neutral'; // Classification type
}

const PeermallList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showQR, setShowQR] = useState<string | null>(null);
  const [peermalls, setPeermalls] = useState<PeermallWithExtras[]>([]);

  useEffect(() => {
    // --- Refactored Loading Logic ---
    const shopUrlsKey = 'peermallShopUrls';
    const loadedPeermalls: PeermallWithExtras[] = [];

    try {
      const urlsString = localStorage.getItem(shopUrlsKey);
      const shopUrls: string[] = urlsString ? JSON.parse(urlsString) : [];

      shopUrls.forEach(url => {
        const uniqueShopKey = `peermallShopData_${url}`;
        const shopDataString = localStorage.getItem(uniqueShopKey);
        if (shopDataString) {
          try {
            const parsedData: ShopData = JSON.parse(shopDataString);
            
            // Determine mall type based on description or other characteristics
            // This is a simple algorithm - in production, this should be based on actual data or user settings
            let mallType: 'seller' | 'buyer' | 'neutral' = 'neutral';
            
            const description = parsedData.shopDescription?.toLowerCase() || '';
            if (description.includes('판매') || description.includes('sell') || description.includes('vendor')) {
              mallType = 'seller';
            } else if (description.includes('구매') || description.includes('buy') || description.includes('shop')) {
              mallType = 'buyer';
            }
            
            // Use introImageUrl first, then logoUrl, then placeholder for the card image
            const cardImage = parsedData.introImageUrl || parsedData.logoUrl || `https://via.placeholder.com/400x300/E2E8F0/4A5568?text=${encodeURIComponent(parsedData.shopName)}`;

            loadedPeermalls.push({
              ...parsedData,
              id: parsedData.shopUrl,
              image: cardImage,
              qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/shop/${parsedData.shopUrl}/home`)}`,
              category: parsedData.category || (parsedData.shopDescription ? parsedData.shopDescription.split(' ')[0] : '일반'),
              rating: parsedData.rating || 5.0,
              location: parsedData.location || (parsedData.address ? parsedData.address.split(' ')[0] : '온라인'),
              type: mallType // Add mall classification type
            });
          } catch (parseError) {
            console.error(`Error parsing shop data for ${url}:`, parseError);
          }
        } else {
          console.warn(`Shop data not found for URL: ${url}`);
        }
      });
    } catch (error) {
      console.error("Error loading peermall list:", error);
    }

    setPeermalls(loadedPeermalls);
  }, []);

  const filteredPeermalls = peermalls.filter(peermall =>
    peermall.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.shopDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (peermall.category && peermall.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (peermall.location && peermall.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render shop type badge with tooltip
  const renderShopTypeBadge = (type: 'seller' | 'buyer' | 'neutral') => {
    let badgeContent = {
      label: '중립형',
      description: '판매자와 구매자 모두에게 균형있는 기능을 제공하는 피어몰입니다.',
      icon: <Globe className="h-3 w-3 mr-1" />,
      variant: "secondary" as const,
      colors: "bg-blue-900/30 text-blue-300 border-blue-700/30"
    };

    if (type === 'seller') {
      badgeContent = {
        label: '판매자 특화',
        description: '판매 도구와 판매자 기능에 특화된 피어몰입니다.',
        icon: <ShoppingBag className="h-3 w-3 mr-1" />,
        variant: "secondary" as const,
        colors: "bg-purple-900/30 text-purple-300 border-purple-700/30"
      };
    } else if (type === 'buyer') {
      badgeContent = {
        label: '구매자 특화',
        description: '쇼핑 경험과 구매자 기능에 특화된 피어몰입니다.',
        icon: <Users className="h-3 w-3 mr-1" />,
        variant: "secondary" as const,
        colors: "bg-green-900/30 text-green-300 border-green-700/30"
      };
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={badgeContent.variant} 
              className={`ml-2 ${badgeContent.colors} border px-2 py-0.5 text-xs font-medium flex items-center`}
            >
              {badgeContent.icon}
              {badgeContent.label}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-800 border-gray-700 text-white p-3 max-w-xs">
            <p>{badgeContent.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    // Apply dark theme background and adjust padding
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-6"> {/* Consistent padding */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10"> {/* Increased margin */}
             {/* Update text color */}
            <h1 className="text-3xl font-bold text-white">등록된 피어몰 리스트</h1>
            <div className="relative">
               {/* Update icon color */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
               {/* Update input style */}
              <Input
                placeholder="피어몰 검색..."
                className="pl-10 w-full md:w-64 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons - Dark theme */}
          <div className="flex flex-wrap -mx-2 mb-8">
            <div className="px-2 mb-3">
              <Button variant="outline" size="sm" className="flex items-center border-gray-600 ">
                <Filter className="h-4 w-4 mr-2" />
                <span>모든 카테고리</span>
              </Button>
            </div>
            <div className="px-2 mb-3">
              <Button variant="outline" size="sm" className="flex items-center border-gray-600 ">
                <Filter className="h-4 w-4 mr-2" />
                <span>모든 지역</span>
              </Button>
            </div>
            <div className="px-2 mb-3">
              <Button variant="outline" size="sm" className="flex items-center border-gray-600 ">
                <Filter className="h-4 w-4 mr-2" />
                <span>평점순</span>
              </Button>
            </div>
          </div>

          {/* Grid - Increased gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeermalls.map(peermall => (
              <Card key={peermall.id} className="overflow-hidden bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 flex flex-col">
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
                      className="h-8 w-8 bg-black/50 backdrop-blur-sm border-gray-600 text-gray-200 hover:bg-black/70 rounded-full shadow-sm"
                      onClick={() => setShowQR(showQR === peermall.id ? null : peermall.id)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                  {showQR === peermall.id && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer" onClick={() => setShowQR(null)}>
                      <div className="text-center bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <img src={peermall.qrCode} alt="QR Code" className="w-32 h-32 mx-auto mb-2 border rounded bg-white p-1" />
                        <p className="text-sm font-medium text-gray-100">{peermall.shopName} QR 코드</p>
                        <p className="text-xs text-gray-500">클릭하여 닫기</p>
                      </div>
                    </div>
                  )}
                  {/* Gradient overlay adjusted */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center flex-wrap">
                      <h3 className="text-lg font-bold text-white">{peermall.shopName}</h3>
                      {renderShopTypeBadge(peermall.type)}
                    </div>
                    <p className="text-sm text-gray-300">{peermall.category}</p>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">{peermall.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                      <span className="text-sm font-medium text-gray-200">{peermall.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{peermall.shopDescription}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end mt-auto">
                  <Link to={`/shop/${peermall.shopUrl}/home`}>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-700/50">
                      방문하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No results message - Dark theme */}
          {filteredPeermalls.length === 0 && (
            <div className="text-center py-16 bg-gray-800/50 rounded-lg border border-gray-700">
              <Store className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-200 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500 mb-6">
                다른 검색어로 다시 시도해보세요.
              </p>
              <Button onClick={() => setSearchTerm('')} className="bg-blue-600 hover:bg-blue-700 text-white">
                모든 피어몰 보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeermallList;