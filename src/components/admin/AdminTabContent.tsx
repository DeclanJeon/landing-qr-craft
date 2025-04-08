import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import OverviewTab from './tabs/OverviewTab';
import EmptyTabContent from './tabs/EmptyTabContent';
import BasicInfoSettingsTab from './BasicInfoSettingsTab';
import LogoSettingsTab from './LogoSettingsTab';
import ThemeSettingsTab from './ThemeSettingsTab';
import HeroSettingsTab from './HeroSettingsTab';
import FooterSettingsTab from './FooterSettingsTab';
import AdManagementTab from './AdManagementTab';
import LayoutManagementTab from './LayoutManagementTab';
import StorageManagementTab from './StorageManagementTab';
import FaviconSettingsTab from './FaviconSettingsTab';

interface AdminTabContentProps {
  activeTab: string;
  shopData: any;
  shopName: string;
  updateShopData: (data: any) => void;
}

const AdminTabContent = ({ 
  activeTab, 
  shopData, 
  shopName, 
  updateShopData 
}: AdminTabContentProps) => {
  const [basicInfo, setBasicInfo] = useState(shopData.basicInfo);
  const [logoSettings, setLogoSettings] = useState(shopData.logoSettings);
  const [heroSettings, setHeroSettings] = useState(shopData.heroSettings);
  const [footerSettings, setFooterSettings] = useState(shopData.footerSettings);
  const [adSettings, setAdSettings] = useState(shopData.adSettings);
  const [themeSettings, setThemeSettings] = useState(shopData.themeSettings);

  useEffect(() => {
    updateShopData({
      basicInfo,
      logoSettings,
      heroSettings,
      footerSettings,
      adSettings,
      themeSettings
    });
  }, [basicInfo, logoSettings, heroSettings, footerSettings, adSettings, themeSettings, updateShopData]);

  return (
    <Tabs defaultValue={activeTab || "overview"} className="w-full">
      <TabsContent value="overview" className="mt-0">
        <OverviewTab shopName={shopName} />
      </TabsContent>
      
      <TabsContent value="basic-info" className="mt-0">
        <BasicInfoSettingsTab 
          shopName={shopName}
          basicInfo={basicInfo} 
          setBasicInfo={setBasicInfo} 
          onSave={handleSaveBasicInfo}
        />
      </TabsContent>
      
      <TabsContent value="logo" className="mt-0">
        <LogoSettingsTab 
          shopName={shopName}
          logoSettings={logoSettings} 
          setLogoSettings={setLogoSettings} 
          onSave={handleSaveLogoSettings}
        />
      </TabsContent>
      
      <TabsContent value="favicon" className="mt-0">
        <FaviconSettingsTab />
      </TabsContent>
      
      <TabsContent value="theme" className="mt-0">
        <ThemeSettingsTab 
          shopName={shopName}
          themeSettings={themeSettings} 
          setThemeSettings={setThemeSettings} 
          onSave={handleSaveThemeSettings}
        />
      </TabsContent>
      
      <TabsContent value="hero" className="mt-0">
        <HeroSettingsTab 
          heroSettings={heroSettings} 
          setHeroSettings={setHeroSettings} 
          onSave={handleSaveHeroSettings} 
        />
      </TabsContent>
      
      <TabsContent value="footer" className="mt-0">
        <FooterSettingsTab 
          footerSettings={footerSettings} 
          setFooterSettings={setFooterSettings} 
        />
      </TabsContent>
      
      <TabsContent value="ads" className="mt-0">
        <AdManagementTab 
          shopName={shopName}
          adSettings={adSettings} 
          setAdSettings={setAdSettings} 
          onSave={handleSaveAdSettings}
        />
      </TabsContent>
      
      <TabsContent value="layout" className="mt-0">
        <LayoutManagementTab />
      </TabsContent>
      
      <TabsContent value="storage" className="mt-0">
        <StorageManagementTab shopName={shopName} />
      </TabsContent>
      
      <TabsContent value="pages" className="mt-0">
        <EmptyTabContent 
          title="페이지 관리" 
          description="페이지 관리 기능은 현재 개발 중입니다." 
        />
      </TabsContent>
      
      <TabsContent value="banners" className="mt-0">
        <EmptyTabContent 
          title="배너 관리" 
          description="배너 관리 기능은 현재 개발 중입니다." 
        />
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <EmptyTabContent 
          title="카테고리 관리" 
          description="카테고리 관리 기능은 현재 개발 중입니다." 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabContent;
