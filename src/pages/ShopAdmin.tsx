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
import FooterSettingsTab from '@/components/admin/FooterSettingsTab'; // Import the new FooterSettingsTab

// Define types locally for state initialization and casting
type FooterSettingsType = NonNullable<ShopData['footerSettings']>;
type AdSettingsType = NonNullable<ShopData['adSettings']>;
type HeroSettingsType = NonNullable<ShopData['heroSettings']>;
type ThemeSettingsType = NonNullable<ShopData['themeSettings']>;
type LogoTextStyleType = NonNullable<ShopData['logoTextStyle']>;


// Simple hook to check screen size
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

    // State initialization with default values and correct types
    const [heroSettings, setHeroSettings] = useState<HeroSettingsType>({
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

    // Effect to load data from localStorage
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
            // Initialize states from loaded data, providing defaults
            setHeroSettings(prev => ({
                ...prev,
                ...(parsedShopData.heroSettings || {}),
                title: parsedShopData.heroSettings?.title || (parsedShopData.shopName ? `${parsedShopData.shopName}에 오신 것을 환영합니다` : prev.title),
                // Use shopDescription from root if heroSettings.description is missing
                description: parsedShopData.heroSettings?.description || parsedShopData.shopDescription || prev.description,
                widgets: { ...prev.widgets, ...(parsedShopData.heroSettings?.widgets || {}) }
            }));
            setFooterSettings(prev => ({
                ...prev,
                ...(parsedShopData.footerSettings || {}),
                // Prioritize footerSettings values, fallback to root shopData, then defaults
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
                id: ad.id || Date.now(), // Ensure ID exists
                isActive: ad.isActive === undefined ? true : ad.isActive // Default isActive to true if missing
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

    // Function to save all changes to localStorage
    const saveChanges = () => {
        if (!shopData || !shopUrl) return;

        // Construct the updated shop data object
        const updatedShopData: ShopData = {
            ...shopData, // Spread existing data (includes shopName, shopUrl)
            shopDescription: shopData.shopDescription, // Ensure the potentially updated description is saved
            themeSettings,
            // Ensure all potentially required fields have fallbacks, even if optional in type def
            heroSettings: {
                background: heroSettings.background ?? "bg-gradient-to-r from-blue-500 to-indigo-600", // Default background
                title: heroSettings.title ?? `${shopData.shopName}에 오신 것을 환영합니다`, // Default title
                description: heroSettings.description ?? shopData.shopDescription ?? '', // Default description
                buttonText: heroSettings.buttonText ?? "상품 구경하기", // Default button text
                buttonColor: heroSettings.buttonColor ?? "bg-white text-blue-600 hover:bg-gray-100", // Default button color
                imageUrl: heroSettings.imageUrl,
                imagePosition: heroSettings.imagePosition,
                buttonIcon: heroSettings.buttonIcon,
                buttonSize: heroSettings.buttonSize,
                buttonRadius: heroSettings.buttonRadius,
                showDecorations: heroSettings.showDecorations,
                widgets: heroSettings.widgets,
            },
            footerSettings, // Save the entire footerSettings state object
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

    // Ad management functions (simplified for brevity)
    const addNewAd = () => { /* ... implementation ... */ };
    const deleteAd = (adId: number) => { /* ... implementation ... */ };
    const handleAdChange = (adId: number, field: string, value: string | boolean) => { /* ... implementation ... */ };

    // Loading/Not Found state
    if (!shopData) {
        // Added a check for shopUrl to avoid showing loading indefinitely if URL is missing
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
                {/* Optional: Add spinner here */}
            </div>
        );
    }

    // Define admin sections for navigation
    const adminSections = [
        { value: "basicInfo", label: "기본 정보", icon: Settings },
        { value: "logo", label: "로고 설정", icon: Image },
        { value: "hero", label: "히어로 섹션", icon: LayoutDashboard },
        { value: "ads", label: "광고 관리", icon: MousePointerClick },
        { value: "footer", label: "푸터 정보", icon: Layout },
        // Add other sections as needed
    ];

    // Function to render the content of the selected tab
    const renderTabContent = (tabValue: string) => {
        switch (tabValue) {
            case "basicInfo":
                // Pass shopData and the setter function
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
                // Pass heroSettings state and its setter
                return <HeroSettingsTab shopName={shopData.shopName} heroSettings={heroSettings} setHeroSettings={setHeroSettings} />;
            case "ads":
                 // Pass adSettings state and its setter
                return <AdManagementTab adSettings={adSettings} setAdSettings={setAdSettings} />;
            case "footer":
                // Render the new FooterSettingsTab component
                // Pass the main shopData and its setter for description editing
                // Pass the footerSettings state and its setter for footer specific settings
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

    // Main component layout
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
                    // Mobile Layout: Select dropdown
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
                    // Desktop Layout: Resizable panel
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
