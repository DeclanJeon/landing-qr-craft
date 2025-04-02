
export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  externalUrl?: string; // Make externalUrl optional
  categoryId: number;
  distributor?: string;
  manufacturer?: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface ShopData {
  shopName: string;
  shopDescription: string;
  shopUrl: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  faviconUrl?: string;
  location?: string;
  category?: string;
  rating?: number;
}
