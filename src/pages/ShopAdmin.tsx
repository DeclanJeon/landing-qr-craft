
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Layout, 
  LayoutDashboard, 
  Image, 
  Footer, 
  Palette, 
  Ad, 
  MousePointerClick, 
  ArrowLeft,
  Save,
  Edit,
  Trash,
  Plus,
  ExternalLink
} from 'lucide-react';
import { ShopData } from '@/types/shop';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ShopAdmin = () => {
  const { shopUrl } = useParams();
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [activeTab, setActiveTab] = useState("layout");
  const [heroSettings, setHeroSettings] = useState({
    background: "bg-gradient-to-r from-blue-500 to-indigo-600",
    title: "",
    description: "",
    buttonText: "상품 구경하기",
    buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
  });
  const [footerSettings, setFooterSettings] = useState({
    background: "bg-gray-800",
    textColor: "text-white",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [adSettings, setAdSettings] = useState([
    {
      id: 1,
      title: "신규 회원 할인",
      description: "가입 후 첫 구매 시 10% 할인",
      position: "hero",
      imageUrl: "https://placehold.co/600x300",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    }
  ]);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3B82F6",
    secondaryColor: "#6366F1",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "rounded-lg",
  });

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    const parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;
    
    if (parsedShopData && parsedShopData.shopUrl === shopUrl) {
      setShopData(parsedShopData);
      
      // Initialize settings from stored data if available
      if (parsedShopData.shopDescription) {
        setHeroSettings(prev => ({
          ...prev,
          title: `${parsedShopData.shopName}에 오신 것을 환영합니다`,
          description: parsedShopData.shopDescription
        }));
      }
      
      if (parsedShopData.ownerName || parsedShopData.contactNumber || parsedShopData.email) {
        setFooterSettings(prev => ({
          ...prev,
          ownerName: parsedShopData.ownerName || '',
          contactNumber: parsedShopData.contactNumber || '',
          email: parsedShopData.email || '',
          address: parsedShopData.address || ''
        }));
      }
    }
  }, [shopUrl]);

  const saveChanges = () => {
    if (!shopData) return;
    
    const updatedShopData = {
      ...shopData,
      shopDescription: heroSettings.description,
      ownerName: footerSettings.ownerName,
      contactNumber: footerSettings.contactNumber,
      email: footerSettings.email,
      address: footerSettings.address,
      // Save additional settings as needed
      themeSettings,
      heroSettings,
      footerSettings,
      adSettings,
      faviconUrl
    };
    
    localStorage.setItem('peermallShopData', JSON.stringify(updatedShopData));
    alert('설정이 저장되었습니다.');
  };

  const addNewAd = () => {
    const newAd = {
      id: Date.now(),
      title: "새 광고",
      description: "광고 설명을 입력하세요",
      position: "sidebar",
      imageUrl: "https://placehold.co/300x200",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    };
    
    setAdSettings([...adSettings, newAd]);
  };

  const deleteAd = (adId: number) => {
    setAdSettings(adSettings.filter(ad => ad.id !== adId));
  };

  const handleAdChange = (adId: number, field: string, value: string | boolean) => {
    setAdSettings(adSettings.map(ad => 
      ad.id === adId ? { ...ad, [field]: value } : ad
    ));
  };

  if (!shopData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">피어몰을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 피어몰이 존재하지 않거나 접근할 수 없습니다.</p>
        <Link to="/personal-lounge">
          <Button>피어몰 만들기로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to={`/shop/${shopUrl}/home`} className="flex items-center text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>돌아가기</span>
              </Link>
              <h1 className="text-xl font-bold">{shopData.shopName} 관리자 페이지</h1>
            </div>
            <Button onClick={saveChanges} className="flex items-center bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              <span>변경사항 저장</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="flex h-full flex-col bg-white">
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold">관리 메뉴</h2>
              </div>
              <Tabs 
                defaultValue="layout" 
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
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
                    <Ad className="h-4 w-4 mr-2" />
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
                    <Footer className="h-4 w-4 mr-2" />
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
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <div className="h-full bg-white p-6">
              <TabsContent value="layout" className="h-full">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-bold mb-6">레이아웃 관리</h2>
                  <p className="text-gray-600 mb-6">
                    드래그 앤 드롭으로 페이지 섹션의 순서를 변경할 수 있습니다. 각 요소를 클릭하여 세부 설정을 변경하세요.
                  </p>
                  
                  <div className="space-y-4">
                    <Card className="cursor-move hover:shadow-md transition-shadow">
                      <CardHeader className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">헤더 섹션</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                    
                    <Card className="cursor-move hover:shadow-md transition-shadow">
                      <CardHeader className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">히어로 섹션</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                    
                    <Card className="cursor-move hover:shadow-md transition-shadow">
                      <CardHeader className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">상품 섹션</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                    
                    <Card className="cursor-move hover:shadow-md transition-shadow">
                      <CardHeader className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">피어몰 리스트</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                    
                    <Card className="cursor-move hover:shadow-md transition-shadow">
                      <CardHeader className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">푸터 섹션</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600">
                      드래그 앤 드롭 기능은 현재 구현 중입니다. 곧 업데이트될 예정입니다.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hero" className="h-full">
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
                          <h1 className="text-3xl font-bold mb-2">{heroSettings.title || shopData.shopName}</h1>
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
              </TabsContent>
              
              <TabsContent value="ads" className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">광고 관리</h2>
                    <Button onClick={addNewAd} className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      새 광고 추가
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {adSettings.map(ad => (
                      <Card key={ad.id} className="overflow-hidden">
                        <CardHeader className="p-4 bg-gray-50">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-md">{ad.title}</CardTitle>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteAd(ad.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-1">
                              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
                                <img 
                                  src={ad.imageUrl} 
                                  alt={ad.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button variant="outline" size="sm" className="w-full">
                                이미지 변경
                              </Button>
                            </div>
                            
                            <div className="col-span-2 space-y-3">
                              <div>
                                <Label htmlFor={`ad-title-${ad.id}`}>광고 제목</Label>
                                <Input 
                                  id={`ad-title-${ad.id}`} 
                                  value={ad.title} 
                                  onChange={(e) => handleAdChange(ad.id, 'title', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`ad-description-${ad.id}`}>광고 설명</Label>
                                <Input 
                                  id={`ad-description-${ad.id}`} 
                                  value={ad.description} 
                                  onChange={(e) => handleAdChange(ad.id, 'description', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor={`ad-position-${ad.id}`}>표시 위치</Label>
                                  <select 
                                    id={`ad-position-${ad.id}`}
                                    value={ad.position}
                                    onChange={(e) => handleAdChange(ad.id, 'position', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                  >
                                    <option value="hero">히어로 섹션</option>
                                    <option value="sidebar">사이드바</option>
                                    <option value="products">상품 목록 사이</option>
                                    <option value="footer">푸터 위</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <Label htmlFor={`ad-active-${ad.id}`}>활성화 상태</Label>
                                  <select 
                                    id={`ad-active-${ad.id}`}
                                    value={ad.isActive ? "true" : "false"}
                                    onChange={(e) => handleAdChange(ad.id, 'isActive', e.target.value === "true")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                  >
                                    <option value="true">활성화</option>
                                    <option value="false">비활성화</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor={`ad-start-${ad.id}`}>시작일</Label>
                                  <Input 
                                    id={`ad-start-${ad.id}`} 
                                    type="date"
                                    value={ad.startDate} 
                                    onChange={(e) => handleAdChange(ad.id, 'startDate', e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor={`ad-end-${ad.id}`}>종료일</Label>
                                  <Input 
                                    id={`ad-end-${ad.id}`} 
                                    type="date"
                                    value={ad.endDate} 
                                    onChange={(e) => handleAdChange(ad.id, 'endDate', e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="theme" className="h-full">
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
              </TabsContent>
              
              <TabsContent value="footer" className="h-full">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-bold mb-6">푸터 정보 설정</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="footer-background">배경 스타일</Label>
                        <select 
                          id="footer-background"
                          value={footerSettings.background}
                          onChange={e => setFooterSettings({...footerSettings, background: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        >
                          <option value="bg-gray-800">다크 그레이</option>
                          <option value="bg-gray-900">블랙</option>
                          <option value="bg-blue-800">다크 블루</option>
                          <option value="bg-purple-800">다크 퍼플</option>
                          <option value="bg-green-800">다크 그린</option>
                          <option value="bg-white">화이트</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="footer-text-color">텍스트 색상</Label>
                        <select 
                          id="footer-text-color"
                          value={footerSettings.textColor}
                          onChange={e => setFooterSettings({...footerSettings, textColor: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        >
                          <option value="text-white">화이트</option>
                          <option value="text-gray-900">블랙</option>
                          <option value="text-gray-500">그레이</option>
                          <option value="text-blue-500">블루</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="owner-name">대표자명</Label>
                        <Input 
                          id="owner-name" 
                          value={footerSettings.ownerName} 
                          onChange={e => setFooterSettings({...footerSettings, ownerName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contact-number">연락처</Label>
                        <Input 
                          id="contact-number" 
                          value={footerSettings.contactNumber} 
                          onChange={e => setFooterSettings({...footerSettings, contactNumber: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input 
                          id="email" 
                          value={footerSettings.email} 
                          onChange={e => setFooterSettings({...footerSettings, email: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">주소</Label>
                        <Input 
                          id="address" 
                          value={footerSettings.address} 
                          onChange={e => setFooterSettings({...footerSettings, address: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">푸터 미리보기</h3>
                      <div className={`rounded-lg overflow-hidden ${footerSettings.background} ${footerSettings.textColor} p-6`}>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-2">{shopData.shopName}</h3>
                          <p className="opacity-80">
                            {shopData.shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-medium mb-2">연락처 정보</h4>
                            <ul className="space-y-1 opacity-80">
                              {footerSettings.ownerName && <li>대표자: {footerSettings.ownerName}</li>}
                              {footerSettings.contactNumber && <li>연락처: {footerSettings.contactNumber}</li>}
                              {footerSettings.email && <li>이메일: {footerSettings.email}</li>}
                              {footerSettings.address && <li>주소: {footerSettings.address}</li>}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium mb-2">쇼핑몰 정보</h4>
                            <ul className="space-y-1">
                              <li className="opacity-80">소개</li>
                              <li className="opacity-80">서비스</li>
                              <li className="opacity-80">이용약관</li>
                              <li className="opacity-80">개인정보처리방침</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="favicon" className="h-full">
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
                          {shopData.shopName} | 브라우저 탭 미리보기
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
              </TabsContent>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ShopAdmin;
