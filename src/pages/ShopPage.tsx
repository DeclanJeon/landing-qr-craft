
import React from 'react';
import { useParams } from 'react-router-dom';
import ShopTemplate from '@/components/ShopTemplate';

const ShopPage = () => {
  const { shopUrl, productId, categoryId } = useParams();

  // 현재 경로에서 "about" 또는 "service"를 추출하기 위해 window.location 사용
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const pageSegment = pathSegments[pathSegments.length - 1];
  
  // home을 추가하여 홈페이지에서도 페이지 파라미터가 전달되도록 함
  const page = ['about', 'service', 'home'].includes(pageSegment) ? pageSegment : undefined;

  return (
    <ShopTemplate 
      shopUrl={shopUrl} 
      page={page} // "about" 또는 "service" 또는 "home", 없으면 undefined
      categoryId={categoryId ? Number(categoryId) : undefined} // Convert to number if exists
      productId={productId} // Pass the productId parameter
    />
  );
};

export default ShopPage;
