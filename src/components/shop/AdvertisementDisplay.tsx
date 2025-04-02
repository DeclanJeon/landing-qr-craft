
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideAdvertisement from './product-detail/SideAdvertisement';
import { ShopData } from '@/types/shop';

interface AdvertisementDisplayProps {
  shopData: ShopData;
  page: string;
}

const AdvertisementDisplay: React.FC<AdvertisementDisplayProps> = ({ shopData, page }) => {
  const [activeAds, setActiveAds] = useState<ShopData['adSettings']>([]);
  
  useEffect(() => {
    if (!shopData.adSettings) return;
    
    const now = new Date();
    const validAds = shopData.adSettings.filter(ad => {
      // Check if ad is active
      if (!ad.isActive) return false;
      
      // Check if ad should appear on this page
      if (!ad.targetPages?.includes(page)) return false;
      
      // Check if ad is within its date range
      const startDate = new Date(ad.startDate);
      const endDate = new Date(ad.endDate);
      return now >= startDate && now <= endDate;
    });
    
    setActiveAds(validAds);
  }, [shopData, page]);
  
  // Group ads by position
  const leftAds = activeAds.filter(ad => ad.position === 'left');
  const rightAds = activeAds.filter(ad => ad.position === 'right');
  const heroAds = activeAds.filter(ad => ad.position === 'hero');
  const productAds = activeAds.filter(ad => ad.position === 'products');
  const footerAds = activeAds.filter(ad => ad.position === 'footer');
  
  return (
    <>
      {/* Sidebar Ads (Left) */}
      {leftAds.map(ad => (
        <SideAdvertisement
          key={`left-${ad.id}`}
          id={ad.id}
          position="left"
          imageUrl={ad.imageUrl}
          link={ad.link}
          altText={ad.title}
        />
      ))}
      
      {/* Sidebar Ads (Right) */}
      {rightAds.map(ad => (
        <SideAdvertisement
          key={`right-${ad.id}`}
          id={ad.id}
          position="right"
          imageUrl={ad.imageUrl}
          link={ad.link}
          altText={ad.title}
        />
      ))}
      
      {/* Hero Section Ads - Returned for placement by parent component */}
      {page === 'home' && heroAds.length > 0 && (
        <div className="hero-ads mb-8">
          {heroAds.map(ad => (
            <SideAdvertisement
              key={`hero-${ad.id}`}
              id={ad.id}
              position="hero"
              imageUrl={ad.imageUrl}
              link={ad.link}
              altText={ad.title}
            />
          ))}
        </div>
      )}
      
      {/* Product Section Ads - Returned for placement by parent component */}
      {productAds.length > 0 && (
        <div className="product-ads my-8">
          {productAds.map(ad => (
            <SideAdvertisement
              key={`product-${ad.id}`}
              id={ad.id}
              position="products"
              imageUrl={ad.imageUrl}
              link={ad.link}
              altText={ad.title}
            />
          ))}
        </div>
      )}
      
      {/* Footer Ads - Returned for placement by parent component */}
      {footerAds.length > 0 && (
        <div className="footer-ads mt-8 mb-4">
          {footerAds.map(ad => (
            <SideAdvertisement
              key={`footer-${ad.id}`}
              id={ad.id}
              position="footer"
              imageUrl={ad.imageUrl}
              link={ad.link}
              altText={ad.title}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AdvertisementDisplay;
