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
// Removed getPeermalls import

interface PeermallWithExtras extends ShopData {
  // Using shopUrl as the unique identifier now, id might not be needed unless for mapping keys
  id: string; // Changed id to string (shopUrl)
  image: string; // Keep generated image
  qrCode: string; // Keep generated QR code
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
            loadedPeermalls.push({
              ...parsedData,
              id: parsedData.shopUrl, // Use shopUrl as the unique ID for mapping keys
              image: `https://placehold.co/400x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(parsedData.shopName)}`, // Generate placeholder image
              qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/shop/${parsedData.shopUrl}/home`)}`, // Generate QR code
              // Ensure default values if some fields might be missing from older stored data
              category: parsedData.category || (parsedData.shopDescription ? parsedData.shopDescription.split(' ')[0] : '일반'),
              rating: parsedData.rating || 5.0,
              location: parsedData.location || (parsedData.address ? parsedData.address.split(' ')[0] : '온라인'),
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
    (peermall.location && peermall.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
                // Use shopUrl (now stored in peermall.id) as the key
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
                        // Toggle QR based on shopUrl (stored in id)
                        onClick={() => setShowQR(showQR === peermall.id ? null : peermall.id)} 
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Show QR if showQR matches the shopUrl (stored in id) */}
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
