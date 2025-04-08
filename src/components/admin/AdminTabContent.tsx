
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

type AdminTabContentProps = {
  activeTab: string;
  shopName: string;
};

const AdminTabContent: React.FC<AdminTabContentProps> = ({ activeTab, shopName }) => {
  // State for various settings
  const [basicInfo, setBasicInfo] = useState({});
  const [logoSettings, setLogoSettings] = useState({});
  const [faviconUrl, setFaviconUrl] = useState('');
  const [themeSettings, setThemeSettings] = useState({});
  const [heroSettings, setHeroSettings] = useState({});
  const [footerSettings, setFooterSettings] = useState({});
  const [shopData, setShopData] = useState({});
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
          shopName={shopName}
          onSave={handleSaveLogoSettings}
        />
      );
    
    case 'favicon':
      return (
        <FaviconSettingsTab 
          shopName={shopName} 
          faviconUrl={faviconUrl} 
          setFaviconUrl={setFaviconUrl} 
          onSave={handleSaveFaviconSettings}
        />
      );
    
    case 'theme':
      return (
        <ThemeSettingsTab 
          onSave={handleSaveThemeSettings}
        />
      );
    
    case 'layout':
      return (
        <LayoutManagementTab 
          shopName={shopName}
          layoutSettings={layoutSettings}
          onSave={handleSaveLayoutSettings}
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
      return <StorageManagementTab shopName={shopName} />;
    
    case 'ads':
      return (
        <AdManagementTab 
          onSave={handleSaveAdSettings}
        />
      );
    
    default:
      return <EmptyTabContent />;
  }
};

export default AdminTabContent;
