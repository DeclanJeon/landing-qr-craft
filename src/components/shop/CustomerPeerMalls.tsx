
import React from 'react';

interface PeerMallsProps {
  currentPage?: number;
  itemsPerPage?: number;
  recommendedMalls?: any[];
  customerMalls?: any[];
}

const CustomerPeerMalls: React.FC<PeerMallsProps> = ({ 
  currentPage = 1, 
  itemsPerPage = 4,
  customerMalls = [],
  recommendedMalls = []
}) => {
  // Calculate start and end indices for pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  
  // If customerMalls is provided and not empty, use it instead of default data
  const malls = customerMalls.length > 0 ? customerMalls : [1, 2, 3, 4];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {malls.map((item, index) => {
        // Handle both array of objects and array of numbers
        const mallId = typeof item === 'object' ? item.id : item;
        const mallName = typeof item === 'object' ? item.mallName : `고객몰 ${item}`;
        const mallComment = typeof item === 'object' ? item.comment : '다양한 신상품';
        const imageUrl = typeof item === 'object' ? item.userImageUrl : `https://placehold.co/600x400/9BB5CE/FFF?text=고객몰${item}`;
        
        return (
          <div key={mallId} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100">
              <img 
                src={imageUrl} 
                alt={mallName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <div className="font-medium">{mallName}</div>
              <div className="text-sm text-gray-500">{mallComment}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerPeerMalls;
