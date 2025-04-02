
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomerPeerMalls from './CustomerPeerMalls';
import RecommendedPeerMalls from './RecommendedPeerMalls';

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
          <CustomerPeerMalls currentPage={currentPage} itemsPerPage={itemsPerPage} />
          
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
          <RecommendedPeerMalls currentPage={currentPage} itemsPerPage={itemsPerPage} />
          
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
