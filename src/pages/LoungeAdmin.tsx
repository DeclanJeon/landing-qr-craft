
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  ShoppingCart, 
  Tag,
  MessageSquare,
  Package
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import OverviewTab from '@/components/admin/tabs/OverviewTab';
import EmptyTabContent from '@/components/admin/tabs/EmptyTabContent';

const LoungeAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Define empty tab contents
  const emptyTabs = [
    { id: 'users', title: '회원 관리', description: '등록된 회원 정보를 관리합니다.' },
    { id: 'products', title: '상품 관리', description: '등록된 상품 정보를 관리합니다.' },
    { id: 'orders', title: '주문 관리', description: '고객의 주문 정보를 관리합니다.' },
    { id: 'marketing', title: '마케팅', description: '마케팅 캠페인을 관리합니다.' },
    { id: 'support', title: '고객 지원', description: '고객 문의를 관리합니다.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AdminHeader 
              title="Peermall 관리자 대시보드" 
              subtitle="피어몰 시스템을 효율적으로 관리하세요."
            />

            <div className="bg-white rounded-lg shadow-sm">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <div className="border-b">
                  <div className="px-4">
                    <TabsList className="h-14">
                      <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <BarChart className="h-4 w-4 mr-2" />
                        대시보드
                      </TabsTrigger>
                      <TabsTrigger value="users" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Users className="h-4 w-4 mr-2" />
                        회원 관리
                      </TabsTrigger>
                      <TabsTrigger value="products" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Package className="h-4 w-4 mr-2" />
                        상품 관리
                      </TabsTrigger>
                      <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        주문 관리
                      </TabsTrigger>
                      <TabsTrigger value="marketing" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Tag className="h-4 w-4 mr-2" />
                        마케팅
                      </TabsTrigger>
                      <TabsTrigger value="support" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        고객 지원
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="overview" className="p-6">
                  <OverviewTab />
                </TabsContent>

                {/* Render all empty tabs */}
                {emptyTabs.map(tab => (
                  <TabsContent key={tab.id} value={tab.id} className="p-6">
                    <EmptyTabContent title={tab.title} description={tab.description} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoungeAdmin;
