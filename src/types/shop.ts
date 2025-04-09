
export interface ShopData {
  shopName: string;
  shopUrl: string;
  shopDescription?: string;
  ownerName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  logoUrl?: string;
  logoText?: string; // 로고 옆 텍스트
  logoTextStyle?: {
    // 텍스트 스타일 옵션
    fontSize?: string; // e.g., 'text-xl', 'text-2xl'
    fontWeight?: string; // e.g., 'font-bold', 'font-semibold'
    color?: string; // e.g., '#FFFFFF', 'text-gray-800'
  };
  location?: string;
  category?: string;
  rating?: number;
  introImageUrl?: string; // Added for introduction/cover image
  heroSettings?: {
    background?: string; // Make all properties optional
    title?: string;
    description?: string;
    buttonText?: string;
    buttonColor?: string;
    imageUrl?: string;
    imagePosition?: string;
    buttonIcon?: boolean;
    buttonSize?: string;
    buttonRadius?: string;
    showDecorations?: boolean;
    widgets?: {
      showProductCount?: boolean;
      showRating?: boolean;
      showBadge?: boolean;
      badgeText?: string;
    };
    slides?: Array<{
      id: string;
      imageUrl: string;
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    }>;
  };
  footerSettings?: {
    background?: string;
    textColor?: string;
    ownerName?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
    links?: { title: string; url: string }[];
    skin?: string; // Identifier for the chosen footer skin/template
  };
  themeSettings?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    borderRadius?: string;
    skin?: string;
    accentColor?: string;
    textColor?: string;
    cardStyle?: string;
    buttonStyle?: string;
    headerStyle?: string;
    luxuryEffects?: boolean;
    animations?: string;
  };
  templateSettings?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    borderRadius?: string;
    skin?: string;
    accentColor?: string;
    textColor?: string;
    cardStyle?: string;
    buttonStyle?: string;
    headerStyle?: string;
    luxuryEffects?: boolean;
    animations?: string;
  };
  adSettings?: Array<{
    id: number;
    title: string;
    description: string;
    position: string;
    targetPages: string[];
    imageUrl: string;
    link?: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>;
  faviconUrl?: string;
  specialization?: 'seller' | 'buyer' | 'neutral'; // Added specialization field
  templateType?: string; // Added template type field
}

export interface Product {
  id: number;
  name: string;
  title?: string; // Making title optional to accommodate existing code
  description?: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: number;
  imageUrl: string;
  categoryId: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  link?: string;
  externalUrl?: string;
  brandUrl?: string; // Added for brand introduction link
  isBestseller?: boolean;
  isNew?: boolean;
  vendor?: string;
  tags?: string[];
  distributor?: string;
  manufacturer?: string;
  quantity?: number; // Added for NovasProductCard
  image?: string; // Added for LuxuryProductCard compatibility
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface StorageItem {
  id: string;
  name: string;
  description: string;
  used: number; // in kilobytes
  capacity: number | null; // in kilobytes, null if unknown
  capacityText: string;
  status: 'ok' | 'warning' | 'error' | 'inactive';
  statusText: string;
  permissionGranted?: boolean;
}
