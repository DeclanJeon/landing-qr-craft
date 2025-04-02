
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Image as ImageIcon, 
  Layout, 
  Sliders, 
  ChevronRight, 
  CirclePlus, 
  X,
  Upload
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';

interface HeroSettingsProps {
  shopName: string;
  heroSettings: {
    background: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    imageUrl?: string;
    imagePosition?: string;
    buttonIcon?: boolean;
    buttonSize?: string;
    buttonRadius?: string;
    showDecorations?: boolean;
    widgets?: {
      showProductCount?: boolean;
      showRating?: boolean;
      showBadge?: boolean;
      badgeText?: string;
    }
  };
  setHeroSettings: React.Dispatch<React.SetStateAction<{
    background: string;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    imageUrl?: string;
    imagePosition?: string;
    buttonIcon?: boolean;
    buttonSize?: string;
    buttonRadius?: string;
    showDecorations?: boolean;
    widgets?: {
      showProductCount?: boolean;
      showRating?: boolean;
      showBadge?: boolean;
      badgeText?: string;
    }
  }>>;
}

const HeroSettingsTab: React.FC<HeroSettingsProps> = ({ 
  shopName, 
  heroSettings, 
  setHeroSettings 
}) => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Ensure widgets object exists with defaults
  const widgets = heroSettings.widgets || {
    showProductCount: false,
    showRating: false,
    showBadge: false,
    badgeText: "신규"
  };

  const handleWidgetChange = (key: string, value: boolean | string) => {
    setHeroSettings(prev => ({
      ...prev,
      widgets: {
        ...prev.widgets,
        [key]: value
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroSettings({
          ...heroSettings,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setHeroSettings({
      ...heroSettings,
      imageUrl: ''
    });
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">히어로 섹션 설정</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            기본 설정
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            이미지 설정
          </TabsTrigger>
          <TabsTrigger value="button" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            버튼 설정
          </TabsTrigger>
          <TabsTrigger value="widgets" className="flex items-center gap-2">
            <CirclePlus className="h-4 w-4" />
            위젯 설정
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TabsContent value="general">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">제목</Label>
                  <Input 
                    id="hero-title" 
                    value={heroSettings.title} 
                    onChange={e => setHeroSettings({...heroSettings, title: e.target.value})}
                    className="mt-1"
                    placeholder={`${shopName}에 오신 것을 환영합니다`}
                  />
                </div>
                
                <div>
                  <Label htmlFor="hero-description">설명</Label>
                  <textarea 
                    id="hero-description" 
                    value={heroSettings.description} 
                    onChange={e => setHeroSettings({...heroSettings, description: e.target.value})}
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    placeholder="최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요."
                  />
                </div>
                
                <div>
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="decoration-toggle"
                    checked={heroSettings.showDecorations}
                    onCheckedChange={(checked) => 
                      setHeroSettings({...heroSettings, showDecorations: checked})
                    }
                  />
                  <Label htmlFor="decoration-toggle">장식 요소 표시</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="image">
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">히어로 이미지</Label>
                  {heroSettings.imageUrl ? (
                    <div className="relative w-full h-48 rounded-md overflow-hidden border border-input mb-2">
                      <img 
                        src={heroSettings.imageUrl} 
                        alt="Hero image" 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mb-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">이미지를 업로드하세요</p>
                    </div>
                  )}
                  
                  <div className="flex">
                    <Input
                      type="file"
                      id="hero-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="hero-image" 
                      className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
                    >
                      이미지 업로드
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="image-position">이미지 위치</Label>
                  <select 
                    id="image-position"
                    value={heroSettings.imagePosition || "right"}
                    onChange={e => setHeroSettings({...heroSettings, imagePosition: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                  >
                    <option value="none">표시 안함</option>
                    <option value="left">왼쪽</option>
                    <option value="right">오른쪽</option>
                    <option value="center">중앙 (배경)</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="button">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-button-text">버튼 텍스트</Label>
                  <Input 
                    id="hero-button-text" 
                    value={heroSettings.buttonText} 
                    onChange={e => setHeroSettings({...heroSettings, buttonText: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hero-button-color">버튼 스타일</Label>
                  <select 
                    id="hero-button-color"
                    value={heroSettings.buttonColor}
                    onChange={e => setHeroSettings({...heroSettings, buttonColor: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                  >
                    <option value="bg-white text-blue-600 hover:bg-gray-100">화이트 / 블루 텍스트</option>
                    <option value="bg-blue-600 text-white hover:bg-blue-700">블루 / 화이트 텍스트</option>
                    <option value="bg-purple-600 text-white hover:bg-purple-700">퍼플 / 화이트 텍스트</option>
                    <option value="bg-green-600 text-white hover:bg-green-700">그린 / 화이트 텍스트</option>
                    <option value="bg-orange-600 text-white hover:bg-orange-700">오렌지 / 화이트 텍스트</option>
                    <option value="bg-gray-900 text-white hover:bg-gray-800">블랙 / 화이트 텍스트</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="button-size">버튼 크기</Label>
                  <select 
                    id="button-size"
                    value={heroSettings.buttonSize || "medium"}
                    onChange={e => setHeroSettings({...heroSettings, buttonSize: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                  >
                    <option value="small">작게</option>
                    <option value="medium">중간</option>
                    <option value="large">크게</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="button-radius">버튼 모서리</Label>
                  <select 
                    id="button-radius"
                    value={heroSettings.buttonRadius || "rounded-full"}
                    onChange={e => setHeroSettings({...heroSettings, buttonRadius: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                  >
                    <option value="rounded-lg">약간 둥글게</option>
                    <option value="rounded-full">완전 둥글게</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="button-icon-toggle"
                    checked={heroSettings.buttonIcon}
                    onCheckedChange={(checked) => 
                      setHeroSettings({...heroSettings, buttonIcon: checked})
                    }
                  />
                  <Label htmlFor="button-icon-toggle">버튼 아이콘 표시</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="widgets">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="product-count-toggle"
                    checked={widgets.showProductCount}
                    onCheckedChange={(checked) => 
                      handleWidgetChange('showProductCount', checked)
                    }
                  />
                  <Label htmlFor="product-count-toggle">상품 개수 표시</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="rating-toggle"
                    checked={widgets.showRating}
                    onCheckedChange={(checked) => 
                      handleWidgetChange('showRating', checked)
                    }
                  />
                  <Label htmlFor="rating-toggle">평점 표시</Label>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="badge-toggle"
                    checked={widgets.showBadge}
                    onCheckedChange={(checked) => 
                      handleWidgetChange('showBadge', checked)
                    }
                  />
                  <Label htmlFor="badge-toggle">뱃지 표시</Label>
                </div>
                
                {widgets.showBadge && (
                  <div>
                    <Label htmlFor="badge-text">뱃지 텍스트</Label>
                    <Input 
                      id="badge-text" 
                      value={widgets.badgeText || "신규"}
                      onChange={e => handleWidgetChange('badgeText', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">미리보기</h3>
            <div className={`relative rounded-xl overflow-hidden h-64 ${heroSettings.background}`}>
              {/* Image preview */}
              {heroSettings.imageUrl && heroSettings.imagePosition !== "none" && (
                <div className={`absolute h-full ${
                  heroSettings.imagePosition === "left" ? "left-0 w-1/3" : 
                  heroSettings.imagePosition === "right" ? "right-0 w-1/3" : 
                  "inset-0 w-full opacity-20"
                }`}>
                  <img 
                    src={heroSettings.imageUrl} 
                    alt="Hero preview" 
                    className="h-full w-full object-cover" 
                  />
                  {heroSettings.imagePosition === "center" && (
                    <div className="absolute inset-0 bg-black/40"></div>
                  )}
                </div>
              )}
              
              {/* Decorative elements preview */}
              {heroSettings.showDecorations && (
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white"></div>
                  <div className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-white"></div>
                </div>
              )}
              
              <div className={`absolute inset-0 p-8 flex flex-col justify-center text-white ${
                heroSettings.imagePosition === "left" ? "ml-1/3 pl-4" : 
                heroSettings.imagePosition === "right" ? "w-2/3" : ""
              }`}>
                {/* Widgets preview */}
                {(widgets.showProductCount || widgets.showRating || widgets.showBadge) && (
                  <div className="flex gap-2 mb-2">
                    {widgets.showBadge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        {widgets.badgeText || "신규"}
                      </span>
                    )}
                    {widgets.showProductCount && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        50+ 상품
                      </span>
                    )}
                    {widgets.showRating && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        ★★★★☆ 4.8
                      </span>
                    )}
                  </div>
                )}
                
                <h1 className="text-2xl font-bold mb-2">{heroSettings.title || shopName}</h1>
                <p className="text-white/80 mb-4 text-sm max-w-lg">
                  {heroSettings.description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
                </p>
                <Button className={`w-fit ${
                  heroSettings.buttonSize === "small" ? "px-3 py-1 text-xs" :
                  heroSettings.buttonSize === "large" ? "px-5 py-3 text-base" :
                  "px-4 py-2 text-sm"
                } ${heroSettings.buttonColor} ${heroSettings.buttonRadius}`}>
                  {heroSettings.buttonText} 
                  {heroSettings.buttonIcon && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
      
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
