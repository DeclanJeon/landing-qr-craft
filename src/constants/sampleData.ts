
import { Product, Category } from '@/types/shop';

// Sample product data
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: '프리미엄 티셔츠',
    title: '프리미엄 티셔츠',
    description: '고품질 면 소재의 프리미엄 티셔츠입니다.',
    price: '29,900원',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product1',
    categoryId: 1,
  },
  {
    id: 2,
    name: '클래식 데님 팬츠',
    title: '클래식 데님 팬츠',
    description: '편안한 착용감의 클래식 데님 팬츠입니다.',
    price: '59,900원',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product2',
    categoryId: 1,
  },
  {
    id: 3,
    name: '캐주얼 스니커즈',
    title: '캐주얼 스니커즈',
    description: '일상생활에 편안한 캐주얼 스니커즈입니다.',
    price: '89,000원',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product3',
    categoryId: 2,
  },
  {
    id: 4,
    name: '가죽 크로스백',
    title: '가죽 크로스백',
    description: '고급 가죽으로 만든 실용적인 크로스백입니다.',
    price: '129,000원',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product4',
    categoryId: 3,
  },
  {
    id: 5,
    name: '프리미엄 모자',
    title: '프리미엄 모자',
    description: '스타일리시한 디자인의 프리미엄 모자입니다.',
    price: '36,500원',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product5',
    categoryId: 4,
  },
  {
    id: 6,
    name: '디자이너 선글라스',
    title: '디자이너 선글라스',
    description: '세련된 디자인의 고급 선글라스입니다.',
    price: '179,000원',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    externalUrl: 'https://example.com/product6',
    categoryId: 4,
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
