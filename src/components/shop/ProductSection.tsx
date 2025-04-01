
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types/shop';

interface ProductSectionProps {
  title: string;
  linkTo: string;
  products: Product[];
}

// ProductItem component for reuse
const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <ProductCard product={product} />
);

// Main ProductSection component
const ProductSection: React.FC<ProductSectionProps> & {
  Item: React.FC<{ product: Product }>
} = ({ title, linkTo, products }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to={linkTo} className="text-blue-600 flex items-center hover:underline">
          더 보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Attach the Item component for reuse elsewhere
ProductSection.Item = ProductItem;

export default ProductSection;
