
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Clock } from 'lucide-react';
import { ShopData } from '@/types/shop';

interface PeermallListProps {
  peermalls: ShopData[];
  title: string;
  showMore?: boolean;
  onShowMore?: () => void;
  emptyMessage?: string;
}

const PeermallList: React.FC<PeermallListProps> = ({ 
  peermalls, 
  title, 
  showMore = false, 
  onShowMore, 
  emptyMessage = "등록된 피어몰이 없습니다."
}) => {
  if (peermalls.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500 mb-4">새로운 피어몰을 등록해보세요.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium">{title}</h2>
        {showMore && (
          <Button 
            variant="ghost" 
            className="text-blue-600 flex items-center gap-1"
            onClick={onShowMore}
          >
            더보기 <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {peermalls.map((mall) => (
          <motion.div
            key={mall.shopUrl}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Card className="overflow-hidden border-gray-100 hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mall.introImageUrl || mall.logoUrl || `https://via.placeholder.com/400x300?text=${encodeURIComponent(mall.shopName)}`}
                  alt={mall.shopName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {mall.specialization && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
                    {mall.specialization}
                  </Badge>
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm ml-1 font-medium">{mall.rating || "5.0"}</span>
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                    {mall.shopName}
                  </h3>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    NEW
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                  {mall.shopDescription || '피어몰에서 다양한 제품을 만나보세요.'}
                </p>
                <Link to={`/shop/${mall.shopUrl}/home`} className="mt-auto">
                  <Button variant="ghost" className="w-full justify-between text-blue-600 group-hover:bg-blue-50">
                    방문하기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PeermallList;
