
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ShopData } from '@/types/shop'; // Import ShopData type

// Define the type for the settings prop
type HeroSettings = ShopData['heroSettings'];

interface ShopHeroProps {
  shopName: string; // Keep for fallback title
  description: string; // Keep for fallback description
  settings?: HeroSettings; // Add optional settings prop
}

// Default settings to merge with passed props
const defaultSettings: Required<HeroSettings> = {
    background: "bg-gradient-to-r from-blue-600 to-indigo-700",
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
};


const ShopHero: React.FC<ShopHeroProps> = ({ shopName, description, settings }) => {
  // Merge passed settings with defaults
  // Ensure widgets object and its properties exist
  const mergedSettings = {
    ...defaultSettings,
    ...(settings || {}),
    widgets: {
      ...defaultSettings.widgets,
      ...(settings?.widgets || {})
    }
  };

  // Removed useEffect that loaded from localStorage

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
        positionClasses += " right-0 top-0 w-1/3"; // Default to right if invalid
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
    // Use mergedSettings.widgets
    if (!mergedSettings.widgets.showProductCount && !mergedSettings.widgets.showRating && !mergedSettings.widgets.showBadge) {
      return null;
    }
    
    return (
      <div className="flex gap-3 mb-4">
        {mergedSettings.widgets.showBadge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {mergedSettings.widgets.badgeText}
          </span>
        )}
        {mergedSettings.widgets.showProductCount && (
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
            50+ 상품 {/* TODO: Replace with actual count */}
          </span>
        )}
        {mergedSettings.widgets.showRating && (
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
            ★★★★☆ 4.8 {/* TODO: Replace with actual rating */}
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

  // Use mergedSettings for rendering
  return (
    <div className={`relative rounded-2xl overflow-hidden h-96 mb-12 ${mergedSettings.background}`}>
      {/* Background image if set */}
      {renderImage()}
      
      {/* Decorative elements */}
      {mergedSettings.showDecorations && (
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/50"></div> {/* Adjusted opacity */}
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/50"></div> {/* Adjusted opacity */}
        </div>
      )}
      
      {/* Main content */}
      <div className={`absolute inset-0 p-12 flex flex-col justify-center text-white z-10 ${
        mergedSettings.imagePosition === "left" ? "ml-1/3 pl-8" : 
        mergedSettings.imagePosition === "right" ? "w-2/3" : ""
      }`}>
        {renderWidgets()}
        
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight max-w-xl">
          {mergedSettings.title || `${shopName}에 오신 것을 환영합니다`} {/* Use mergedSettings */}
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
          {mergedSettings.description || description || '최고의 품질과 서비스로 고객님께 만족을 드리겠습니다. 다양한 상품을 둘러보세요.'} {/* Use mergedSettings */}
        </p>
        <Button className={`w-fit ${buttonSizeClasses[mergedSettings.buttonSize]} shadow-lg ${mergedSettings.buttonColor} font-medium ${mergedSettings.buttonRadius}`}>
          {mergedSettings.buttonText} 
          {mergedSettings.buttonIcon && <ChevronRight className="ml-2 h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
