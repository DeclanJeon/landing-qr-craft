import React, { useState, useEffect } from 'react';
import { ShopData } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Sparkles, Type, Square, Layers } from 'lucide-react';

interface TemplateSettingsTabProps {
  shopData: ShopData;
  setShopData: React.Dispatch<React.SetStateAction<ShopData>>;
}

const TemplateSettingsTab: React.FC<TemplateSettingsTabProps> = ({ shopData, setShopData }) => {
  // Initialize with proper fallbacks
  const [selectedTemplate, setSelectedTemplate] = useState(shopData.templateType || 'default');
  const templateSettings = shopData.templateSettings || shopData.themeSettings || {
    primaryColor: '#3B82F6',
    secondaryColor: '#6366F1',
    fontFamily: 'system-ui, sans-serif',
    borderRadius: 'rounded-lg',
    skin: 'default',
    accentColor: '#F59E0B',
    textColor: '#111827',
    cardStyle: 'shadow',
    buttonStyle: 'filled',
    headerStyle: 'classic',
    luxuryEffects: true,
    animations: 'subtle'
  };

  const [activeTab, setActiveTab] = useState('colors');
  const [previewMode, setPreviewMode] = useState('desktop');

  // Template options
  const templates = [
    { id: 'default', name: '기본 템플릿', description: '심플하고 깔끔한 디자인의 기본 템플릿입니다.' },
    { id: 'luxury', name: '럭셔리 템플릿', description: '고급스러운 느낌의 럭셔리 쇼핑몰 템플릿입니다.' },
    { id: 'novas', name: '노바스 템플릿', description: '현대적이고 세련된 디자인의 템플릿입니다.' },
    { id: 'minimal', name: '미니멀 템플릿', description: '심플함을 강조한 미니멀리즘 디자인 템플릿입니다.' },
  ];

  // Font options
  const fonts = [
    { value: 'system-ui, sans-serif', label: '시스템 기본 폰트' },
    { value: "'Noto Sans KR', sans-serif", label: 'Noto Sans KR' },
    { value: "'Nanum Gothic', sans-serif", label: '나눔 고딕' },
    { value: "'Malgun Gothic', sans-serif", label: '맑은 고딕' },
    { value: "'Spoqa Han Sans', sans-serif", label: '스포카 한 산스' },
    { value: "'Gothic A1', sans-serif", label: '고딕 A1' },
    { value: "'Playfair Display', serif", label: 'Playfair Display (럭셔리)' },
    { value: "'Montserrat', sans-serif", label: 'Montserrat (모던)' },
  ];

  // Border radius options
  const borderRadiusOptions = [
    { value: 'rounded-none', label: '각진 모서리' },
    { value: 'rounded-sm', label: '약간 둥근 모서리' },
    { value: 'rounded', label: '둥근 모서리' },
    { value: 'rounded-lg', label: '더 둥근 모서리' },
    { value: 'rounded-xl', label: '매우 둥근 모서리' },
    { value: 'rounded-2xl', label: '특대 둥근 모서리' },
    { value: 'rounded-full', label: '완전 원형 모서리' },
  ];

  // Animation options
  const animationOptions = [
    { value: 'none', label: '없음' },
    { value: 'subtle', label: '미묘한 효과' },
    { value: 'moderate', label: '중간 효과' },
    { value: 'playful', label: '활발한 효과' },
  ];

  // Skin options for luxury template
  const luxurySkins = [
    { value: 'classic', label: '클래식 럭셔리' },
    { value: 'modern', label: '모던 럭셔리' },
    { value: 'boutique', label: '부티크 스타일' },
    { value: 'elegant', label: '엘레강트' },
  ];

  // Card style options
  const cardStyleOptions = [
    { value: 'shadow', label: '그림자 효과' },
    { value: 'border', label: '테두리 효과' },
    { value: 'flat', label: '플랫 디자인' },
    { value: 'glass', label: '글래스모피즘' },
  ];

  // Button style options
  const buttonStyleOptions = [
    { value: 'filled', label: '채워진 버튼' },
    { value: 'outline', label: '외곽선 버튼' },
    { value: 'ghost', label: '고스트 버튼' },
    { value: 'link', label: '링크 스타일' },
  ];

  // Header style options
  const headerStyleOptions = [
    { value: 'classic', label: '클래식 헤더' },
    { value: 'minimal', label: '미니멀 헤더' },
    { value: 'centered', label: '중앙 정렬 헤더' },
    { value: 'transparent', label: '투명 헤더' },
  ];

  // When updating shopData, use templateSettings consistently
  const updateShopData = (updatedSettings: any) => {
    setShopData({
      ...shopData,
      templateSettings: {
        ...templateSettings,
        ...updatedSettings
      },
      templateType: selectedTemplate
    });
  };

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Update shop data with the selected template
    setShopData({
      ...shopData,
      templateType: templateId
    });
  };

  // Handle color change
  const handleColorChange = (colorType: string, value: string) => {
    updateShopData({ [colorType]: value });
  };

  // Handle font change
  const handleFontChange = (value: string) => {
    updateShopData({ fontFamily: value });
  };

  // Handle border radius change
  const handleBorderRadiusChange = (value: string) => {
    updateShopData({ borderRadius: value });
  };

  // Handle skin change
  const handleSkinChange = (value: string) => {
    updateShopData({ skin: value });
  };

  // Handle animation change
  const handleAnimationChange = (value: string) => {
    updateShopData({ animations: value });
  };

  // Handle luxury effects toggle
  const handleLuxuryEffectsChange = (checked: boolean) => {
    updateShopData({ luxuryEffects: checked });
  };

  // Handle card style change
  const handleCardStyleChange = (value: string) => {
    updateShopData({ cardStyle: value });
  };

  // Handle button style change
  const handleButtonStyleChange = (value: string) => {
    updateShopData({ buttonStyle: value });
  };

  // Handle header style change
  const handleHeaderStyleChange = (value: string) => {
    updateShopData({ headerStyle: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">템플릿 설정</h2>
        <p className="text-gray-500 mb-6">
          피어몰의 전체적인 디자인 템플릿과 스타일을 설정합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-4">템플릿 선택</h3>
            <RadioGroup value={selectedTemplate} onValueChange={handleTemplateChange} className="space-y-3">
              {templates.map(template => (
                <div key={template.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={template.id} id={`template-${template.id}`} className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor={`template-${template.id}`} className="font-medium">
                      {template.name}
                    </Label>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="colors" className="flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    <span>색상</span>
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    <span>타이포그래피</span>
                  </TabsTrigger>
                  <TabsTrigger value="components" className="flex items-center">
                    <Square className="h-4 w-4 mr-2" />
                    <span>컴포넌트</span>
                  </TabsTrigger>
                  <TabsTrigger value="effects" className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span>효과</span>
                  </TabsTrigger>
                </TabsList>

                {/* Colors Tab */}
                <TabsContent value="colors" className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">주 색상</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="primary-color" 
                          type="color"
                          value={templateSettings.primaryColor || '#3B82F6'} 
                          onChange={e => handleColorChange('primaryColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input 
                          type="text"
                          value={templateSettings.primaryColor || '#3B82F6'} 
                          onChange={e => handleColorChange('primaryColor', e.target.value)}
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
                          value={templateSettings.secondaryColor || '#6366F1'} 
                          onChange={e => handleColorChange('secondaryColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input 
                          type="text"
                          value={templateSettings.secondaryColor || '#6366F1'} 
                          onChange={e => handleColorChange('secondaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accent-color">강조 색상</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="accent-color" 
                          type="color"
                          value={templateSettings.accentColor || '#F59E0B'} 
                          onChange={e => handleColorChange('accentColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input 
                          type="text"
                          value={templateSettings.accentColor || '#F59E0B'} 
                          onChange={e => handleColorChange('accentColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="text-color">텍스트 색상</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="text-color" 
                          type="color"
                          value={templateSettings.textColor || '#111827'} 
                          onChange={e => handleColorChange('textColor', e.target.value)}
                          className="w-12 p-1 mr-2"
                        />
                        <Input 
                          type="text"
                          value={templateSettings.textColor || '#111827'} 
                          onChange={e => handleColorChange('textColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {selectedTemplate === 'luxury' && (
                    <div>
                      <Label htmlFor="skin">스킨 선택</Label>
                      <Select 
                        value={templateSettings.skin || 'classic'} 
                        onValueChange={handleSkinChange}
                      >
                        <SelectTrigger id="skin" className="mt-1">
                          <SelectValue placeholder="스킨 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {luxurySkins.map(skin => (
                            <SelectItem key={skin.value} value={skin.value}>
                              {skin.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </TabsContent>

                {/* Typography Tab */}
                <TabsContent value="typography" className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="font-family">폰트</Label>
                    <Select 
                      value={templateSettings.fontFamily || 'system-ui, sans-serif'} 
                      onValueChange={handleFontChange}
                    >
                      <SelectTrigger id="font-family" className="mt-1">
                        <SelectValue placeholder="폰트 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="border-radius">모서리 스타일</Label>
                    <Select 
                      value={templateSettings.borderRadius || 'rounded-lg'} 
                      onValueChange={handleBorderRadiusChange}
                    >
                      <SelectTrigger id="border-radius" className="mt-1">
                        <SelectValue placeholder="모서리 스타일 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {borderRadiusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">폰트 미리보기</h4>
                    <div 
                      className="p-4 border rounded-lg"
                      style={{ fontFamily: templateSettings.fontFamily || 'system-ui, sans-serif' }}
                    >
                      <p className="text-3xl font-bold mb-2">제목 텍스트</p>
                      <p className="text-lg mb-4">부제목 텍스트입니다.</p>
                      <p className="mb-2">일반 본문 텍스트입니다. 이 텍스트는 선택한 폰트로 표시됩니다.</p>
                      <p className="text-sm">작은 텍스트 스타일입니다.</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Components Tab */}
                <TabsContent value="components" className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="card-style">카드 스타일</Label>
                    <Select 
                      value={templateSettings.cardStyle || 'shadow'} 
                      onValueChange={handleCardStyleChange}
                    >
                      <SelectTrigger id="card-style" className="mt-1">
                        <SelectValue placeholder="카드 스타일 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {cardStyleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="button-style">버튼 스타일</Label>
                    <Select 
                      value={templateSettings.buttonStyle || 'filled'} 
                      onValueChange={handleButtonStyleChange}
                    >
                      <SelectTrigger id="button-style" className="mt-1">
                        <SelectValue placeholder="버튼 스타일 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {buttonStyleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="header-style">헤더 스타일</Label>
                    <Select 
                      value={templateSettings.headerStyle || 'classic'} 
                      onValueChange={handleHeaderStyleChange}
                    >
                      <SelectTrigger id="header-style" className="mt-1">
                        <SelectValue placeholder="헤더 스타일 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {headerStyleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">컴포넌트 미리보기</h4>
                    <div className="p-4 border rounded-lg space-y-4">
                      <div className={`p-4 ${templateSettings.cardStyle === 'shadow' ? 'shadow-md' : 'border'} ${templateSettings.borderRadius || 'rounded-lg'}`}>
                        <h5 className="font-medium">카드 컴포넌트</h5>
                        <p className="text-sm text-gray-500">선택한 카드 스타일이 적용됩니다.</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className={templateSettings.borderRadius || 'rounded-lg'}
                          style={{ backgroundColor: templateSettings.primaryColor }}
                        >
                          기본 버튼
                        </Button>
                        <Button 
                          variant="outline"
                          className={templateSettings.borderRadius || 'rounded-lg'}
                        >
                          아웃라인 버튼
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Effects Tab */}
                <TabsContent value="effects" className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="luxury-effects" className="font-medium">럭셔리 효과</Label>
                      <p className="text-sm text-gray-500">고급스러운 시각 효과를 활성화합니다.</p>
                    </div>
                    <Switch 
                      id="luxury-effects" 
                      checked={templateSettings.luxuryEffects || false}
                      onCheckedChange={handleLuxuryEffectsChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="animations">애니메이션 효과</Label>
                    <Select 
                      value={templateSettings.animations || 'subtle'} 
                      onValueChange={handleAnimationChange}
                    >
                      <SelectTrigger id="animations" className="mt-1">
                        <SelectValue placeholder="애니메이션 효과 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {animationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">효과 미리보기</h4>
                    <div className="p-4 border rounded-lg">
                      <div 
                        className={`p-4 ${templateSettings.borderRadius || 'rounded-lg'} transition-all duration-300 ${
                          templateSettings.animations === 'none' ? '' : 'hover:scale-105'
                        } ${
                          templateSettings.luxuryEffects ? 'bg-gradient-to-r from-gray-50 to-white shadow-lg border border-gray-100' : 'bg-white border'
                        }`}
                      >
                        <h5 className="font-medium">효과 미리보기 요소</h5>
                        <p className="text-sm text-gray-500">마우스를 올려 애니메이션 효과를 확인하세요.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">템플릿 미리보기</h3>
        <div className="bg-gray-100 p-4 rounded-lg border flex justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-full">
            <div 
              className="h-16 flex items-center px-6"
              style={{ 
                backgroundColor: templateSettings.primaryColor,
                color: '#ffffff',
                fontFamily: templateSettings.fontFamily
              }}
            >
              <h3 className="font-bold">템플릿 미리보기 헤더</h3>
            </div>
            <div className="p-6">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ 
                  color: templateSettings.textColor,
                  fontFamily: templateSettings.fontFamily
                }}
              >
                {shopData.shopName} 템플릿
              </h2>
              <p 
                className="text-gray-600 mb-6"
                style={{ fontFamily: templateSettings.fontFamily }}
              >
                선택한 템플릿과 스타일 설정이 적용된 미리보기입니다.
              </p>
              
              <div 
                className={`p-4 mb-4 ${templateSettings.borderRadius || 'rounded-lg'} ${
                  templateSettings.cardStyle === 'shadow' ? 'shadow-md' : 'border'
                } ${
                  templateSettings.luxuryEffects ? 'bg-gradient-to-r from-gray-50 to-white' : 'bg-white'
                }`}
                style={{ fontFamily: templateSettings.fontFamily }}
              >
                <h4 className="font-medium mb-2">상품 카드 예시</h4>
                <p className="text-sm text-gray-500">상품 정보가 이런 스타일로 표시됩니다.</p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className={templateSettings.borderRadius || 'rounded-lg'}
                  style={{ 
                    backgroundColor: templateSettings.primaryColor,
                    fontFamily: templateSettings.fontFamily
                  }}
                >
                  주요 버튼
                </Button>
                <Button 
                  variant="outline"
                  className={templateSettings.borderRadius || 'rounded-lg'}
                  style={{ 
                    borderColor: templateSettings.secondaryColor,
                    color: templateSettings.secondaryColor,
                    fontFamily: templateSettings.fontFamily
                  }}
                >
                  보조 버튼
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSettingsTab;
