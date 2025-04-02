
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import LayoutManagementTab from './LayoutManagementTab';
import HeroSettingsTab from './HeroSettingsTab';
import AdManagementTab from './AdManagementTab';
import ThemeSettingsTab from './ThemeSettingsTab';
import FooterSettingsTab from './FooterSettingsTab';
import FaviconSettingsTab from './FaviconSettingsTab';

interface AdminTabContentProps {
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
  footerSettings: {
    background: string;
    textColor: string;
    ownerName: string;
    contactNumber: string;
    email: string;
    address: string;
  };
  setFooterSettings: React.Dispatch<React.SetStateAction<{
    background: string;
    textColor: string;
    ownerName: string;
    contactNumber: string;
    email: string;
    address: string;
  }>>;
  adSettings: Array<{
    id: number;
    title: string;
    description: string;
    position: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>;
  setAdSettings: React.Dispatch<React.SetStateAction<Array<{
    id: number;
    title: string;
    description: string;
    position: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>>>;
  themeSettings: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  setThemeSettings: React.Dispatch<React.SetStateAction<{
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
  }>>;
  faviconUrl: string;
  setFaviconUrl: React.Dispatch<React.SetStateAction<string>>;
}

const AdminTabContent: React.FC<AdminTabContentProps> = ({ 
  shopName,
  heroSettings, 
  setHeroSettings,
  footerSettings,
  setFooterSettings,
  adSettings,
  setAdSettings,
  themeSettings,
  setThemeSettings, 
  faviconUrl,
  setFaviconUrl
}) => {
  return (
    <div className="h-full bg-white p-6">
      <TabsContent value="layout" className="h-full">
        <LayoutManagementTab />
      </TabsContent>
      
      <TabsContent value="hero" className="h-full">
        <HeroSettingsTab 
          shopName={shopName}
          heroSettings={heroSettings}
          setHeroSettings={setHeroSettings}
        />
      </TabsContent>
      
      <TabsContent value="ads" className="h-full">
        <AdManagementTab
          adSettings={adSettings}
          setAdSettings={setAdSettings}
        />
      </TabsContent>
      
      <TabsContent value="theme" className="h-full">
        <ThemeSettingsTab
          themeSettings={themeSettings}
          setThemeSettings={setThemeSettings}
        />
      </TabsContent>
      
      <TabsContent value="footer" className="h-full">
        <FooterSettingsTab
          shopName={shopName}
          footerSettings={footerSettings}
          setFooterSettings={setFooterSettings}
        />
      </TabsContent>
      
      <TabsContent value="favicon" className="h-full">
        <FaviconSettingsTab
          shopName={shopName}
          faviconUrl={faviconUrl}
          setFaviconUrl={setFaviconUrl}
        />
      </TabsContent>
    </div>
  );
};

export default AdminTabContent;
