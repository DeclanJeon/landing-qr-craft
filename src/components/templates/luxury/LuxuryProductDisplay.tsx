
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/shop';
import { Badge } from '@/components/ui/badge';

interface LuxuryProductDisplayProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const LuxuryProductDisplay: React.FC<LuxuryProductDisplayProps> = ({ product, onAddToCart }) => {
  // Calculate discount percentage if originalPrice exists
  // Using a type guard to safely access originalPrice
  const originalPrice = (product as any).originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Conditionally render discount badge and info only if originalPrice exists
  const renderDiscountInfo = () => {
    if (!originalPrice) return null;
    
    return (
      <>
        <Badge className="absolute top-4 right-4 bg-accent-100 hover:bg-accent-200 text-bg-100 border-0 px-3 py-1.5">
          {discount}% OFF
        </Badge>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-text-200 line-through text-sm">
            {new Intl.NumberFormat('ko-KR').format(originalPrice)}원
          </span>
          <span className="text-accent-100 font-medium">
            {discount}% 할인
          </span>
        </div>
      </>
    );
  };

  // Extract distributor and manufacturer if they exist (using type assertion)
  const distributor = (product as any).distributor;
  const manufacturer = (product as any).manufacturer;

  return (
    <div className="bg-bg-100 rounded-xl shadow-lg p-8 my-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="relative md:w-1/2">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <img 
              src={product.imageUrl || 'https://placehold.co/600x600?text=No+Image'} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {renderDiscountInfo()}
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-md overflow-hidden border border-bg-200">
                <img 
                  src={product.imageUrl || 'https://placehold.co/150x150?text=Thumbnail'} 
                  alt={`Thumbnail ${i}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-text-100 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`h-4 w-4 ${i <= Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-bg-200'}`} />
              ))}
            </div>
            <span className="text-sm text-text-200 ml-1">({product.rating || 0})</span>
            <span className="text-sm text-text-200 ml-2">리뷰 {Math.floor(Math.random() * 100) + 1}개</span>
          </div>
          
          <div className="mb-6">
            <div className="text-2xl font-bold text-text-100">
              {new Intl.NumberFormat('ko-KR').format(product.price)}원
            </div>
            {renderDiscountInfo()}
          </div>
          
          <p className="text-text-200 mb-6 leading-relaxed">
            {product.description || '이 제품에 대한 설명이 없습니다.'}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button onClick={handleAddToCart} className="bg-primary-100 hover:bg-primary-200 text-bg-100 flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> 장바구니 담기
            </Button>
            <Button variant="outline" className="border-primary-100 text-primary-100 hover:bg-primary-100/5">
              바로 구매하기
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" className="text-text-200 hover:text-primary-100">
              <Heart size={18} className="mr-1" /> 위시리스트
            </Button>
            <Button variant="ghost" size="sm" className="text-text-200 hover:text-primary-100">
              <Share2 size={18} className="mr-1" /> 공유하기
            </Button>
          </div>
          
          {/* Product Information */}
          <div className="border-t border-bg-200 pt-4 space-y-2 text-sm">
            {(distributor || manufacturer) && (
              <div className="grid grid-cols-3 gap-2">
                {distributor && (
                  <div className="col-span-3 sm:col-span-1 text-text-200">유통업체</div>
                )}
                {distributor && (
                  <div className="col-span-3 sm:col-span-2 text-text-100 font-medium">{distributor}</div>
                )}
                
                {manufacturer && (
                  <div className="col-span-3 sm:col-span-1 text-text-200">제조사</div>
                )}
                {manufacturer && (
                  <div className="col-span-3 sm:col-span-2 text-text-100 font-medium">{manufacturer}</div>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-3 sm:col-span-1 text-text-200">배송비</div>
              <div className="col-span-3 sm:col-span-2 text-text-100 font-medium">무료배송</div>
              
              <div className="col-span-3 sm:col-span-1 text-text-200">배송예정</div>
              <div className="col-span-3 sm:col-span-2 text-text-100 font-medium">2-3일 이내</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductDisplay;
