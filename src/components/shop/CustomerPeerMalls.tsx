
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis,
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/shop';

interface CustomerMall {
  id: string;
  userName: string;
  userImageUrl: string;
  mallName: string;
  url: string;
  comment: string;
  date: string;
}

interface RecommendedMall {
  id: string;
  name: string;
  logo: string;
  url: string;
  rating: number;
  category: string;
  products?: Product[];
}

interface PeerMallsProps {
  customerMalls: CustomerMall[];
  recommendedMalls: RecommendedMall[];
}

const ITEMS_PER_PAGE = 3;

const PeerMalls: React.FC<PeerMallsProps> = ({ customerMalls, recommendedMalls }) => {
  const navigate = useNavigate();
  const [customerPage, setCustomerPage] = useState(1);
  const [recommendedPage, setRecommendedPage] = useState(1);
  const [activeTab, setActiveTab] = useState("customer");

  const handleVisitMall = (url: string) => {
    navigate(`/shop/${url}/home`);
  };

  const handleViewProduct = (mallUrl: string, productId: number) => {
    navigate(`/shop/${mallUrl}/product/${productId}`);
  };

  // Pagination calculations for customer malls
  const totalCustomerPages = Math.ceil(customerMalls.length / ITEMS_PER_PAGE);
  const customerStartIndex = (customerPage - 1) * ITEMS_PER_PAGE;
  const customerEndIndex = customerStartIndex + ITEMS_PER_PAGE;
  const paginatedCustomerMalls = customerMalls.slice(customerStartIndex, customerEndIndex);

  // Pagination calculations for recommended malls
  const totalRecommendedPages = Math.ceil(recommendedMalls.length / ITEMS_PER_PAGE);
  const recommendedStartIndex = (recommendedPage - 1) * ITEMS_PER_PAGE;
  const recommendedEndIndex = recommendedStartIndex + ITEMS_PER_PAGE;
  const paginatedRecommendedMalls = recommendedMalls.slice(recommendedStartIndex, recommendedEndIndex);

  const renderCustomerPagination = () => {
    if (totalCustomerPages <= 1) return null;

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCustomerPage(prev => Math.max(prev - 1, 1))}
              className={customerPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {[...Array(totalCustomerPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={customerPage === index + 1}
                onClick={() => setCustomerPage(index + 1)}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              onClick={() => setCustomerPage(prev => Math.min(prev + 1, totalCustomerPages))}
              className={customerPage === totalCustomerPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const renderRecommendedPagination = () => {
    if (totalRecommendedPages <= 1) return null;

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setRecommendedPage(prev => Math.max(prev - 1, 1))}
              className={recommendedPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {[...Array(totalRecommendedPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={recommendedPage === index + 1}
                onClick={() => setRecommendedPage(index + 1)}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              onClick={() => setRecommendedPage(prev => Math.min(prev + 1, totalRecommendedPages))}
              className={recommendedPage === totalRecommendedPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">피어몰 탐색</h2>
      <p className="text-gray-600 mb-6">다양한 피어몰을 확인해보세요.</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="customer">고객 피어몰</TabsTrigger>
          <TabsTrigger value="recommended">추천 피어몰</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          {paginatedCustomerMalls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCustomerMalls.map((mall) => (
                <div key={mall.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                      <img 
                        src={mall.userImageUrl} 
                        alt={mall.userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/40";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{mall.mallName}</h3>
                      <p className="text-sm text-gray-500">{mall.userName}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{mall.comment}</p>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleVisitMall(mall.url)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      방문하기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 고객 피어몰이 없습니다</h3>
              <p className="text-gray-500">아직 다른 고객이 만든 피어몰이 없습니다.</p>
            </div>
          )}
          {renderCustomerPagination()}
        </TabsContent>

        <TabsContent value="recommended">
          {paginatedRecommendedMalls.length > 0 ? (
            <div className="space-y-6">
              {paginatedRecommendedMalls.map((mall) => (
                <div key={mall.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-3 bg-gray-100">
                        <img 
                          src={mall.logo} 
                          alt={mall.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/40";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{mall.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">{mall.category}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{mall.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleVisitMall(mall.url)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      방문하기
                    </Button>
                  </div>
                  
                  {mall.products && mall.products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {mall.products.slice(0, 4).map((product) => (
                        <div 
                          key={product.id} 
                          className="cursor-pointer border rounded p-2"
                          onClick={() => handleViewProduct(mall.url, product.id)}
                        >
                          <div className="h-20 bg-gray-100 rounded mb-2">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                          <p className="text-sm text-blue-600">{product.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">추천 피어몰이 없습니다</h3>
              <p className="text-gray-500">아직 추천할 피어몰이 없습니다.</p>
            </div>
          )}
          {renderRecommendedPagination()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerMalls;
