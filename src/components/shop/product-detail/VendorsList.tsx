
import React from 'react';
import { Button } from '@/components/ui/button';

interface VendorsListProps {
  vendors: {
    name: string;
    rating: number;
    price: string;
  }[];
}

const VendorsList: React.FC<VendorsListProps> = ({ vendors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">판매처 목록</h2>
      <div className="space-y-3">
        {vendors.map((vendor, index) => (
          <div key={index} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">{vendor.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">{vendor.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">{vendor.price}</p>
              <Button size="sm" variant="outline" className="mt-2">
                방문하기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsList;
