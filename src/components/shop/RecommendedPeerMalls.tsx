
import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingBag, Users, Globe } from 'lucide-react';

interface RecommendedPeerMallsProps {
  currentPage?: number;
  itemsPerPage?: number;
}

// Define mall type enum for consistency
type MallType = 'seller' | 'buyer' | 'neutral';

// Mock data with added mall type
const mockMalls = [
  { id: 1, name: '추천 피어몰 1', category: '다양한 신상품', type: 'seller' as MallType },
  { id: 2, name: '추천 피어몰 2', category: '다양한 신상품', type: 'buyer' as MallType },
  { id: 3, name: '추천 피어몰 3', category: '다양한 신상품', type: 'neutral' as MallType },
  { id: 4, name: '추천 피어몰 4', category: '다양한 신상품', type: 'seller' as MallType },
];

const RecommendedPeerMalls: React.FC<RecommendedPeerMallsProps> = ({ 
  currentPage = 1, 
  itemsPerPage = 4 
}) => {
  // Calculate start and end indices for pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  
  // Get paginated data
  const paginatedMalls = mockMalls.slice(startIdx, endIdx);

  // Render mall type badge with tooltip
  const renderMallTypeBadge = (type: MallType) => {
    let badgeContent = {
      label: '중립형',
      description: '판매자와 구매자 모두에게 균형있는 기능을 제공하는 피어몰입니다.',
      icon: <Globe className="h-3 w-3 mr-1" />,
      variant: "secondary" as const,
      colors: "bg-blue-900/30 text-blue-300 border-blue-700/30"
    };

    if (type === 'seller') {
      badgeContent = {
        label: '판매자 특화',
        description: '판매 도구와 판매자 기능에 특화된 피어몰입니다.',
        icon: <ShoppingBag className="h-3 w-3 mr-1" />,
        variant: "secondary" as const,
        colors: "bg-purple-900/30 text-purple-300 border-purple-700/30"
      };
    } else if (type === 'buyer') {
      badgeContent = {
        label: '구매자 특화',
        description: '쇼핑 경험과 구매자 기능에 특화된 피어몰입니다.',
        icon: <Users className="h-3 w-3 mr-1" />,
        variant: "secondary" as const,
        colors: "bg-green-900/30 text-green-300 border-green-700/30"
      };
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={badgeContent.variant} 
              className={`ml-2 ${badgeContent.colors} border px-2 py-0.5 text-xs font-medium flex items-center`}
            >
              {badgeContent.icon}
              {badgeContent.label}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-800 border-gray-700 text-white p-3 max-w-xs">
            <p>{badgeContent.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {paginatedMalls.map((mall) => (
        <div key={mall.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gray-100 relative">
            <img 
              src={`https://placehold.co/600x400/9BB5CE/FFF?text=추천몰${mall.id}`} 
              alt={`추천몰 ${mall.id}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 flex items-center">
              {renderMallTypeBadge(mall.type)}
            </div>
          </div>
          <div className="p-3">
            <div className="font-medium">{mall.name}</div>
            <div className="text-sm text-gray-500">{mall.category}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedPeerMalls;
