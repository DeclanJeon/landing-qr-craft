
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';

interface RecommendedMall {
  id: string;
  name: string;
  logo: string;
  url: string;
  rating: number;
  category: string;
  products?: Product[];
}

interface RecommendedPeerMallsProps {
  recommendedMalls: RecommendedMall[];
}

const RecommendedPeerMalls: React.FC<RecommendedPeerMallsProps> = ({ recommendedMalls }) => {
  const navigate = useNavigate();

  const handleVisitMall = (url: string) => {
    navigate(`/shop/${url}/home`);
  };

  const handleViewProduct = (mallUrl: string, productId: number) => {
    navigate(`/shop/${mallUrl}/product/${productId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">추천 피어몰</h2>
      <p className="text-gray-600 mb-6">인기 있는 피어몰을 확인해보세요.</p>

      {recommendedMalls.length > 0 ? (
        <div className="space-y-6">
          {recommendedMalls.map((mall) => (
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
    </div>
  );
};

export default RecommendedPeerMalls;
