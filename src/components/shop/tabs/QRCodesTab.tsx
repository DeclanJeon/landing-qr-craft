import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Product } from '@/types/shop';
import QRCodeDisplay from '@/components/shop/QRCodeDisplay'; // Assuming QRCodeDisplay is correctly located

interface QRCodesTabProps {
  products: Product[];
  onOpenProductRegistration: () => void;
}

const QRCodesTab: React.FC<QRCodesTabProps> = ({
  products,
  onOpenProductRegistration,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">QR 코드 목록</h2>
        <p className="text-gray-600 mb-4">
          아래 QR 코드를 스캔하여 각 상품 및 링크에 직접 접근하세요.
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <QRCodeDisplay
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 QR 코드가 없습니다</h3>
            <p className="text-gray-500 mb-4">상품을 등록하면 자동으로 QR 코드가 생성됩니다.</p>
            <Button onClick={onOpenProductRegistration} className="flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              상품 등록하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodesTab;
