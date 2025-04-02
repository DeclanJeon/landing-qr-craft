
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

interface ThemeSettingsTabProps {
  themeSettings: ThemeSettings;
  setThemeSettings: React.Dispatch<React.SetStateAction<ThemeSettings>>;
}

const ThemeSettingsTab: React.FC<ThemeSettingsTabProps> = ({ 
  themeSettings, 
  setThemeSettings 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">테마 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="primary-color">주 색상</Label>
            <div className="flex mt-1">
              <Input 
                id="primary-color" 
                type="color"
                value={themeSettings.primaryColor} 
                onChange={e => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                className="w-12 p-1 mr-2"
              />
              <Input 
                type="text"
                value={themeSettings.primaryColor} 
                onChange={e => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="secondary-color">보조 색상</Label>
            <div className="flex mt-1">
              <Input 
                id="secondary-color" 
                type="color"
                value={themeSettings.secondaryColor} 
                onChange={e => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                className="w-12 p-1 mr-2"
              />
              <Input 
                type="text"
                value={themeSettings.secondaryColor} 
                onChange={e => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="font-family">폰트</Label>
            <select 
              id="font-family"
              value={themeSettings.fontFamily}
              onChange={e => setThemeSettings({...themeSettings, fontFamily: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="system-ui, sans-serif">시스템 기본 폰트</option>
              <option value="'Noto Sans KR', sans-serif">Noto Sans KR</option>
              <option value="'Nanum Gothic', sans-serif">나눔 고딕</option>
              <option value="'Malgun Gothic', sans-serif">맑은 고딕</option>
              <option value="'Spoqa Han Sans', sans-serif">스포카 한 산스</option>
              <option value="'Gothic A1', sans-serif">고딕 A1</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="border-radius">모서리 스타일</Label>
            <select 
              id="border-radius"
              value={themeSettings.borderRadius}
              onChange={e => setThemeSettings({...themeSettings, borderRadius: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="rounded-none">각진 모서리</option>
              <option value="rounded-sm">약간 둥근 모서리</option>
              <option value="rounded">둥근 모서리</option>
              <option value="rounded-lg">더 둥근 모서리</option>
              <option value="rounded-xl">매우 둥근 모서리</option>
              <option value="rounded-2xl">특대 둥근 모서리</option>
              <option value="rounded-full">완전 원형 모서리</option>
            </select>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">테마 미리보기</h3>
          <div 
            className="p-6 rounded-lg border"
            style={{
              fontFamily: themeSettings.fontFamily
            }}
          >
            <div 
              className={`p-4 mb-4 text-white ${themeSettings.borderRadius}`}
              style={{
                backgroundColor: themeSettings.primaryColor
              }}
            >
              <h3 className="font-bold">주 색상 요소</h3>
              <p>버튼, 강조 표시, 네비게이션 등에 사용됩니다.</p>
            </div>
            
            <div 
              className={`p-4 mb-4 text-white ${themeSettings.borderRadius}`}
              style={{
                backgroundColor: themeSettings.secondaryColor
              }}
            >
              <h3 className="font-bold">보조 색상 요소</h3>
              <p>보조 강조, 아이콘, 배지 등에 사용됩니다.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">폰트 미리보기</h3>
              <p className="text-sm">작은 텍스트 샘플입니다.</p>
              <p>일반 텍스트 샘플입니다.</p>
              <p className="text-lg">큰 텍스트 샘플입니다.</p>
              <p className="text-xl font-bold">제목 텍스트 샘플입니다.</p>
            </div>
            
            <div className="mt-4">
              <Button 
                className={`${themeSettings.borderRadius}`}
                style={{
                  backgroundColor: themeSettings.primaryColor
                }}
              >
                버튼 샘플
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsTab;
