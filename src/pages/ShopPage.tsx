
import React from 'react';
import { useParams } from 'react-router-dom';
import ShopTemplate from '@/components/ShopTemplate';

const ShopPage = () => {
  const { shopUrl, productId, categoryId } = useParams();

  // 현재 경로에서 "about" 또는 "service"를 추출하기 위해 window.location 사용
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const pageSegment = pathSegments[pathSegments.length - 1];
  
  // Determine the current page for ad targeting and routing
  let page = 'home';
  
  if (['about', 'service'].includes(pageSegment)) {
    page = pageSegment;
  } else if (productId) {
    page = 'product';
  }

  return (
    <ShopTemplate 
      shopUrl={shopUrl} 
      page={page} 
      categoryId={categoryId ? Number(categoryId) : undefined} 
      productId={productId}
    />
  );
};

export default ShopPage;
