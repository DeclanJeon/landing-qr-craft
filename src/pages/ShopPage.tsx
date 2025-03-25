
import React from 'react';
import { useParams } from 'react-router-dom';
import ShopTemplate from '@/components/ShopTemplate';

const ShopPage = () => {
  const { shopUrl, page } = useParams();
  
  return (
    <ShopTemplate shopUrl={shopUrl} page={page} />
  );
};

export default ShopPage;
