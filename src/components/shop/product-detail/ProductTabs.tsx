
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorsList from './VendorsList';
import MyProductList from './MyProductList';
import ReviewsTab from './ReviewsTab';
import MyMallsTab from './MyMallsTab';
import PeerMallRecommendations from './PeerMallRecommendations';
import { Product } from '@/types/shop';

interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
  rating?: number;
  likes?: number;
}

interface MyMall {
  id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
  date: string;
}

interface PeerMall {
  id: string;
  name: string;
  logo: string;
  url: string;
  products: Product[];
}

interface ProductTabsProps {
  shopUrl?: string;
  product: Product;
  relatedProducts: Product[];
  vendors: { name: string; rating: number; price: string; }[];
  reviews: Review[];
  myMalls: MyMall[];
  peerMalls: PeerMall[];
  handleDeleteReview: (reviewId: string) => void;
  setIsAddingReview: (isAdding: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  shopUrl,
  product,
  relatedProducts,
  vendors,
  reviews,
  myMalls,
  peerMalls,
  handleDeleteReview,
  setIsAddingReview,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="my-products">내 상품 목록</TabsTrigger>
        <TabsTrigger value="reviews">리뷰 모음</TabsTrigger>
        <TabsTrigger value="my-malls">고객 피어몰</TabsTrigger>
        <TabsTrigger value="peer-malls">추천 피어몰</TabsTrigger>
      </TabsList>
      
      <TabsContent value="my-products">
        <VendorsList vendors={vendors} />
        <MyProductList shopUrl={shopUrl} products={relatedProducts} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <ReviewsTab 
          reviews={reviews} 
          handleDeleteReview={handleDeleteReview}
          setIsAddingReview={setIsAddingReview}
        />
      </TabsContent>
      
      <TabsContent value="my-malls">
        <MyMallsTab myMalls={myMalls} />
      </TabsContent>
      
      <TabsContent value="peer-malls">
        <PeerMallRecommendations peerMalls={peerMalls} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
