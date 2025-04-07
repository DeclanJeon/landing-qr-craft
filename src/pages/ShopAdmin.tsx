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
    ExternalLink,
    Settings // Added Settings icon import implicitly by AdminSidebar changes
} from 'lucide-react';
import { ShopData } from '@/types/shop';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTabContent from '@/components/admin/AdminTabContent'; // This seems unused, consider removing later
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
import StorageManagementTab from '@/components/admin/StorageManagementTab';
import FaviconSettingsTab from '@/components/admin/FaviconSettingsTab';
import LogoSettingsTab from '@/components/admin/LogoSettingsTab';
import BasicInfoSettingsTab from '@/components/admin/BasicInfoSettingsTab'; // Import Basic Info tab

const ShopAdmin = () => {
    const { shopUrl } = useParams();
    const [shopData, setShopData] = useState<ShopData | null>(null);
    // Default to 'basicInfo' if layout is not the primary focus anymore
    const [activeTab, setActiveTab] = useState("basicInfo"); 
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
            targetPages: ["home"],
            imageUrl: "https://placehold.co/600x300",
            link: "#",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isActive: true
        }
    ]);
    const [faviconUrl, setFaviconUrl] = useState(""); // State for favicon URL
    const [logoUrl, setLogoUrl] = useState(""); // State for logo URL
    const [themeSettings, setThemeSettings] = useState({
        primaryColor: "#3B82F6",
        secondaryColor: "#6366F1",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "rounded-lg",
    });

    useEffect(() => {
        // --- Refactored Storage Logic ---
        if (!shopUrl) {
            console.error("Shop URL parameter is missing!");
            setShopData(null); // Indicate not found if URL is missing
            return;
        }
        const uniqueShopKey = `peermallShopData_${shopUrl}`;
        const shopDataString = localStorage.getItem(uniqueShopKey);
        // --- End Refactored Storage Logic ---

        let parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;

        // Ensure data was actually loaded for this specific shop
        if (parsedShopData) { 
            setShopData(parsedShopData);
            // Initialize settings based on loaded data or defaults
            setHeroSettings(prev => ({
                ...prev, // Keep defaults
                ...(parsedShopData?.heroSettings || {}), // Override with saved data
                title: parsedShopData?.shopName ? `${parsedShopData.shopName}에 오신 것을 환영합니다` : prev.title,
                description: parsedShopData?.shopDescription || prev.description,
                widgets: { // Ensure widgets object exists
                    ...prev.widgets,
                    ...(parsedShopData?.heroSettings?.widgets || {})
                }
            }));
            setFooterSettings(prev => ({
                ...prev,
                ...(parsedShopData?.footerSettings || {}), // Override with saved data
                ownerName: parsedShopData?.ownerName || prev.ownerName,
                contactNumber: parsedShopData?.contactNumber || prev.contactNumber,
                email: parsedShopData?.email || prev.email,
                address: parsedShopData?.address || prev.address
            }));
             setThemeSettings(prev => ({
                ...prev,
                ...(parsedShopData?.themeSettings || {}) // Override with saved data
            }));
             setAdSettings(
                (parsedShopData?.adSettings || []).map((ad: any) => ({ // Ensure adSettings is an array
                    id: ad.id || Date.now(), // Ensure ID exists
                    title: ad.title || "새 광고",
                    description: ad.description || "",
                    position: ad.position || "sidebar",
                    targetPages: ad.targetPages || ['home'],
                    imageUrl: ad.imageUrl || "https://placehold.co/300x200",
                    link: ad.link || "#",
                    startDate: ad.startDate || new Date().toISOString().split('T')[0],
                    endDate: ad.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    isActive: ad.isActive === undefined ? true : ad.isActive // Default to true if undefined
                }))
            );
            setFaviconUrl(parsedShopData?.faviconUrl || "");
            setLogoUrl(parsedShopData?.logoUrl || "");
        } else {
             // Handle case where no data found or URL mismatch (optional: redirect or show error)
             console.warn(`No matching shop data found in localStorage for shopUrl: ${shopUrl}`);
             // Maybe set shopData to null to trigger the 'not found' message
             setShopData(null); 
        }
    }, [shopUrl]); // Rerun effect if shopUrl changes

    const saveChanges = () => {
        if (!shopData || !shopUrl) return; // Ensure we have data and url

        // Create the object to save, ensuring all parts are included
        const updatedShopData: ShopData = {
            ...shopData, // Includes shopName, shopUrl (which should match), etc.
            shopDescription: heroSettings.description, // Update description from hero settings
            ownerName: footerSettings.ownerName, // Update owner info from footer settings
            contactNumber: footerSettings.contactNumber,
            email: footerSettings.email,
            address: footerSettings.address,
            themeSettings, // Save current theme settings
            heroSettings, // Save current hero settings
            footerSettings, // Save current footer settings
            adSettings, // Save current ad settings
            faviconUrl, // Save current favicon URL
            logoUrl // Save current logo URL
        };

        // --- Refactored Storage Logic ---
        const uniqueShopKey = `peermallShopData_${shopUrl}`;
        localStorage.setItem(uniqueShopKey, JSON.stringify(updatedShopData));
        // --- End Refactored Storage Logic ---
        
        alert('설정이 저장되었습니다.');
    };

    // Ad management functions remain the same...
    const addNewAd = () => {
        const newAd = {
            id: Date.now(),
            title: "새 광고",
            description: "광고 설명을 입력하세요",
            position: "sidebar",
            imageUrl: "https://placehold.co/300x200",
            link: "#",
            targetPages: ["home"],
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
                <p className="text-gray-600 mb-6">요청하신 피어몰({shopUrl})이 존재하지 않거나 접근할 수 없습니다.</p>
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
                                <span>내 피어몰 보기</span>
                            </Link>
                            <h1 className="text-xl font-bold">{shopData.shopName} 관리</h1>
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
                    // Default to basicInfo tab
                    defaultValue="basicInfo" 
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
                        <ResizablePanel defaultSize={20} minSize={15}>
                            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel defaultSize={80}>
                            <div className="h-full bg-white p-6 overflow-y-auto">
                                {/* Layout Tab Content */}
                                <TabsContent value="layout" className="h-full mt-0">
                                    <div className="flex flex-col h-full">
                                        <h2 className="text-2xl font-bold mb-6">레이아웃 관리</h2>
                                        <p className="text-gray-600 mb-6">
                                            페이지 섹션의 순서를 변경합니다. (드래그앤드롭 기능은 개발 중)
                                        </p>
                                        {/* Simplified Layout Cards */}
                                        <div className="space-y-4">
                                            {['헤더', '기본 정보', '히어로', '상품', '광고', '푸터'].map((section, index) => (
                                                <Card key={index}>
                                                    <CardHeader className="p-4 bg-gray-50">
                                                        <CardTitle className="text-md">{section} 섹션</CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Basic Info Tab Content */}
                                <TabsContent value="basicInfo" className="h-full mt-0">
                                     <BasicInfoSettingsTab 
                                        shopData={shopData} 
                                        setShopData={setShopData} 
                                    />
                                </TabsContent>

                                {/* Hero Tab Content */}
                                <TabsContent value="hero" className="h-full mt-0">
                                    <HeroSettingsTab
                                        shopName={shopData.shopName}
                                        heroSettings={heroSettings}
                                        setHeroSettings={setHeroSettings}
                                    />
                                </TabsContent>

                                {/* Ads Tab Content */}
                                <TabsContent value="ads" className="h-full mt-0">
                                    <AdManagementTab 
                                        adSettings={adSettings}
                                        setAdSettings={setAdSettings}
                                    />
                                </TabsContent>

                                {/* Theme Tab Content */}
                                <TabsContent value="theme" className="h-full mt-0">
                                    <div className="flex flex-col h-full">
                                        <h2 className="text-2xl font-bold mb-6">테마 설정</h2>
                                        {/* Theme settings form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="primary-color">기본 색상</Label>
                                                    <Input type="color" id="primary-color" value={themeSettings.primaryColor} onChange={e => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })} className="mt-1 h-10 w-full"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="secondary-color">보조 색상</Label>
                                                    <Input type="color" id="secondary-color" value={themeSettings.secondaryColor} onChange={e => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })} className="mt-1 h-10 w-full"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="font-family">글꼴</Label>
                                                    <select id="font-family" value={themeSettings.fontFamily} onChange={e => setThemeSettings({ ...themeSettings, fontFamily: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1">
                                                        <option value="system-ui, sans-serif">System Sans</option>
                                                        <option value="serif">Serif</option>
                                                        <option value="monospace">Monospace</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <Label htmlFor="border-radius">테두리 반경</Label>
                                                    <select id="border-radius" value={themeSettings.borderRadius} onChange={e => setThemeSettings({ ...themeSettings, borderRadius: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1">
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
                                                    <Button className={`${themeSettings.borderRadius}`} style={{ backgroundColor: themeSettings.secondaryColor, color: 'white' }}>미리보기 버튼</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Footer Tab Content */}
                                <TabsContent value="footer" className="h-full mt-0">
                                    <div className="flex flex-col h-full">
                                        <h2 className="text-2xl font-bold mb-6">푸터 정보 설정</h2>
                                        {/* Footer settings form */}
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="owner-name">대표자 이름</Label>
                                                    <Input type="text" id="owner-name" value={footerSettings.ownerName} onChange={e => setFooterSettings({ ...footerSettings, ownerName: e.target.value })} className="mt-1"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="contact-number">연락처</Label>
                                                    <Input type="text" id="contact-number" value={footerSettings.contactNumber} onChange={e => setFooterSettings({ ...footerSettings, contactNumber: e.target.value })} className="mt-1"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">이메일</Label>
                                                    <Input type="email" id="email" value={footerSettings.email} onChange={e => setFooterSettings({ ...footerSettings, email: e.target.value })} className="mt-1"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="address">주소</Label>
                                                    <Input type="text" id="address" value={footerSettings.address} onChange={e => setFooterSettings({ ...footerSettings, address: e.target.value })} className="mt-1"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="footer-background">배경 색상</Label>
                                                    <Input type="color" id="footer-background" value={footerSettings.background.startsWith('#') ? footerSettings.background : '#374151'} onChange={e => setFooterSettings({ ...footerSettings, background: e.target.value })} className="mt-1 h-10 w-full"/>
                                                </div>
                                                <div>
                                                    <Label htmlFor="footer-text-color">글자 색상</Label>
                                                    <Input type="color" id="footer-text-color" value={footerSettings.textColor.startsWith('#') ? footerSettings.textColor : '#ffffff'} onChange={e => setFooterSettings({ ...footerSettings, textColor: e.target.value })} className="mt-1 h-10 w-full"/>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                                                <h3 className="font-semibold mb-3">푸터 미리보기</h3>
                                                <div className="p-4 rounded-lg w-full" style={{ backgroundColor: footerSettings.background, color: footerSettings.textColor }}>
                                                    <p><strong>대표자:</strong> {footerSettings.ownerName || '미입력'}</p>
                                                    <p><strong>연락처:</strong> {footerSettings.contactNumber || '미입력'}</p>
                                                    <p><strong>이메일:</strong> {footerSettings.email || '미입력'}</p>
                                                    <p><strong>주소:</strong> {footerSettings.address || '미입력'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                
                                {/* Logo Settings Tab Content */}
                                <TabsContent value="logo" className="h-full mt-0">
                                    <LogoSettingsTab 
                                        shopName={shopData.shopName} 
                                        logoUrl={logoUrl} 
                                    />
                                </TabsContent>

                                {/* Favicon Settings Tab Content - Fixed by adding setFaviconUrl */}
                                <TabsContent value="favicon" className="h-full mt-0">
                                    <FaviconSettingsTab 
                                        shopName={shopData.shopName} 
                                        faviconUrl={faviconUrl} 
                                        setFaviconUrl={setFaviconUrl} // Add missing prop
                                    />
                                </TabsContent>

                                {/* Storage Tab Content */}
                                <TabsContent value="storage" className="h-full mt-0">
                                    <StorageManagementTab />
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
