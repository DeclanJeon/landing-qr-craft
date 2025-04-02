
import React from 'react';
import { 
  LayoutDashboard, 
  Image, 
  Store, 
  Palette, 
  Box, 
  MousePointerClick
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">관리 메뉴</h2>
      </div>
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="vertical"
        className="flex-1"
      >
        <TabsList className="w-full flex flex-col h-auto rounded-none border-r bg-white p-0 justify-start">
          <TabsTrigger 
            value="layout" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            레이아웃 관리
          </TabsTrigger>
          <TabsTrigger 
            value="hero" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Image className="h-4 w-4 mr-2" />
            히어로 섹션
          </TabsTrigger>
          <TabsTrigger 
            value="ads" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Store className="h-4 w-4 mr-2" />
            광고 관리
          </TabsTrigger>
          <TabsTrigger 
            value="theme" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Palette className="h-4 w-4 mr-2" />
            테마 설정
          </TabsTrigger>
          <TabsTrigger 
            value="footer" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Box className="h-4 w-4 mr-2" />
            푸터 정보
          </TabsTrigger>
          <TabsTrigger 
            value="favicon" 
            className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <MousePointerClick className="h-4 w-4 mr-2" />
            파비콘 설정
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AdminSidebar;
