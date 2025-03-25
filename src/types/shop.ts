
export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  externalUrl: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface ShopData {
  shopName: string;
  shopUrl: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
}
