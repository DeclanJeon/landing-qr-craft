
import React from 'react';
import Navigation from '@/components/Navigation';
import ProductRegistrationForm from '@/components/shop/ProductRegistrationForm';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProductRegistration = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">상품 등록</h1>
              <Link to="/personal-lounge">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>피어몰 관리로 돌아가기</span>
                </Button>
              </Link>
            </div>
            
            <ProductRegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistration;
