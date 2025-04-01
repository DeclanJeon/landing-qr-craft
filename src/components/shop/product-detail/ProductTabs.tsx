
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorsList from './VendorsList';
import ProductDetails from './ProductDetails';
import ReviewsTab from './ReviewsTab';
import MyMallsTab from './MyMallsTab';
import { Product } from '@/types/shop';

interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

interface MyMall {
  id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
  date: string;
}

interface ProductTabsProps {
  product: Product;
  vendors: { name: string; rating: number; price: string; }[];
  reviews: Review[];
  myMalls: MyMall[];
  handleDeleteReview: (reviewId: string) => void;
  setIsAddingReview: (isAdding: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  vendors,
  reviews,
  myMalls,
  handleDeleteReview,
  setIsAddingReview,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="product-info">상품 정보</TabsTrigger>
        <TabsTrigger value="reviews">리뷰 모음</TabsTrigger>
        <TabsTrigger value="my-malls">다른 사용자의 마이몰</TabsTrigger>
      </TabsList>
      
      <TabsContent value="product-info">
        <VendorsList vendors={vendors} />
        <ProductDetails product={product} />
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
    </Tabs>
  );
};

export default ProductTabs;
