import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Layout,
    LayoutDashboard,
    Image,
    Box,
    Palette,
    Store,
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
import { Switch } from "@/components/ui/switch";
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
import HeroSettingsTab from '@/components/admin/HeroSettingsTab';
import AdManagementTab from '@/components/admin/AdManagementTab';

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
        imageUrl: "",
        imagePosition: "right",
        buttonIcon: true,
        buttonSize: "medium",
        buttonRadius: "rounded-full",
        showDecorations: true,
        widgets: {
            showProductCount: false,
            showRating: false,
            showBadge: false,
            badgeText: "신규",
        }
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
            if (parsedShopData.shopDescription) {
                setHeroSettings(prev => ({
                    ...prev,
                    title: `${parsedShopData.shopName}에 오신 것을 환영합니다`,
                    description: parsedShopData.shopDescription
                }));
            }
            if (parsedShopData.heroSettings) {
                setHeroSettings(prev => ({
                    ...prev,
                    ...(parsedShopData.heroSettings || {})
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
            if (parsedShopData.themeSettings) setThemeSettings(parsedShopData.themeSettings);
            if (parsedShopData.footerSettings) setFooterSettings(parsedShopData.footerSettings);
            if (parsedShopData.adSettings) setAdSettings(parsedShopData.adSettings);
            if (parsedShopData.faviconUrl) setFaviconUrl(parsedShopData.faviconUrl);
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
                <Tabs
                    defaultValue="layout"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
                        <ResizablePanel defaultSize={20} minSize={15}>
                            <div className="flex h-full flex-col bg-white">
                                <div className="border-b p-4">
                                    <h2 className="text-lg font-semibold">관리 메뉴</h2>
                                </div>
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
                                        <Store className="h-4 w-4 mr-2" />
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
                                        <Box className="h-4 w-4 mr-2" />
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
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel defaultSize={80}>
                            <div className="h-full bg-white p-6 overflow-y-auto">
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
                                                        <Button variant="ghost" size="sm" onClick={() => {/* Add edit logic or navigate */ }}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                            <Card className="cursor-move hover:shadow-md transition-shadow">
                                                <CardHeader className="p-4 bg-gray-50">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-md">히어로 섹션</CardTitle>
                                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('hero')}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                            <Card className="cursor-move hover:shadow-md transition-shadow">
                                                <CardHeader className="p-4 bg-gray-50">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-md">상품 섹션</CardTitle>
                                                        <Button variant="ghost" size="sm" onClick={() => {/* Add edit logic or navigate */ }}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                            <Card className="cursor-move hover:shadow-md transition-shadow">
                                                <CardHeader className="p-4 bg-gray-50">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-md">광고 섹션</CardTitle>
                                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('ads')}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                            <Card className="cursor-move hover:shadow-md transition-shadow">
                                                <CardHeader className="p-4 bg-gray-50">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-md">푸터 섹션</CardTitle>
                                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('footer')}>
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
                                    <HeroSettingsTab
                                        shopName={shopData.shopName}
                                        heroSettings={heroSettings}
                                        setHeroSettings={setHeroSettings}
                                    />
                                </TabsContent>

                                <TabsContent value="ads" className="h-full">
                                    <AdManagementTab 
                                        adSettings={adSettings}
                                        setAdSettings={setAdSettings}
                                    />
                                </TabsContent>

                                <TabsContent value="theme" className="h-full">
                                    <div className="flex flex-col h-full">
                                        <h2 className="text-2xl font-bold mb-6">테마 설정</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="primary-color">기본 색상</Label>
                                                    <Input
                                                        type="color"
                                                        id="primary-color"
                                                        value={themeSettings.primaryColor}
                                                        onChange={e => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                                                        className="mt-1 h-10 w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="secondary-color">보조 색상</Label>
                                                    <Input
                                                        type="color"
                                                        id="secondary-color"
                                                        value={themeSettings.secondaryColor}
                                                        onChange={e => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                                                        className="mt-1 h-10 w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="font-family">글꼴</Label>
                                                    <select
                                                        id="font-family"
                                                        value={themeSettings.fontFamily}
                                                        onChange={e => setThemeSettings({ ...themeSettings, fontFamily: e.target.value })}
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                                                    >
                                                        <option value="system-ui, sans-serif">System Sans</option>
                                                        <option value="serif">Serif</option>
                                                        <option value="monospace">Monospace</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <Label htmlFor="border-radius">테두리 반경</Label>
                                                    <select
                                                        id="border-radius"
                                                        value={themeSettings.borderRadius}
                                                        onChange={e => setThemeSettings({ ...themeSettings, borderRadius: e.target.value })}
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                                                    >
                                                        <option value="rounded-none">없음</option>
                                                        <option value="rounded-sm">작게</option>
                                                        <option value="rounded">기본</option>
                                                        <option value="rounded-md">중간</option>
                                                        <option value="rounded-lg">크게</option>
                                                        <option value="rounded-full">원형</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-3">테마 미리보기</h3>
                                                <div className={`p-4 ${themeSettings.borderRadius} shadow`} style={{ backgroundColor: themeSettings.primaryColor, color: 'white', fontFamily: themeSettings.fontFamily }}>
                                                    <h4 className="text-lg font-bold mb-2">미리보기 제목</h4>
                                                    <p className="mb-3">이것은 테마 설정 미리보기입니다.</p>
                                                    <Button
                                                        className={`${themeSettings.borderRadius}`}
                                                        style={{ backgroundColor: themeSettings.secondaryColor, color: 'white' }}
                                                    >
                                                        미리보기 버튼
                                                    </Button>
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
                                                    <Label htmlFor="owner-name">대표자 이름</Label>
                                                    <Input
                                                        type="text"
                                                        id="owner-name"
                                                        value={footerSettings.ownerName}
                                                        onChange={e => setFooterSettings({ ...footerSettings, ownerName: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="contact-number">연락처</Label>
                                                    <Input
                                                        type="text"
                                                        id="contact-number"
                                                        value={footerSettings.contactNumber}
                                                        onChange={e => setFooterSettings({ ...footerSettings, contactNumber: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">이메일</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        value={footerSettings.email}
                                                        onChange={e => setFooterSettings({ ...footerSettings, email: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="footer-background">배경 색상</Label>
                                                    <Input
                                                        type="color"
                                                        id="footer-background"
                                                        value={footerSettings.background.startsWith('#') ? footerSettings.background : '#374151'}
                                                        onChange={e => setFooterSettings({ ...footerSettings, background: e.target.value })}
                                                        className="mt-1 h-10 w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="footer-text-color">글자 색상</Label>
                                                    <Input
                                                        type="color"
                                                        id="footer-text-color"
                                                        value={footerSettings.textColor.startsWith('#') ? footerSettings.textColor : '#ffffff'}
                                                        onChange={e => setFooterSettings({ ...footerSettings, textColor: e.target.value })}
                                                        className="mt-1 h-10 w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold mb-3">푸터 미리보기</h3>
                                                <div className="p-4 rounded-lg" style={{ backgroundColor: footerSettings.background, color: footerSettings.textColor }}>
                                                    <p><strong>소유자:</strong> {footerSettings.ownerName || '미입력'}</p>
                                                    <p><strong>연락처:</strong> {footerSettings.contactNumber || '미입력'}</p>
                                                    <p><strong>이메일:</strong> {footerSettings.email || '미입력'}</p>
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
                                                        type="text"
                                                        id="favicon-url"
                                                        value={faviconUrl}
                                                        onChange={e => setFaviconUrl(e.target.value)}
                                                        className="mt-1"
                                                        placeholder="https://example.com/favicon.ico"
                                                    />
                                                    <p className="text-sm text-gray-500 mt-1">.ico, .png, .svg 형식의 URL을 입력하세요.</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                                                <h3 className="font-semibold mb-3">파비콘 미리보기</h3>
                                                {faviconUrl ? (
                                                    <img
                                                        src={faviconUrl}
                                                        alt="파비콘 미리보기"
                                                        className="h-8 w-8"
                                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs">
                                                        아이콘
                                                    </div>
                                                )}
                                                <p className="text-xs text-gray-500 mt-2">브라우저 탭에 표시될 아이콘입니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Tabs>
            </div>
        </div>
    );
};

export default ShopAdmin;
