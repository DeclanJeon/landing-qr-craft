
import React from 'react';
import { ShopData } from '@/types/shop';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import ShopHero from '../shop/ShopHero';

interface NovasTemplateProps {
  shopData: ShopData;
  shopUrl: string;
  page: string;
  children: React.ReactNode;
}

const NovasTemplate: React.FC<NovasTemplateProps> = ({ 
  shopData, 
  shopUrl, 
  page, 
  children 
}) => {
  // Define default theme settings
  const defaultThemeSettings = {
    primaryColor: '#3a506b',
    secondaryColor: '#1c2541',
    fontFamily: 'system-ui, sans-serif',
    borderRadius: 'rounded-lg'
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-100">
      <ShopHeader
        shopName={shopData.shopName}
        shopUrl={shopUrl}
        logoUrl={shopData.logoUrl}
        logoText={shopData.logoText}
        logoTextStyle={shopData.logoTextStyle}
        page={page}
      />
      
      {page === 'home' && (
        <div className="container mx-auto px-4 py-8">
          <ShopHero 
            shopName={shopData.shopName} 
            description={shopData.shopDescription || ''} 
            settings={shopData.heroSettings}
          />
        </div>
      )}
      
      <div className="flex-grow container mx-auto px-4 py-6">
        {children}
      </div>
      
      <ShopFooter 
        shopName={shopData.shopName} 
        shopUrl={shopUrl}
        shopData={shopData}
        footerSettingsOverride={shopData.footerSettings}
      />
    </div>
  );
};

export default NovasTemplate;
