import { ReactNode } from 'react';

export interface ShopData {
  shopName: string;
  shopDescription?: string;
  shopUrl: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  logoUrl?: string | null;
  introImageUrl?: string;
  rating?: number;
  specialization?: string;
  themeSettings?: ThemeSettings;
  templateType?: string;
  templateSettings?: any;
  heroSettings?: HeroSettings;
  footerSettings?: FooterSettings;
  adSettings?: AdSetting[];
  faviconUrl?: string;
  logoText?: string;
  logoTextStyle?: LogoTextStyle;
}

export interface LogoTextStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
  categoryId: number;
  price?: number;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface AdSetting {
  id: number;
  title: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  position: string;
  startDate: string;
  endDate: string;
  targetPages?: string[];
}

export interface HeroSettings {
  background: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  imageUrl?: string;
  imagePosition?: string;
  buttonIcon?: boolean;
  buttonSize?: string;
  buttonRadius?: string;
  showDecorations?: boolean;
  widgets?: {
    showProductCount: boolean;
    showRating: boolean;
    showBadge: boolean;
    badgeText: string;
  };
}

export interface FooterSettings {
  background: string;
  textColor: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  links: { title: string; url: string }[];
  skin: string;
}

// Add ThemeSettings type
export interface ThemeSettings {
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
}
