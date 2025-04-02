
export interface ShopData {
  shopName: string;
  shopUrl: string;
  shopDescription?: string;
  ownerName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  logoUrl?: string;
  heroSettings?: {
    background?: string;
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
    }
  };
  footerSettings?: {
    background?: string;
    textColor?: string;
    ownerName?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
  };
  themeSettings?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    borderRadius?: string;
  };
  adSettings?: Array<{
    id: number;
    title: string;
    description: string;
    position: string;
    imageUrl: string;
    link?: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>;
  faviconUrl?: string;
}

export interface Product {
  id: number;
  name: string;
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
  isBestseller?: boolean;
  isNew?: boolean;
  vendor?: string;
  tags?: string[];
}
