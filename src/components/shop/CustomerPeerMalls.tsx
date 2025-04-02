
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
    <div className="mt-10">
      <h2 className="text-2xl font-serif font-medium mb-6 text-gray-800">고객 큐레이션 컬렉션</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {malls.map((item, index) => {
          // Handle both array of objects and array of numbers
          const mallId = typeof item === 'object' ? item.id : item;
          const mallName = typeof item === 'object' ? item.mallName : `고객몰 ${item}`;
          const mallComment = typeof item === 'object' ? item.comment : '다양한 신상품';
          const imageUrl = typeof item === 'object' ? item.userImageUrl : `https://placehold.co/600x400/9BB5CE/FFF?text=고객몰${item}`;
          
          return (
            <div key={mallId} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={mallName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-medium text-lg text-gray-800">{mallName}</h3>
                <p className="text-gray-500 mt-2 leading-relaxed">{mallComment}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    컬렉션 둘러보기
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerPeerMalls;
