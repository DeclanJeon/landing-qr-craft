
import { Product, Category } from '@/types/shop';

// Sample product data
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: '프리미엄 티셔츠',
    price: '29,900원',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product1',
  },
  {
    id: 2,
    name: '클래식 데님 팬츠',
    price: '59,900원',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product2',
  },
  {
    id: 3,
    name: '캐주얼 스니커즈',
    price: '89,000원',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product3',
  },
  {
    id: 4,
    name: '가죽 크로스백',
    price: '129,000원',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product4',
  },
  {
    id: 5,
    name: '프리미엄 모자',
    price: '36,500원',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product5',
  },
  {
    id: 6,
    name: '디자이너 선글라스',
    price: '179,000원',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product6',
  },
];

// Categories
export const categories: Category[] = [
  { id: 1, name: '의류', count: 24 },
  { id: 2, name: '신발', count: 18 },
  { id: 3, name: '가방', count: 12 },
  { id: 4, name: '액세서리', count: 20 },
  { id: 5, name: '디지털', count: 8 },
];
