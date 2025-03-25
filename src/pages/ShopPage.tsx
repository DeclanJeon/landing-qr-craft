
import React from 'react';
import { useParams } from 'react-router-dom';
import ShopTemplate from '@/components/ShopTemplate';

const ShopPage = () => {
  const { shopUrl, page, categoryId } = useParams();
  
  return (
    <ShopTemplate 
      shopUrl={shopUrl} 
      page={page} 
      categoryId={categoryId ? parseInt(categoryId) : undefined} 
    />
  );
};

export default ShopPage;
