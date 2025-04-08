
import React, { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import EmptyTabContent from './tabs/EmptyTabContent';
import BasicInfoSettingsTab from './BasicInfoSettingsTab';
import LogoSettingsTab from './LogoSettingsTab';
import FaviconSettingsTab from './FaviconSettingsTab';
import ThemeSettingsTab from './ThemeSettingsTab';
import HeroSettingsTab from './HeroSettingsTab';
import FooterSettingsTab from './FooterSettingsTab';
import AdManagementTab from './AdManagementTab';
import StorageManagementTab from './StorageManagementTab';
import LayoutManagementTab from './LayoutManagementTab';
import { ShopData } from '@/types/shop';

type AdminTabContentProps = {
  activeTab: string;
  shopName: string;
};

const AdminTabContent: React.FC<AdminTabContentProps> = ({ activeTab, shopName }) => {
  // State for various settings
  const [basicInfo, setBasicInfo] = useState<ShopData>({
    shopName: '',
    shopUrl: '',
    shopDescription: '',
    shopCategory: '',
    shopTags: [],
    ownerEmail: '',
    ownerName: '',
    ownerPhone: '',
    shopAddress: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  
  const [logoSettings, setLogoSettings] = useState({});
  const [faviconUrl, setFaviconUrl] = useState('');
  const [themeSettings, setThemeSettings] = useState({});
  const [heroSettings, setHeroSettings] = useState({
    background: '',
    title: '',
    description: '',
    buttonText: '',
    buttonColor: ''
  });
  const [footerSettings, setFooterSettings] = useState<ShopData>({
    shopName: '',
    shopUrl: '',
    shopDescription: '',
    shopCategory: '',
    shopTags: [],
    ownerEmail: '',
    ownerName: '',
    ownerPhone: '',
    shopAddress: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  const [shopData, setShopData] = useState<ShopData>({
    shopName: '',
    shopUrl: '',
    shopDescription: '',
    shopCategory: '',
    shopTags: [],
    ownerEmail: '',
    ownerName: '',
    ownerPhone: '',
    shopAddress: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  const [adSettings, setAdSettings] = useState({});
  const [layoutSettings, setLayoutSettings] = useState({});
  
  // Handler functions for saving various settings
  const handleSaveBasicInfo = (data: any) => {
    console.log('Saving basic info:', data);
    setBasicInfo(data);
  };
  
  const handleSaveLogoSettings = (data: any) => {
    console.log('Saving logo settings:', data);
    setLogoSettings(data);
  };
  
  const handleSaveFaviconSettings = (url: string) => {
    console.log('Saving favicon URL:', url);
    setFaviconUrl(url);
  };
  
  const handleSaveThemeSettings = (data: any) => {
    console.log('Saving theme settings:', data);
    setThemeSettings(data);
  };
  
  const handleSaveHeroSettings = (data: any) => {
    console.log('Saving hero settings:', data);
    setHeroSettings(data);
  };
  
  const handleSaveFooterSettings = (data: any) => {
    console.log('Saving footer settings:', data);
    setFooterSettings(data);
    setShopData(data);
  };
  
  const handleSaveAdSettings = (data: any) => {
    console.log('Saving ad settings:', data);
    setAdSettings(data);
  };
  
  const handleSaveLayoutSettings = (data: any) => {
    console.log('Saving layout settings:', data);
    setLayoutSettings(data);
  };
  
  // Render the appropriate tab content based on activeTab
  switch (activeTab) {
    case 'overview':
      return <OverviewTab shopName={shopName} />;
    
    case 'basic-info':
      return (
        <BasicInfoSettingsTab 
          shopData={basicInfo} 
          onSave={handleSaveBasicInfo} 
        />
      );
    
    case 'logo':
      return (
        <LogoSettingsTab 
          logoSettings={logoSettings}
          shopName={shopName}
        />
      );
    
    case 'favicon':
      return (
        <FaviconSettingsTab 
          faviconUrl={faviconUrl}
          shopName={shopName}
        />
      );
    
    case 'theme':
      return (
        <ThemeSettingsTab 
          themeSettings={themeSettings}
        />
      );
    
    case 'layout':
      return (
        <LayoutManagementTab 
          layoutSettings={layoutSettings}
        />
      );
    
    case 'hero':
      return (
        <HeroSettingsTab 
          heroSettings={heroSettings}
          setHeroSettings={setHeroSettings}
        />
      );
    
    case 'footer':
      return (
        <FooterSettingsTab 
          shopData={shopData} 
          setShopData={setShopData}
        />
      );
    
    case 'storage':
      return <StorageManagementTab />;
    
    case 'ads':
      return (
        <AdManagementTab 
          adSettings={adSettings}
        />
      );
    
    default:
      return <EmptyTabContent title="페이지를 찾을 수 없음" description="선택한 탭에 대한 콘텐츠가 없습니다." />;
  }
};

export default AdminTabContent;
