
import React from 'react';

interface PeerMallsProps {
  currentPage?: number;
  itemsPerPage?: number;
}

const CustomerPeerMalls: React.FC<PeerMallsProps> = ({ 
  currentPage = 1, 
  itemsPerPage = 4 
}) => {
  // Calculate start and end indices for pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gray-100">
            <img 
              src={`https://placehold.co/600x400/9BB5CE/FFF?text=고객몰${item}`} 
              alt={`고객몰 ${item}`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3">
            <div className="font-medium">고객 피어몰 {item}</div>
            <div className="text-sm text-gray-500">다양한 신상품</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerPeerMalls;
