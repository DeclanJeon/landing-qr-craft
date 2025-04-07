
import React from 'react';
import { 
  LayoutDashboard, 
  Image, 
  Store,
  Settings, // Add Settings icon
  Palette, 
  Box, 
  MousePointerClick,
  Database,
  Image as ImageIcon // Renaming Image to avoid conflict with Hero section icon
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideProps } from 'lucide-react'; // Import LucideProps for icon type
import { ForwardRefExoticComponent, RefAttributes } from 'react'; // Import React types

// Define the structure for a section, matching ShopAdmin.tsx
interface AdminSection {
  value: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  sections: AdminSection[]; // Add sections prop
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, sections }) => { // Destructure sections
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
          {/* Dynamically render triggers from sections prop */}
          {sections.map((section) => (
            <TabsTrigger
              key={section.value}
              value={section.value}
              className="justify-start rounded-none border-b px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 w-full" // Ensure full width
            >
              <section.icon className="h-4 w-4 mr-2 flex-shrink-0" /> {/* Add flex-shrink-0 */}
              <span className="truncate">{section.label}</span> {/* Add truncate */}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AdminSidebar;
