import React from 'react';
import { useParams } from 'react-router-dom';
import ShopTemplate from '@/components/ShopTemplate';

const ShopPage = () => {
  const { shopUrl, productId } = useParams();

  // 현재 경로에서 "about" 또는 "service"를 추출하기 위해 window.location 사용
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const pageSegment = pathSegments[pathSegments.length - 1];
  const page = ['about', 'service'].includes(pageSegment) ? pageSegment : undefined;

  return (
    <ShopTemplate 
      shopUrl={shopUrl} 
      page={page} // "about" 또는 "service", 없으면 undefined
      categoryId={undefined} // 현재 경로에 categoryId가 없으므로 undefined
      productId={productId}
    />
  );
};

export default ShopPage;