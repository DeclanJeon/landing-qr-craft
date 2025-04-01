
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { X, ShoppingCart, ExternalLink, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>장바구니</SheetTitle>
          <SheetDescription>
            이 피어몰은 직접 결제 기능이 없는 프로모션 랜딩 페이지입니다.
            관심 상품은 외부 사이트에서 직접 구매하셔야 합니다.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b border-gray-200 pb-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">{item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">수량: {item.quantity}</p>
                    <div className="flex flex-1 justify-between text-sm mt-2">
                      <a 
                        href={item.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        방문하기
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <X className="h-4 w-4 mr-1" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="mt-6">
            <div className="flex w-full justify-between">
              <SheetClose asChild>
                <Button variant="outline">닫기</Button>
              </SheetClose>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearCart}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                장바구니 비우기
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
