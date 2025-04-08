import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, ExternalLink, QrCode } from 'lucide-react';
import { Product, Category, ShopData } from '@/types/shop'; // Import necessary types
import ProductsTab from './ProductsTab';
import QRCodesTab from './QRCodesTab';
import CommunityTab from './CommunityTab';
import SupportTab from './SupportTab';

interface ShopTabsProps {
  shopUrl: string;
  shopData: ShopData | null;
  products: Product[];
  categories: Category[];
  selectedCategoryId: number;
  activeTab: string;
  setActiveTab: (value: string) => void;
  onOpenProductRegistration: () => void;
  onDeleteProduct: (productId: number) => void;
}

const ShopTabs: React.FC<ShopTabsProps> = ({
  shopUrl,
  shopData,
  products,
  categories,
  selectedCategoryId,
  activeTab,
  setActiveTab,
  onOpenProductRegistration,
  onDeleteProduct,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="products" className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">상품 및 링크</span>
        </TabsTrigger>
        <TabsTrigger value="qrcodes" className="flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">QR 코드</span>
        </TabsTrigger>
        {/* <TabsTrigger value="community" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">커뮤니티</span>
        </TabsTrigger> */}
        {/* <TabsTrigger value="support" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">고객센터</span>
        </TabsTrigger> */}
      </TabsList>

      <TabsContent value="products">
        <ProductsTab
          shopUrl={shopUrl}
          products={products}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onOpenProductRegistration={onOpenProductRegistration}
          onDeleteProduct={onDeleteProduct}
        />
      </TabsContent>

      <TabsContent value="qrcodes">
        <QRCodesTab
          products={products}
          onOpenProductRegistration={onOpenProductRegistration}
        />
      </TabsContent>

      <TabsContent value="community">
        <CommunityTab shopUrl={shopUrl} />
      </TabsContent>

      <TabsContent value="support">
        <SupportTab shopData={shopData} />
      </TabsContent>
    </Tabs>
  );
};

export default ShopTabs;
