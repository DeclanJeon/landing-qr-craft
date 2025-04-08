import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ShopHeader from './shop/ShopHeader';
import ShopFooter from './shop/ShopFooter';
// ShopSidebar is likely unused now, remove if confirmed
// import ShopSidebar from './shop/ShopSidebar';
import ShopHero from './shop/ShopHero';
import ProductDetailPage from './shop/ProductDetailPage';
import ProductRegistrationModal from './shop/ProductRegistrationModal';
import AboutPage from './shop/AboutPage';
import ServicePage from './shop/ServicePage';
import CustomerPeerMalls from './shop/CustomerPeerMalls';
// RecommendedPeerMalls might be merged into CustomerPeerMalls or removed
// import RecommendedPeerMalls from './shop/RecommendedPeerMalls';
import SideAdvertisement from './shop/product-detail/SideAdvertisement';
// Keep categories if needed for filtering logic in ShopTabs
import { categories } from '@/constants/sampleData';
import { ShopData, Product, Category } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import ShopTabs from './shop/tabs/ShopTabs';

// Define AdSetting type locally if not imported globally
interface AdSetting {
  id: number;
  title: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  position: string;
  startDate: string;
  endDate: string;
}

interface ShopTemplateProps {
  shopUrl?: string;
  page?: string;
  categoryId?: number;
  productId?: string; // Keep productId if ProductDetailPage is rendered here
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({ shopUrl, page, categoryId }) => {
  const params = useParams();
  const navigate = useNavigate();
  // Determine the actual shop URL from props or params
  const actualShopUrl = shopUrl || params.shopUrl;
  // Determine category ID from props or params, default to 0 (all)
  const categoryParam = categoryId !== undefined ? categoryId : (params.categoryId ? Number(params.categoryId) : 0);
  // Get productId from params
  const productId = params.productId;

  // State for the current shop's data
  const [shopData, setShopData] = useState<ShopData | null>(null);
  // State for the products displayed in the current shop (potentially filtered)
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  // State for the currently selected category ID for filtering
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categoryParam);
  // State for the currently active tab in the main shop view
  const [activeTab, setActiveTab] = useState<string>("products");
  // State for managing the product registration modal
  const [isProductRegistrationOpen, setIsProductRegistrationOpen] = useState(false);
  // State for side advertisements (keep for sidebar specific logic if needed)
  // const [sideAds, setSideAds] = useState<{left?: AdSetting, right?: AdSetting}>({});
  // State to hold ALL active ads for the current page
  const [activeAds, setActiveAds] = useState<AdSetting[]>([]);
  // State to hold the list of other registered peer malls
  const [registeredPeerMalls, setRegisteredPeerMalls] = useState<ShopData[]>([]);
  // Cart context hook (keep if cart functionality is in header/template)
  const { getCartCount } = useCart();

  // Effect to load current shop data and other registered peer malls
  useEffect(() => {
    console.log(`[ShopTemplate] useEffect triggered for shopUrl: ${actualShopUrl}`);

    if (!actualShopUrl) {
      console.warn("[ShopTemplate] No actualShopUrl provided, cannot load data.");
      setShopData(null);
      setRegisteredPeerMalls([]); // Clear peer malls if no shop URL
      return;
    }

    // --- Load Current Shop Data ---
    const currentShopKey = `peermallShopData_${actualShopUrl}`;
    const currentShopDataString = localStorage.getItem(currentShopKey);
    let parsedCurrentShopData: ShopData | null = null;

    if (currentShopDataString) {
      try {
        parsedCurrentShopData = JSON.parse(currentShopDataString);
        setShopData(parsedCurrentShopData);
        console.log("[ShopTemplate] Current shop data loaded:", parsedCurrentShopData);

        // Load ALL active ads based on current shop settings and page targeting
        if (parsedCurrentShopData?.adSettings) {
          const now = new Date();
          const currentPageTarget = page || 'home'; // Default to 'home' if page prop is undefined

          const filteredActiveAds = parsedCurrentShopData.adSettings.filter(ad =>
            ad.isActive &&
            new Date(ad.startDate) <= now &&
            new Date(ad.endDate) >= now &&
            (ad.targetPages?.includes(currentPageTarget) || ad.targetPages?.includes('all')) // Check if ad targets current page or 'all'
          );
          setActiveAds(filteredActiveAds);
          console.log(`[ShopTemplate] Active ads for page '${currentPageTarget}':`, filteredActiveAds);

          // Keep sidebar specific logic if SideAdvertisement component is strictly for sidebars
          // const sidebarAds = filteredActiveAds.filter(ad => ad.position === 'sidebar');
          // setSideAds({
          //   left: sidebarAds[0],
          //   right: sidebarAds[1]
          // });

        } else {
          setActiveAds([]); // Clear ads if none are configured
          // setSideAds({});
        }

      } catch (error) {
        console.error(`[ShopTemplate] Error parsing current shop data for key ${currentShopKey}:`, error);
        setShopData(null); // Reset shop data on error
        setActiveAds([]);
        // setSideAds({});
      }
    } else {
      console.warn(`[ShopTemplate] No data found for current shop key: ${currentShopKey}`);
      setShopData(null); // Set to null if no data found
      setActiveAds([]);
      // setSideAds({});
    }

    // --- Load Products for the Current Shop ---
    // Assuming products are stored globally for now, might need shop-specific logic later
    const storedProducts = localStorage.getItem('peermall-products');
    if (storedProducts) {
      try {
        setLocalProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("[ShopTemplate] Error parsing products from localStorage:", error);
        setLocalProducts([]);
      }
    } else {
      setLocalProducts([]);
    }

    // --- Load Other Registered Peer Malls ---
    const shopUrlsKey = 'peermallShopUrls';
    const existingUrlsString = localStorage.getItem(shopUrlsKey);
    const shopUrls: string[] = existingUrlsString ? JSON.parse(existingUrlsString) : [];
    console.log("[ShopTemplate] Found registered shop URLs:", shopUrls);

    const loadedMalls: ShopData[] = [];
    shopUrls.forEach(url => {
      // Skip loading data for the current shop itself
      if (url === actualShopUrl) {
        return;
      }
      const shopDataKey = `peermallShopData_${url}`;
      const shopDataString = localStorage.getItem(shopDataKey);
      if (shopDataString) {
        try {
          const mallData = JSON.parse(shopDataString);
          loadedMalls.push(mallData);
        } catch (error) {
          console.error(`[ShopTemplate] Error parsing shop data for URL ${url}:`, error);
        }
      } else {
         console.warn(`[ShopTemplate] No data found for shop key: ${shopDataKey}`);
      }
    });
    setRegisteredPeerMalls(loadedMalls);
    console.log("[ShopTemplate] Loaded other registered peer malls:", loadedMalls);

  }, [actualShopUrl]); // Rerun effect when the shop URL changes

  // Filter products based on selected category
  const filteredProducts = selectedCategoryId === 0
    ? localProducts
    : localProducts.filter(product => product.categoryId === selectedCategoryId);

  // Handler to open the product registration modal
  const openProductRegistration = () => {
    setIsProductRegistrationOpen(true);
  };

  // Handler to delete a product
  const handleDeleteProduct = (productIdToDelete: number) => {
    const updatedProducts = localProducts.filter(product => product.id !== productIdToDelete);
    setLocalProducts(updatedProducts);
    localStorage.setItem('peermall-products', JSON.stringify(updatedProducts));

    // Also remove associated QR code if necessary (assuming QR code name matches product name)
    const productToDelete = localProducts.find(p => p.id === productIdToDelete);
    if (productToDelete) {
        const storedQRCodes = localStorage.getItem('peermall-qrcodes');
        if (storedQRCodes) {
            try {
                const qrCodes = JSON.parse(storedQRCodes);
                // Define type for QR code object inline for filter
                const updatedQRCodes = qrCodes.filter((qr: { name: string; content: string }) =>
                    qr.name !== productToDelete.name || qr.content !== productToDelete.externalUrl
                );
                localStorage.setItem('peermall-qrcodes', JSON.stringify(updatedQRCodes));
            } catch (error) {
                console.error("Error updating QR codes after product deletion:", error);
            }
        }
    }
    // Optionally add a toast notification for deletion
  };

  // Function to render the main content area based on the current page/route
  const renderMainContent = () => {
    if (productId) {
      // Render product detail page if productId is present in the URL
      return <ProductDetailPage />;
    }
    if (page === 'about') {
      // Render about page
      return <AboutPage shopData={shopData} />;
    }
    if (page === 'service') {
      // Render service page
      return <ServicePage shopData={shopData} />;
    }
    // Default to rendering the main shop tabs (products, QR codes, etc.)
    return (
      <ShopTabs
        shopUrl={actualShopUrl || ''}
        shopData={shopData}
        products={filteredProducts} // Pass the filtered products
        categories={categories} // Pass categories for filtering UI
        selectedCategoryId={selectedCategoryId} // Pass current category
        activeTab={activeTab} // Pass current active tab
        setActiveTab={setActiveTab} // Pass function to change tab
        onOpenProductRegistration={openProductRegistration} // Pass function to open modal
        onDeleteProduct={handleDeleteProduct} // Pass function to delete product
      />
    );
  };

  // Loading state or if shop data couldn't be found
  if (!shopData && actualShopUrl) { // Check actualShopUrl to avoid showing error before useEffect runs
    // You might want a more sophisticated loading indicator here
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">피어몰 로딩 중...</h1>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
        {/* Optional: Add a spinner */}
      </div>
    );
  }

  // If shop URL is missing or shop data failed to load after trying
  if (!shopData) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <h1 className="text-2xl font-bold mb-4">피어몰을 찾을 수 없습니다</h1>
         <p className="text-gray-600 mb-6">요청하신 피어몰 주소가 유효하지 않거나 데이터를 불러올 수 없습니다.</p>
         <Link to="/personal-lounge"> {/* Link to where users can create/manage malls */}
           <Button>내 라운지로 이동</Button>
         </Link>
       </div>
     );
  }

  // Main component render structure
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader
        shopName={shopData.shopName}
        shopUrl={actualShopUrl || ''}
        logoUrl={shopData.logoUrl}
        logoText={shopData.logoText} // Pass logoText
        logoTextStyle={shopData.logoTextStyle} // Pass logoTextStyle
        page={page} // Pass current page type for potential header variations
      />

      {/* Product Registration Modal (conditionally rendered) */}
      <ProductRegistrationModal
        open={isProductRegistrationOpen}
        onClose={() => setIsProductRegistrationOpen(false)}
      />

      {/* Render Advertisements based on position */}
      {/* Sidebar Ads */}
      {activeAds.filter(ad => ad.position === 'sidebar' || ad.position === 'left').slice(0, 1).map(ad => (
         <SideAdvertisement
           key={ad.id}
           position="left"
           imageUrl={ad.imageUrl}
           link={ad.link || '#'}
           altText={ad.title}
           id={ad.id}
         />
      ))}
       {activeAds.filter(ad => ad.position === 'sidebar' || ad.position === 'right').slice(1, 2).map(ad => (
         <SideAdvertisement
           key={ad.id}
           position="right"
           imageUrl={ad.imageUrl}
           link={ad.link || '#'}
           altText={ad.title}
           id={ad.id}
         />
       ))}


      <main className="container mx-auto px-4 py-8">
        {/* Hero Ad */}
        {activeAds.filter(ad => ad.position === 'hero').map(ad => (
          <div key={ad.id} className="mb-8"> {/* Add margin below hero ad */}
            {/* Use a generic AdvertisementDisplay or specific HeroAd component */}
            {/* Assuming AdvertisementDisplay exists or will be created */}
             {/* <AdvertisementDisplay ad={ad} /> */}
             <a href={ad.link || '#'} target="_blank" rel="noopener noreferrer">
               <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto rounded-lg shadow-md" />
             </a>
          </div>
        ))}

        {/* Conditionally render ShopHero only on the main shop page */}
        {page !== 'about' && page !== 'service' && !productId && (
          <ShopHero
            shopName={shopData.shopName}
            description={shopData.shopDescription || ''}
            settings={shopData.heroSettings}
          />
        )}

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full">
            {renderMainContent()}
             {/* Ads within product list (position: 'products') would need integration inside ShopTabs/ProductsTab */}
          </div>
          {/* Sidebar could potentially go here if needed: <ShopSidebar categories={categories} onSelectCategory={handleCategorySelect} selectedCategoryId={selectedCategoryId} /> */}
        </div>

         {/* Footer Ad (Above Footer) */}
         {activeAds.filter(ad => ad.position === 'footer').map(ad => (
           <div key={ad.id} className="mt-12"> {/* Add margin above footer ad */}
             {/* <AdvertisementDisplay ad={ad} /> */}
              <a href={ad.link || '#'} target="_blank" rel="noopener noreferrer">
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto rounded-lg shadow-md" />
              </a>
           </div>
         ))}


        {/* Render Other Peer Malls section */}
        <div className="mt-12">
          {/* Pass the loaded registeredPeerMalls data.
              CustomerPeerMalls component needs to be adapted to handle ShopData[].
              Assuming it will be adapted or already handles it.
              Using 'recommendedMalls' prop name for consistency with previous structure,
              but passing the actual registered malls data.
          */}
          <CustomerPeerMalls
            recommendedMalls={registeredPeerMalls}
            // customerMalls prop is removed as we are using registered data
          />
        </div>
      </main>

      <ShopFooter
        shopName={shopData.shopName}
        shopUrl={actualShopUrl || ''}
        shopData={shopData} // Pass full shopData if footer needs more info
      />
    </div>
  );
};

export default ShopTemplate;
