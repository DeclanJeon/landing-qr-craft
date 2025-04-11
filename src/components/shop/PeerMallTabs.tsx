
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendedPeerMalls from './RecommendedPeerMalls';
import CustomerPeerMalls from './CustomerPeerMalls';
import { getPeermalls } from "@/utils/peermallStorage";
import { ShopData } from '@/types/shop';

const PeerMallTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>("recommended");
  const [peermalls, setPeermalls] = useState<ShopData[]>([]);
  
  useEffect(() => {
    // Load peermalls from localStorage
    const loadedPeermalls = getPeermalls();
    setPeermalls(loadedPeermalls);
  }, []);

  return (
    <div className="w-full">
      <Tabs defaultValue="recommended" onValueChange={setCurrentTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="recommended" className="flex-1">추천 피어몰</TabsTrigger>
          <TabsTrigger value="customer" className="flex-1">고객 피어몰</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="mt-0">
          <RecommendedPeerMalls />
        </TabsContent>
        <TabsContent value="customer" className="mt-0">
          <CustomerPeerMalls recommendedMalls={peermalls} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerMallTabs;
