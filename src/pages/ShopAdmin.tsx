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
    Settings,
    Menu
} from 'lucide-react';
import { ShopData } from '@/types/shop';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import BasicInfoSettingsTab from '@/components/admin/BasicInfoSettingsTab';
import FooterSettingsTab from '@/components/admin/FooterSettingsTab';

type FooterSettingsType = NonNullable<ShopData['footerSettings']>;
type AdSettingsType = NonNullable<ShopData['adSettings']>;
type HeroSettingsType = NonNullable<ShopData['heroSettings']>;
type ThemeSettingsType = NonNullable<ShopData['themeSettings']>;
type LogoTextStyleType = NonNullable<ShopData['logoTextStyle']>;

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

const ShopAdmin = () => {
    const { shopUrl } = useParams();
    const [shopData, setShopData] = useState<ShopData | null>(null);
    const [activeTab, setActiveTab] = useState("basicInfo");
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [heroSettings, setHeroSettings] = useState({
        background: "#f9fafb",
        title: "Welcome to Our Shop",
        description: "Discover amazing products and services",
        buttonText: "Shop Now",
        buttonColor: "#4f46e5",
        imageUrl: "",
        imagePosition: "right",
        buttonIcon: true,
        buttonSize: "md",
        buttonRadius: "md",
        showDecorations: true,
        widgets: {} as Record<string, any>
    });

    const [footerSettings, setFooterSettings] = useState<FooterSettingsType>({
        background: "bg-gray-800",
        textColor: "text-white",
        ownerName: "",
        contactNumber: "",
        email: "",
        address: "",
        links: [],
        skin: 'default'
    });
    const [adSettings, setAdSettings] = useState<AdSettingsType>([
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
    const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [logoText, setLogoText] = useState<string>('');
    const [logoTextStyle, setLogoTextStyle] = useState<LogoTextStyleType>({
        fontSize: 'text-xl',
        fontWeight: 'font-bold',
        color: '#333333'
    });
    const [themeSettings, setThemeSettings] = useState<ThemeSettingsType>({
        primaryColor: "#3B82F6",
        secondaryColor: "#6366F1",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "rounded-lg",
    });

    useEffect(() => {
        if (!shopUrl) {
            console.error("Shop URL parameter is missing!");
            setShopData(null);
            return;
        }
        const uniqueShopKey = `peermallShopData_${shopUrl}`;
        const shopDataString = localStorage.getItem(uniqueShopKey);
        const parsedShopData: ShopData | null = shopDataString ? JSON.parse(shopDataString) : null;

        if (parsedShopData) {
            setShopData(parsedShopData);
            setHeroSettings(prev => ({
                ...prev,
                ...(parsedShopData.heroSettings || {}),
                title: parsedShopData.heroSettings?.title || (parsedShopData.shopName ? `${parsedShopData.shopName}에 오신 것을 환영합니다` : prev.title),
                description: parsedShopData.heroSettings?.description || parsedShopData.shopDescription || prev.description,
                widgets: { ...prev.widgets, ...(parsedShopData.heroSettings?.widgets || {}) }
            }));
            setFooterSettings(prev => ({
                ...prev,
                ...(parsedShopData.footerSettings || {}),
                ownerName: parsedShopData.footerSettings?.ownerName ?? parsedShopData.ownerName ?? prev.ownerName,
                contactNumber: parsedShopData.footerSettings?.contactNumber ?? parsedShopData.contactNumber ?? prev.contactNumber,
                email: parsedShopData.footerSettings?.email ?? parsedShopData.email ?? prev.email,
                address: parsedShopData.footerSettings?.address ?? parsedShopData.address ?? prev.address,
                links: parsedShopData.footerSettings?.links || [],
                skin: parsedShopData.footerSettings?.skin || 'default'
            }));
            setThemeSettings(prev => ({ ...prev, ...(parsedShopData.themeSettings || {}) }));
            setAdSettings((parsedShopData.adSettings || []).map(ad => ({
                ...ad,
                id: ad.id || Date.now(),
                isActive: ad.isActive === undefined ? true : ad.isActive
            })));
            setFaviconUrl(parsedShopData.faviconUrl || null);
            setLogoUrl(parsedShopData.logoUrl || null);
            setLogoText(parsedShopData.logoText || '');
            setLogoTextStyle(parsedShopData.logoTextStyle || { fontSize: 'text-xl', fontWeight: 'font-bold', color: '#333333' });
        } else {
            console.warn(`No matching shop data found in localStorage for shopUrl: ${shopUrl}`);
            setShopData(null);
        }
    }, [shopUrl]);

    const saveChanges = () => {
        if (!shopData || !shopUrl) return;

        const updatedShopData: ShopData = {
            ...shopData,
            shopDescription: shopData.shopDescription,
            themeSettings,
            heroSettings: {
                background: heroSettings.background ?? "bg-gradient-to-r from-blue-500 to-indigo-600",
                title: heroSettings.title ?? `${shopData.shopName}에 오신 것을 환영합니다`,
                description: heroSettings.description ?? shopData.shopDescription ?? '',
                buttonText: heroSettings.buttonText ?? "상품 구경하기",
                buttonColor: heroSettings.buttonColor ?? "bg-white text-blue-600 hover:bg-gray-100",
                imageUrl: heroSettings.imageUrl,
                imagePosition: heroSettings.imagePosition,
                buttonIcon: heroSettings.buttonIcon,
                buttonSize: heroSettings.buttonSize,
                buttonRadius: heroSettings.buttonRadius,
                showDecorations: heroSettings.showDecorations,
                widgets: heroSettings.widgets,
            },
            footerSettings,
            adSettings,
            faviconUrl,
            logoUrl,
            logoText,
            logoTextStyle
        };

        const uniqueShopKey = `peermallShopData_${shopUrl}`;
        localStorage.setItem(uniqueShopKey, JSON.stringify(updatedShopData));
        alert('설정이 저장되었습니다.');
    };

    const addNewAd = () => { /* ... implementation ... */ };
    const deleteAd = (adId: number) => { /* ... implementation ... */ };
    const handleAdChange = (adId: number, field: string, value: string | boolean) => { /* ... implementation ... */ };

    if (!shopData) {
        if (!shopUrl) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h1 className="text-2xl font-bold mb-4">오류</h1>
                    <p className="text-gray-600 mb-6">피어몰 주소가 URL에 없습니다.</p>
                    <Link to="/personal-lounge">
                        <Button>내 라운지로 이동</Button>
                    </Link>
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">피어몰 로딩 중...</h1>
                <p className="text-gray-600 mb-6">({shopUrl}) 데이터를 불러오는 중입니다...</p>
            </div>
        );
    }

    const adminSections = [
        { value: "basicInfo", label: "기본 정보", icon: Settings },
        { value: "logo", label: "로고 설정", icon: Image },
        { value: "hero", label: "히어로 섹션", icon: LayoutDashboard },
        { value: "ads", label: "광고 관리", icon: MousePointerClick },
        { value: "footer", label: "푸터 정보", icon: Layout },
    ];

    const renderTabContent = (tabValue: string) => {
        switch (tabValue) {
            case "basicInfo":
                return <BasicInfoSettingsTab shopData={shopData} setShopData={setShopData} />;
            case "logo":
                return <LogoSettingsTab
                            shopName={shopData.shopName}
                            logoUrl={logoUrl}
                            logoText={logoText}
                            logoTextStyle={logoTextStyle}
                            setLogoUrl={setLogoUrl}
                            setLogoText={setLogoText}
                            setLogoTextStyle={setLogoTextStyle}
                        />;
            case "hero":
                return <HeroSettingsTab shopName={shopData.shopName} heroSettings={heroSettings} setHeroSettings={setHeroSettings} />;
            case "ads":
                return <AdManagementTab adSettings={adSettings} setAdSettings={setAdSettings} />;
            case "footer":
                return <FooterSettingsTab
                            shopData={shopData}
                            footerSettings={footerSettings}
                            setShopData={setShopData}
                            setFooterSettings={setFooterSettings}
                        />;
            default:
                return <div>선택된 탭이 없습니다.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Link to={`/shop/${shopUrl}/home`} className="flex items-center text-gray-600 hover:text-blue-600">
                                <ArrowLeft className="h-5 w-5 md:mr-2" />
                                <span className="hidden md:inline">내 피어몰 보기</span>
                            </Link>
                            <h1 className="text-lg md:text-xl font-bold truncate">{shopData.shopName} 관리</h1>
                        </div>
                        <Button onClick={saveChanges} className="flex items-center bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1.5 md:px-4 md:py-2">
                            <Save className="h-4 w-4 mr-1 md:mr-2" />
                            <span className="hidden md:inline">변경사항 저장</span>
                            <span className="md:hidden">저장</span>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 md:py-8">
                {isMobile ? (
                    <div className="w-full">
                        <Select value={activeTab} onValueChange={setActiveTab}>
                            <SelectTrigger className="w-full mb-4">
                                <SelectValue placeholder="관리 섹션 선택..." />
                            </SelectTrigger>
                            <SelectContent>
                                {adminSections.map((section) => (
                                    <SelectItem key={section.value} value={section.value}>
                                        <div className="flex items-center">
                                            <section.icon className="h-4 w-4 mr-2" />
                                            {section.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="bg-white p-4 md:p-6 rounded-lg border">
                            {renderTabContent(activeTab)}
                        </div>
                    </div>
                ) : (
                    <Tabs
                        defaultValue="basicInfo"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                        orientation="vertical"
                    >
                        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
                            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sections={adminSections} />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={80}>
                                <div className="h-full bg-white p-6 overflow-y-auto">
                                    {renderTabContent(activeTab)}
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default ShopAdmin;
