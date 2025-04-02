
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface ShopHeroProps {
  shopName: string;
  description: string;
}

const ShopHero: React.FC<ShopHeroProps> = ({ shopName, description }) => {
  const { shopUrl } = useParams();
  const [heroSettings, setHeroSettings] = useState({
    background: "bg-gradient-to-r from-blue-600 to-indigo-700",
    title: "",
    description: "",
    buttonText: "상품 구경하기",
    buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
    imageUrl: "",
    imagePosition: "right", // left, right, center, none
    buttonIcon: true,
    buttonSize: "medium", // small, medium, large
    buttonRadius: "rounded-full", // rounded-lg, rounded-full
    showDecorations: true,
    widgets: {
      showProductCount: false,
      showRating: false,
      showBadge: false,
      badgeText: "신규",
    }
  });

  useEffect(() => {
    const shopDataString = localStorage.getItem('peermallShopData');
    if (shopDataString) {
      const shopData = JSON.parse(shopDataString);
      
      if (shopData.shopUrl === shopUrl && shopData.heroSettings) {
        setHeroSettings(prevSettings => ({
          ...prevSettings,
          ...shopData.heroSettings
        }));
      }
    }
  }, [shopUrl]);

  const renderImage = () => {
    if (!heroSettings.imageUrl || heroSettings.imagePosition === "none") return null;
    
    let positionClasses = "absolute h-full";
    
    switch (heroSettings.imagePosition) {
      case "left":
        positionClasses += " left-0 top-0 w-1/3";
        break;
      case "right":
        positionClasses += " right-0 top-0 w-1/3";
        break;
      case "center":
        positionClasses += " inset-0 w-full opacity-20";
        break;
      default:
        positionClasses += " right-0 top-0 w-1/3";
    }
    
    return (
      <div className={positionClasses}>
        <img 
          src={heroSettings.imageUrl} 
          alt="Hero background" 
          className={`h-full w-full object-cover ${heroSettings.imagePosition === "center" ? "" : "rounded-l-2xl"}`}
        />
        {heroSettings.imagePosition === "center" && <div className="absolute inset-0 bg-black/40"></div>}
      </div>
    );
  };

  const renderWidgets = () => {
    if (!heroSettings.widgets.showProductCount && !heroSettings.widgets.showRating && !heroSettings.widgets.showBadge) {
      return null;
    }
    
    return (
      <div className="flex gap-3 mb-4">
        {heroSettings.widgets.showBadge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {heroSettings.widgets.badgeText}
          </span>
        )}
        {heroSettings.widgets.showProductCount && (
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
            50+ 상품
          </span>
        )}
        {heroSettings.widgets.showRating && (
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
            ★★★★☆ 4.8
          </span>
        )}
      </div>
    );
  };

  const buttonSizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-5 text-base",
    large: "px-8 py-6 text-lg"
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden h-96 mb-12 ${heroSettings.background}`}>
      {/* Background image if set */}
      {renderImage()}
      
      {/* Decorative elements */}
      {heroSettings.showDecorations && (
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
        </div>
      )}
      
      {/* Main content */}
      <div className={`absolute inset-0 p-12 flex flex-col justify-center text-white z-10 ${
        heroSettings.imagePosition === "left" ? "ml-1/3 pl-8" : 
        heroSettings.imagePosition === "right" ? "w-2/3" : ""
      }`}>
        {renderWidgets()}
        
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight max-w-xl">
          {heroSettings.title || `${shopName}에 오신 것을 환영합니다`}
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
          {heroSettings.description || description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
        </p>
        <Button className={`w-fit ${buttonSizeClasses[heroSettings.buttonSize]} shadow-lg ${heroSettings.buttonColor} font-medium ${heroSettings.buttonRadius}`}>
          {heroSettings.buttonText} 
          {heroSettings.buttonIcon && <ChevronRight className="ml-2 h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
