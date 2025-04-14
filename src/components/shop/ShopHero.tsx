
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ShopData } from '@/types/shop';

// Define the type for the settings prop
type HeroSettings = ShopData['heroSettings'];

interface ShopHeroProps {
  shopName: string;
  description: string;
  settings?: HeroSettings;
}

// Default settings to merge with passed props
const defaultSettings: Required<Omit<NonNullable<HeroSettings>, 'slides'>> = {
    background: "bg-gradient-to-r from-primary-100 to-primary-200",
    title: "",
    description: "",
    buttonText: "상품 구경하기",
    buttonColor: "bg-accent-100 text-bg-100 hover:bg-accent-200",
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
};

const ShopHero: React.FC<ShopHeroProps> = ({ shopName, description, settings }) => {
  // Merge passed settings with defaults
  const mergedSettings = {
    ...defaultSettings,
    ...(settings || {}),
    widgets: {
      ...defaultSettings.widgets,
      ...(settings?.widgets || {})
    }
  };

  const renderImage = () => {
    if (!mergedSettings.imageUrl || mergedSettings.imagePosition === "none") return null;
    
    let positionClasses = "absolute h-full";
    
    switch (mergedSettings.imagePosition) {
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
          src={mergedSettings.imageUrl} 
          alt="Hero background" 
          className={`h-full w-full object-cover ${mergedSettings.imagePosition === "center" ? "" : "rounded-l-2xl"}`}
        />
        {mergedSettings.imagePosition === "center" && <div className="absolute inset-0 bg-black/40"></div>}
      </div>
    );
  };

  const renderWidgets = () => {
    if (!mergedSettings.widgets.showProductCount && !mergedSettings.widgets.showRating && !mergedSettings.widgets.showBadge) {
      return null;
    }
    
    return (
      <div className="flex gap-3 mb-4">
        {mergedSettings.widgets.showBadge && (
          <span className="bg-accent-100 text-bg-100 text-xs px-2 py-1 rounded-full font-medium">
            {mergedSettings.widgets.badgeText}
          </span>
        )}
        {mergedSettings.widgets.showProductCount && (
          <span className="bg-bg-100/20 backdrop-blur-sm text-bg-100 text-xs px-2 py-1 rounded-full font-medium">
            50+ 상품
          </span>
        )}
        {mergedSettings.widgets.showRating && (
          <span className="bg-bg-100/20 backdrop-blur-sm text-bg-100 text-xs px-2 py-1 rounded-full font-medium flex items-center">
            ★★★★☆ 4.8
          </span>
        )}
      </div>
    );
  };

  const buttonSizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden h-96 mb-12 ${mergedSettings.background}`}>
      {/* Background image if set */}
      {renderImage()}
      
      {/* Decorative elements */}
      {mergedSettings.showDecorations && (
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-bg-100/50"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-bg-100/50"></div>
        </div>
      )}
      
      {/* Main content */}
      <div className={`absolute inset-0 p-12 flex flex-col justify-center text-white z-10 ${
        mergedSettings.imagePosition === "left" ? "ml-1/3 pl-8" : 
        mergedSettings.imagePosition === "right" ? "w-2/3" : ""
      }`}>
        {renderWidgets()}
        
        <h1 className="text-4xl md:text-5xl font-medium mb-4 leading-tight max-w-xl text-bg-100">
          {mergedSettings.title || `${shopName}에 오신 것을 환영합니다`}
        </h1>
        <p className="text-bg-100/90 text-lg mb-8 max-w-xl leading-relaxed">
          {mergedSettings.description || description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'}
        </p>
        <Button className={`w-fit ${buttonSizeClasses[mergedSettings.buttonSize as keyof typeof buttonSizeClasses]} shadow-lg ${mergedSettings.buttonColor} font-medium ${mergedSettings.buttonRadius}`}>
          {mergedSettings.buttonText} 
          {mergedSettings.buttonIcon && <ChevronRight className="ml-2 h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
