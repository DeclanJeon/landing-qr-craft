import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendedPeerMalls from './RecommendedPeerMalls';
import CustomerPeerMalls from './CustomerPeerMalls';

const PeerMallTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>("recommended");

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
          <CustomerPeerMalls />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerMallTabs;
