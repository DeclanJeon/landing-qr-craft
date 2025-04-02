
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface HeroSettingsProps {
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
}

const HeroSettingsTab: React.FC<HeroSettingsProps> = ({ 
  shopName, 
  heroSettings, 
  setHeroSettings 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">히어로 섹션 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <Label htmlFor="hero-title">제목</Label>
            <Input 
              id="hero-title" 
              value={heroSettings.title} 
              onChange={e => setHeroSettings({...heroSettings, title: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="hero-description">설명</Label>
            <textarea 
              id="hero-description" 
              value={heroSettings.description} 
              onChange={e => setHeroSettings({...heroSettings, description: e.target.value})}
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="hero-button-text">버튼 텍스트</Label>
            <Input 
              id="hero-button-text" 
              value={heroSettings.buttonText} 
              onChange={e => setHeroSettings({...heroSettings, buttonText: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="hero-background">배경 스타일</Label>
            <select 
              id="hero-background"
              value={heroSettings.background}
              onChange={e => setHeroSettings({...heroSettings, background: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="bg-gradient-to-r from-blue-500 to-indigo-600">블루 그라데이션</option>
              <option value="bg-gradient-to-r from-purple-500 to-pink-500">퍼플 그라데이션</option>
              <option value="bg-gradient-to-r from-green-400 to-teal-500">그린 그라데이션</option>
              <option value="bg-gradient-to-r from-yellow-400 to-orange-500">옐로우 그라데이션</option>
              <option value="bg-gray-900">다크 그레이</option>
              <option value="bg-white">화이트</option>
            </select>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="hero-button-color">버튼 스타일</Label>
            <select 
              id="hero-button-color"
              value={heroSettings.buttonColor}
              onChange={e => setHeroSettings({...heroSettings, buttonColor: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="bg-white text-blue-600 hover:bg-gray-100">화이트 / 블루 텍스트</option>
              <option value="bg-blue-600 text-white hover:bg-blue-700">블루 / 화이트 텍스트</option>
              <option value="bg-purple-600 text-white hover:bg-purple-700">퍼플 / 화이트 텍스트</option>
              <option value="bg-green-600 text-white hover:bg-green-700">그린 / 화이트 텍스트</option>
              <option value="bg-orange-600 text-white hover:bg-orange-700">오렌지 / 화이트 텍스트</option>
              <option value="bg-gray-900 text-white hover:bg-gray-800">블랙 / 화이트 텍스트</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">미리보기</h3>
          <div className={`relative rounded-xl overflow-hidden h-64 ${heroSettings.background}`}>
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <h1 className="text-3xl font-bold mb-2">{heroSettings.title || shopName}</h1>
              <p className="text-white/80 mb-6 max-w-lg">
                {heroSettings.description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
              </p>
              <Button className={`w-fit ${heroSettings.buttonColor}`}>
                {heroSettings.buttonText} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold mb-3">히어로 슬라이드 관리</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-600">
            히어로 슬라이드 기능은 현재 구현 중입니다. 곧 업데이트될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSettingsTab;
