
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerMall {
  id: string;
  userName: string;
  userImageUrl: string;
  mallName: string;
  url: string;
  comment: string;
  date: string;
}

interface CustomerPeerMallsProps {
  customerMalls: CustomerMall[];
}

const CustomerPeerMalls: React.FC<CustomerPeerMallsProps> = ({ customerMalls }) => {
  const navigate = useNavigate();

  const handleVisitMall = (url: string) => {
    navigate(`/shop/${url}/home`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">고객 피어몰</h2>
      <p className="text-gray-600 mb-6">다른 고객들이 만든 피어몰을 확인해보세요.</p>

      {customerMalls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customerMalls.map((mall) => (
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
    </div>
  );
};

export default CustomerPeerMalls;
