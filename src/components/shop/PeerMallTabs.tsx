
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomerPeerMalls from './CustomerPeerMalls';

interface PeerMallTabsProps {
  shopUrl: string;
}

const PeerMallTabs: React.FC<PeerMallTabsProps> = ({ shopUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    // For demo purposes, we'll assume there are at most 3 pages
    setCurrentPage(prev => Math.min(prev + 1, 3));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="customer">고객 피어몰</TabsTrigger>
          <TabsTrigger value="recommended">추천 피어몰</TabsTrigger>
        </TabsList>
        
        <TabsContent value="customer">
          <CustomerPeerMalls />
          
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium mx-2">
                {currentPage} / 3
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNextPage}
                disabled={currentPage === 3}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={`https://placehold.co/600x400/9BB5CE/FFF?text=추천몰${item}`} 
                    alt={`추천몰 ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="font-medium">추천 피어몰 {item}</div>
                  <div className="text-sm text-gray-500">다양한 신상품</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium mx-2">
                {currentPage} / 3
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNextPage}
                disabled={currentPage === 3}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerMallTabs;
