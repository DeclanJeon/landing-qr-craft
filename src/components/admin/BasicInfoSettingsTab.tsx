import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShopData } from '@/types/shop'; // Assuming ShopData type includes shopName

interface BasicInfoSettingsTabProps {
  shopData: ShopData | null;
  setShopData: React.Dispatch<React.SetStateAction<ShopData | null>>;
}

const BasicInfoSettingsTab: React.FC<BasicInfoSettingsTabProps> = ({ 
  shopData, 
  setShopData 
}) => {

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (shopData) {
      setShopData({
        ...shopData,
        shopName: event.target.value
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">기본 정보 설정</h2>
      
      <div className="space-y-6 max-w-lg">
        <div>
          <Label htmlFor="shop-name" className="text-lg">피어몰 이름</Label>
          <Input 
            id="shop-name" 
            placeholder="내 피어몰 이름"
            value={shopData?.shopName || ''} 
            onChange={handleNameChange}
            className="mt-2 text-base p-3"
          />
          <p className="text-sm text-gray-500 mt-2">
            피어몰 헤더 및 브라우저 탭 제목 등에 표시될 이름입니다.
          </p>
        </div>

        {/* Add other basic settings here if needed in the future */}
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm text-blue-700">
            변경사항은 '변경사항 저장' 버튼을 클릭해야 최종 반영됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSettingsTab;
