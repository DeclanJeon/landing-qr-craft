
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorsList from './VendorsList';
import MyProductList from './MyProductList';
import ReviewsTab from './ReviewsTab';
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

interface ProductTabsProps {
  shopUrl?: string;
  product: Product;
  relatedProducts: Product[];
  vendors: { name: string; rating: number; price: string; }[];
  reviews: Review[];
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
  handleDeleteReview,
  setIsAddingReview,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="my-products">내 상품 목록</TabsTrigger>
        <TabsTrigger value="reviews">리뷰 모음</TabsTrigger>
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
    </Tabs>
  );
};

export default ProductTabs;
