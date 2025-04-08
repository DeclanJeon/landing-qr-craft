import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { ShopData } from '@/types/shop'; // Import ShopData type

// Update props to accept ShopData array for recommendedMalls
interface PeerMallsProps {
  recommendedMalls?: ShopData[]; // Changed type to ShopData[]
}

const CustomerPeerMalls: React.FC<PeerMallsProps> = ({
  recommendedMalls = [] // Default to empty array
}) => {

  // If no registered malls, display a message or return null
  if (recommendedMalls.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        <h2 className="text-2xl font-serif font-medium mb-6 text-gray-800">다른 피어몰 리스트</h2>
        <p>아직 등록된 다른 피어몰이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-serif font-medium mb-6 text-gray-800">다른 피어몰 리스트</h2>
      {/* Use the recommendedMalls data (ShopData[]) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedMalls.map((mall) => {
          // Use data from ShopData object
          const mallId = mall.shopUrl; // Use shopUrl as a unique key
          const mallName = mall.shopName;
          const mallDescription = mall.shopDescription || '피어몰 설명이 없습니다.'; // Fallback description
          // Use introImageUrl first, then logoUrl, then placeholder
          const imageUrl = mall.introImageUrl || mall.logoUrl || `https://via.placeholder.com/600x400/E2E8F0/4A5568?text=${encodeURIComponent(mallName)}`;

          return (
            // Wrap the card content with a Link to the mall's page
            <Link to={`/shop/${mall.shopUrl}/home`} key={mallId} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={imageUrl}
                  alt={mallName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-medium text-lg text-gray-800 truncate">{mallName}</h3> {/* Added truncate */}
                <p className="text-gray-500 mt-2 leading-relaxed text-sm line-clamp-2">{mallDescription}</p> {/* Added line-clamp */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm text-blue-600 group-hover:text-blue-800 transition-colors"> {/* Changed hover effect */}
                    피어몰 방문하기
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link> // Correctly closing the Link tag here
          );
        })}
      </div>
    </div>
  );
};

export default CustomerPeerMalls;
