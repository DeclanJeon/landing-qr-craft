
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';

interface PeerMall {
  id: string;
  name: string;
  logo: string;
  url: string;
  products: Product[];
}

interface PeerMallRecommendationsProps {
  peerMalls: PeerMall[];
}

const PeerMallRecommendations: React.FC<PeerMallRecommendationsProps> = ({ peerMalls }) => {
  const navigate = useNavigate();

  const handleVisitMall = (url: string) => {
    navigate(`/shop/${url}/home`);
  };

  const handleViewProduct = (mallUrl: string, productId: number) => {
    navigate(`/shop/${mallUrl}/product/${productId}`);
  };

  if (peerMalls.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">추천 피어몰</h2>
      <div className="space-y-8">
        {peerMalls.map((mall) => (
          <div key={mall.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                  <img 
                    src={mall.logo} 
                    alt={mall.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/40";
                    }}
                  />
                </div>
                <h3 className="font-medium">{mall.name}</h3>
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
            
            {mall.products.length > 0 && (
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
    </div>
  );
};

export default PeerMallRecommendations;
