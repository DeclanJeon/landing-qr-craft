
import React from 'react';
import Navigation from '@/components/Navigation';
import QRCodeGeneratorForm from '@/components/QRCodeGeneratorForm';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const QRCodeGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">QR 코드 생성</h1>
              <Link to="/personal-lounge">
                <Button variant="outline" className="flex items-center">
                  <span>내 피어몰 관리</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <QRCodeGeneratorForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
