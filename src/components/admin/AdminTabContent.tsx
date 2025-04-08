import React, { useState, useEffect } from 'react';
import { ShopData } from '@/types/shop';

// Define placeholder interfaces for tab components that had type errors
interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

interface BasicInfoSettingsTabProps {
  shopData: ShopData;
  // Remove onSave if it doesn't exist in the component interface
}

interface LogoSettingsTabProps {
  shopName: string;
  // Remove logoSettings if it doesn't exist in the component interface
}

interface FaviconSettingsTabProps {
  shopName: string;
  faviconUrl: string;
  setFaviconUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface ThemeSettingsTabProps {
  themeSettings: ThemeSettings;
  // Other props as needed
}

interface HeroSettingsProps {
  shopName: string;
  heroSettings: {
    background: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
  };
  setHeroSettings: React.Dispatch<React.SetStateAction<{
    background: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
  }>>;
}

interface FooterSettingsTabProps {
  shopData: ShopData;
  setShopData: React.Dispatch<React.SetStateAction<ShopData>>;
  footerSettings: any;
  setFooterSettings: React.Dispatch<React.SetStateAction<any>>;
}

// Fix the import of components with correct TypeScript props
import OverviewTab from './tabs/OverviewTab';
import BasicInfoSettingsTab from './BasicInfoSettingsTab';
import LogoSettingsTab from './LogoSettingsTab';
import FaviconSettingsTab from './FaviconSettingsTab';
import ThemeSettingsTab from './ThemeSettingsTab';
import LayoutManagementTab from './LayoutManagementTab';
import HeroSettingsTab from './HeroSettingsTab';
import FooterSettingsTab from './FooterSettingsTab';
import StorageManagementTab from './StorageManagementTab';
import AdManagementTab from './AdManagementTab';

export interface AdminTabContentProps {
  tabId: string;
  shopData: ShopData;
  setShopData: React.Dispatch<React.SetStateAction<ShopData>>;
}

const AdminTabContent = ({ tabId, shopData, setShopData }: AdminTabContentProps) => {
  const [heroSettings, setHeroSettings] = useState(
    shopData.heroSettings || {
      background: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      title: shopData.shopName || '피어몰 제목',
      description: '피어몰에 오신 것을 환영합니다. 다양한 제품을 둘러보세요.',
      buttonText: '쇼핑 시작하기',
      buttonColor: 'bg-white text-blue-600 hover:bg-blue-50',
    }
  );

  const [footerSettings, setFooterSettings] = useState(
    shopData.footerSettings || {
      background: 'bg-gray-800',
      textColor: 'text-gray-300',
      ownerName: shopData.ownerName || '',
      contactNumber: shopData.contactNumber || '',
      email: shopData.email || '',
      address: shopData.address || '',
      links: [
        { title: '홈', url: '#' },
        { title: '서비스', url: '#' },
        { title: '문의하기', url: '#' }
      ],
      skin: 'default'
    }
  );
  
  const [adSettings, setAdSettings] = useState(shopData.adSettings || []);
  const [faviconUrl, setFaviconUrl] = useState(shopData.faviconUrl || '');

  const handleSaveInfo = (updatedData: Partial<ShopData>) => {
    // Remove shopCategory if it doesn't exist in ShopData type
    const { shopCategory, ...validData } = updatedData as any;
    
    const newShopData = { 
      ...shopData,
      ...validData,
    };
    
    setShopData(newShopData);
    
    // Save to localStorage
    const shopDataKey = `peermallShopData_${shopData.shopUrl}`;
    localStorage.setItem(shopDataKey, JSON.stringify(newShopData));
    
    console.log('Shop data updated:', newShopData);
  };
  
  useEffect(() => {
    // Handle hero settings updates
    handleSaveInfo({ heroSettings });
  }, [heroSettings]);
  
  useEffect(() => {
    // Handle footer settings updates
    handleSaveInfo({ footerSettings });
  }, [footerSettings]);
  
  useEffect(() => {
    // Handle ad settings updates
    handleSaveInfo({ adSettings });
  }, [adSettings]);
  
  useEffect(() => {
    // Handle favicon updates
    handleSaveInfo({ faviconUrl });
  }, [faviconUrl]);
  
  switch(tabId) {
    case 'overview':
      return <OverviewTab shopName={shopData.shopName} />;
      
    case 'basic-info':
      return <BasicInfoSettingsTab shopData={shopData} />;
      
    case 'logo':
      return <LogoSettingsTab shopName={shopData.shopName} />;
      
    case 'favicon':
      return <FaviconSettingsTab 
        shopName={shopData.shopName}
        faviconUrl={faviconUrl} 
        setFaviconUrl={setFaviconUrl} 
      />;
      
    case 'theme':
      return <ThemeSettingsTab 
        themeSettings={shopData.themeSettings as ThemeSettings || {
          primaryColor: '#3B82F6',
          secondaryColor: '#6366F1',
          fontFamily: 'sans',
          borderRadius: 'rounded-md'
        }} 
      />;
      
    case 'layout':
      return <LayoutManagementTab />;
      
    case 'hero':
      return <HeroSettingsTab 
        shopName={shopData.shopName}
        heroSettings={heroSettings}
        setHeroSettings={setHeroSettings}
      />;
      
    case 'footer':
      return <FooterSettingsTab 
        shopData={shopData}
        setShopData={setShopData}
        footerSettings={footerSettings}
        setFooterSettings={setFooterSettings}
      />;
      
    case 'storage':
      return <StorageManagementTab />;
      
    case 'ads':
      return <AdManagementTab 
        shopData={shopData}
        adSettings={adSettings}
        setAdSettings={setAdSettings}
        onSave={(updatedAdSettings) => {
          setAdSettings(updatedAdSettings);
        }}
      />;
      
    default:
      return <div className="p-4">
        <p>해당 탭을 찾을 수 없습니다.</p>
      </div>;
  }
};

export default AdminTabContent;
