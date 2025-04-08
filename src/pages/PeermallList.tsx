import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Removed redundant Navigation import
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import { Search, Store, MapPin, Star, ArrowRight, Filter, QrCode, User, ShoppingBag, Users } from 'lucide-react'; // Added icons
import { ShopData } from '@/types/shop';

interface PeermallWithExtras extends ShopData {
  // Using shopUrl as the unique identifier now, id might not be needed unless for mapping keys
  id: string; // Use shopUrl as the unique identifier now
  image: string; // Keep generated image
  qrCode: string; // Keep generated QR code
  specialization: 'seller' | 'buyer' | 'neutral'; // Add specialization to the extended type
}

// Removed defaultPeermalls array

const PeermallList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showQR, setShowQR] = useState<string | null>(null); // Changed showQR state to hold shopUrl (string)
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
            // Add necessary display fields
            // Use introImageUrl first, then logoUrl, then placeholder for the card image
            const cardImage = parsedData.introImageUrl || parsedData.logoUrl || `https://via.placeholder.com/400x300/E2E8F0/4A5568?text=${encodeURIComponent(parsedData.shopName)}`;

            loadedPeermalls.push({
              ...parsedData,
              id: parsedData.shopUrl, // Use shopUrl as the unique ID for mapping keys
              image: cardImage, // Use the determined image URL
              qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/shop/${parsedData.shopUrl}/home`)}`, // Generate QR code
              // Ensure default values if some fields might be missing from older stored data
              category: parsedData.category || (parsedData.shopDescription ? parsedData.shopDescription.split(' ')[0] : '일반'),
              rating: parsedData.rating || 5.0,
              location: parsedData.location || (parsedData.address ? parsedData.address.split(' ')[0] : '온라인'),
              specialization: parsedData.specialization || 'neutral', // Read specialization or default to neutral
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
    // --- End Refactored Loading Logic ---
  }, []); // Empty dependency array means this runs once on mount

  const filteredPeermalls = peermalls.filter(peermall =>
    peermall.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peermall.shopDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (peermall.category && peermall.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (peermall.location && peermall.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (peermall.specialization && peermall.specialization.toLowerCase().includes(searchTerm.toLowerCase())) // Allow searching by specialization
  );

  // Helper function to render specialization badge and tooltip (only for seller/buyer)
  const renderSpecializationBadge = (specialization: 'seller' | 'buyer' | 'neutral') => {
    // Return null if specialization is neutral or undefined
    if (!specialization || specialization === 'neutral') {
      return null;
    }

    let badgeText = '';
    let badgeVariant: "default" | "secondary" | "destructive" | "outline" = 'secondary';
    let tooltipText = '';
    let IconComponent = Users;

    switch (specialization) {
      case 'seller':
        badgeText = '판매자 특화';
        badgeVariant = 'default'; // Use default (blue) for seller
        tooltipText = '판매자 도구 및 기능에 중점을 둔 피어몰입니다.';
        IconComponent = Store;
        break;
      case 'buyer':
        badgeText = '구매자 특화';
        badgeVariant = 'outline'; // Use outline (greenish) for buyer
        tooltipText = '구매자 경험 및 추천에 중점을 둔 피어몰입니다.';
        IconComponent = ShoppingBag;
        break;
      default: // neutral
        badgeText = '중립형';
        badgeVariant = 'secondary'; // Use secondary (gray) for neutral
        tooltipText = '판매자와 구매자 모두에게 균형 잡힌 기능을 제공하는 피어몰입니다.';
        // Neutral case is handled by the initial check, so no need for it here
        break; 
    }

    // Define variant styles directly for more control
    const variantClasses = {
      default: "bg-blue-900/50 text-blue-300 border-blue-700/60",
      outline: "bg-green-900/50 text-green-300 border-green-700/60",
      secondary: "bg-gray-700/80 text-gray-300 border-gray-600/80",
      destructive: "bg-red-900/50 text-red-300 border-red-700/60" // Example if needed
    };


    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={badgeVariant} className={`cursor-default text-xs px-2 py-0.5 ${variantClasses[badgeVariant]}`}>
              <IconComponent className="h-3 w-3 mr-1" />
              {badgeText}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="bg-black border-gray-700 text-gray-200">
            <p>{tooltipText}</p>
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
              // Use shopUrl (now stored in peermall.id) as the key
               /* Card styling updated */
              <Card key={peermall.id} className="overflow-hidden bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={peermall.image}
                    alt={peermall.shopName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2">
                     {/* QR Button styling updated */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-black/50 backdrop-blur-sm border-gray-600 text-gray-200 hover:bg-black/70 rounded-full shadow-sm"
                      // Toggle QR based on shopUrl (stored in id)
                      onClick={() => setShowQR(showQR === peermall.id ? null : peermall.id)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Show QR if showQR matches the shopUrl (stored in id) */}
                  {showQR === peermall.id && (
                     /* QR Overlay styling updated */
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
                    <h3 className="text-lg font-bold text-white">{peermall.shopName}</h3>
                    <p className="text-sm text-gray-300">{peermall.category}</p>
                  </div>
                </div>
                 {/* Card content styling updated */}
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                       {/* Icon color updated */}
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                       {/* Text color updated */}
                      <span className="text-sm text-gray-400">{peermall.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                       {/* Text color updated */}
                      <span className="text-sm font-medium text-gray-200">{peermall.rating}</span>
                    </div>
                    {/* Render the specialization badge */}
                    {renderSpecializationBadge(peermall.specialization)}
                  </div>
                   {/* Text color updated */}
                  <p className="text-sm text-gray-400 line-clamp-2 mt-3">{peermall.shopDescription}</p> 
                </CardContent>
                 {/* Card footer styling updated */}
                <CardFooter className="p-4 pt-0 flex justify-end mt-auto">
                  <Link to={`/shop/${peermall.shopUrl}/home`}>
                     {/* Button styling updated */}
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-700/50">
                      방문하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
          {filteredPeermalls.length === 0 && (
            <div className="text-center py-16 bg-gray-800/50 rounded-lg border border-gray-700">
              <Store className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-200 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500 mb-6">
                다른 검색어로 다시 시도해보세요.
              </p>
               {/* Button styling updated */}
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
