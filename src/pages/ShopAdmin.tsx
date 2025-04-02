
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopData } from '@/types/shop';
import {
  Tabs,
} from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTabContent from '@/components/admin/AdminTabContent';

const ShopAdmin = () => {
  const { shopUrl } = useParams();
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [activeTab, setActiveTab] = useState("layout");
  const [heroSettings, setHeroSettings] = useState({
    background: "bg-gradient-to-r from-blue-500 to-indigo-600",
    title: "",
    description: "",
    buttonText: "상품 구경하기",
    buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
  });
  const [footerSettings, setFooterSettings] = useState({
    background: "bg-gray-800",
    textColor: "text-white",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [adSettings, setAdSettings] = useState([
    {
      id: 1,
      title: "신규 회원 할인",
      description: "가입 후 첫 구매 시 10% 할인",
      position: "hero",
      imageUrl: "https://placehold.co/600x300",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    }
  ]);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3B82F6",
    secondaryColor: "#6366F1",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "rounded-lg",
  });

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    const parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
    
    if (parsedShopData && parsedShopData.shopUrl === shopUrl) {
      setShopData(parsedShopData);
      
      if (parsedShopData.shopDescription) {
        setHeroSettings(prev => ({
          ...prev,
          title: `${parsedShopData.shopName}에 오신 것을 환영합니다`,
          description: parsedShopData.shopDescription
        }));
      }
      
      if (parsedShopData.ownerName || parsedShopData.contactNumber || parsedShopData.email) {
        setFooterSettings(prev => ({
          ...prev,
          ownerName: parsedShopData.ownerName || '',
          contactNumber: parsedShopData.contactNumber || '',
          email: parsedShopData.email || '',
          address: parsedShopData.address || ''
        }));
      }
    }
  }, [shopUrl]);

  const saveChanges = () => {
    if (!shopData) return;
    
    const updatedShopData = {
      ...shopData,
      shopDescription: heroSettings.description,
      ownerName: footerSettings.ownerName,
      contactNumber: footerSettings.contactNumber,
      email: footerSettings.email,
      address: footerSettings.address,
      themeSettings,
      heroSettings,
      footerSettings,
      adSettings,
      faviconUrl
    };
    
    localStorage.setItem('peermallShopData', JSON.stringify(updatedShopData));
    alert('설정이 저장되었습니다.');
  };

  if (!shopData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">피어몰을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 피어몰이 존재하지 않거나 접근할 수 없습니다.</p>
        <Link to="/personal-lounge">
          <Button>피어몰 만들기로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        shopName={shopData.shopName}
        shopUrl={shopUrl || ''}
        onSaveChanges={saveChanges}
      />

      <div className="container mx-auto px-4 py-8">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={20} minSize={15}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <AdminTabContent 
                shopName={shopData.shopName}
                heroSettings={heroSettings}
                setHeroSettings={setHeroSettings}
                footerSettings={footerSettings}
                setFooterSettings={setFooterSettings}
                adSettings={adSettings}
                setAdSettings={setAdSettings}
                themeSettings={themeSettings}
                setThemeSettings={setThemeSettings}
                faviconUrl={faviconUrl}
                setFaviconUrl={setFaviconUrl}
              />
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ShopAdmin;
