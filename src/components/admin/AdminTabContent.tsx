
import React, { useState, useEffect } from 'react';
import { ShopData, ThemeSettings } from '@/types/shop';

// Define placeholder interfaces for tab components that had type errors
interface BasicInfoSettingsTabProps {
  shopData: ShopData;
  setShopData: React.Dispatch<React.SetStateAction<ShopData>>;
}

interface LogoSettingsTabProps {
  shopName: string;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  logoText: string;
  setLogoText: React.Dispatch<React.SetStateAction<string>>;
  logoTextStyle: any;
  setLogoTextStyle: React.Dispatch<React.SetStateAction<any>>;
}

interface FaviconSettingsTabProps {
  shopName: string;
  faviconUrl: string;
  setFaviconUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface ThemeSettingsTabProps {
  themeSettings: ThemeSettings;
  setThemeSettings: React.Dispatch<React.SetStateAction<any>>;
}

interface HeroSettingsProps {
  shopName: string;
  heroSettings: {
    background: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    imageUrl?: string;
    imagePosition?: string;
    buttonIcon?: boolean;
    buttonSize?: string;
    buttonRadius?: string;
    showDecorations?: boolean;
    widgets?: any;
  };
  setHeroSettings: React.Dispatch<React.SetStateAction<any>>;
}

interface FooterSettingsTabProps {
  shopData: ShopData;
  footerSettings: any;
  setFooterSettings: React.Dispatch<React.SetStateAction<any>>;
}

interface AdManagementTabProps {
  shopData: ShopData;
  adSettings: any[];
  setAdSettings: React.Dispatch<React.SetStateAction<any[]>>;
}

interface TemplateSettingsTabProps {
  templateType: string;
  setTemplateType: React.Dispatch<React.SetStateAction<string>>;
  templateSettings: any;
  setTemplateSettings: React.Dispatch<React.SetStateAction<any>>;
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
import TemplateSettingsTab from './TemplateSettingsTab';

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
  const [logoUrl, setLogoUrl] = useState(shopData.logoUrl || '');
  const [logoText, setLogoText] = useState(shopData.logoText || '');
  const [logoTextStyle, setLogoTextStyle] = useState(shopData.logoTextStyle || {});
  const [themeSettings, setThemeSettings] = useState(shopData.themeSettings || {});
  const [templateType, setTemplateType] = useState(shopData.templateType || 'default');
  const [templateSettings, setTemplateSettings] = useState(shopData.templateSettings || {});

  const handleSaveInfo = (updatedData: Partial<ShopData>) => {
    const newShopData = { 
      ...shopData,
      ...updatedData,
    };
    
    setShopData(newShopData);
    
    // Save to localStorage
    const shopDataKey = `peermallShopData_${shopData.shopUrl}`;
    localStorage.setItem(shopDataKey, JSON.stringify(newShopData));
    
    console.log('Shop data updated:', newShopData);
  };
  
  const handleSettingsChange = () => {
    handleSaveInfo({
      heroSettings,
      footerSettings,
      adSettings,
      faviconUrl,
      logoUrl,
      logoText,
      logoTextStyle,
      themeSettings,
      templateType,
      templateSettings
    });
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
      return <BasicInfoSettingsTab 
        shopData={shopData} 
        setShopData={setShopData} 
      />;
      
    case 'logo':
      return <LogoSettingsTab 
        shopName={shopData.shopName} 
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        logoText={logoText}
        setLogoText={setLogoText}
        logoTextStyle={logoTextStyle}
        setLogoTextStyle={setLogoTextStyle}
      />;
      
    case 'favicon':
      return <FaviconSettingsTab 
        shopName={shopData.shopName}
        faviconUrl={faviconUrl} 
        setFaviconUrl={setFaviconUrl} 
      />;
      
    case 'theme':
      return <ThemeSettingsTab 
        themeSettings={themeSettings}
        setThemeSettings={setThemeSettings}
      />;
      
    case 'layout':
      return <LayoutManagementTab />;
      
    case 'hero':
      return <HeroSettingsTab 
        shopName={shopData.shopName}
        heroSettings={{
          background: heroSettings.background || 'bg-gradient-to-r from-blue-600 to-indigo-700',
          title: heroSettings.title || shopData.shopName || '피어몰 제목',
          description: heroSettings.description || '피어몰에 오신 것을 환영합니다.',
          buttonText: heroSettings.buttonText || '쇼핑 시작하기',
          buttonColor: heroSettings.buttonColor || 'bg-white text-blue-600 hover:bg-blue-50',
        }}
        setHeroSettings={setHeroSettings}
      />;
      
    case 'footer':
      return <FooterSettingsTab 
        shopData={shopData}
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
      />;
      
    case 'templates':
      return <TemplateSettingsTab
        templateType={templateType}
        setTemplateType={setTemplateType}
        templateSettings={templateSettings}
        setTemplateSettings={setTemplateSettings}
      />;

    default:
      return <div className="p-4">
        <p>해당 탭을 찾을 수 없습니다.</p>
      </div>;
  }
};

export default AdminTabContent;
