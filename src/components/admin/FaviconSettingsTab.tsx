
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FaviconSettingsTabProps {
  shopName: string;
  faviconUrl: string;
  setFaviconUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FaviconSettingsTab: React.FC<FaviconSettingsTabProps> = ({ 
  shopName, 
  faviconUrl, 
  setFaviconUrl 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">파비콘 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="favicon-url">파비콘 URL</Label>
            <Input 
              id="favicon-url" 
              placeholder="이미지 URL을 입력하세요"
              value={faviconUrl} 
              onChange={e => setFaviconUrl(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Square image (16x16, 32x32, 64x64, 128x128) with PNG, JPG, GIF format
            </p>
          </div>
          
          <Button variant="outline" className="mt-4">
            이미지 업로드
          </Button>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">파비콘 미리보기</h3>
            <div className="flex items-center space-x-4">
              <div className="border rounded p-2">
                <img 
                  src={faviconUrl || "https://placehold.co/32x32"} 
                  alt="Favicon preview" 
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="text-sm">32x32 사이즈 미리보기</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">파비콘 미리보기</h3>
          <div className="flex items-center space-x-2 mb-4 p-2 bg-white rounded border">
            <img 
              src={faviconUrl || "https://placehold.co/16x16"} 
              alt="Favicon preview" 
              className="w-4 h-4"
            />
            <span className="text-sm truncate">
              {shopName} | 브라우저 탭 미리보기
            </span>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600">
              파비콘은 브라우저 탭, 북마크, 기록 등에 표시되는 웹사이트의 아이콘입니다.
              실제 파비콘을 적용하려면 변경 사항을 저장하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaviconSettingsTab;
