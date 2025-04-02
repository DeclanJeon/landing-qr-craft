
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { Product } from '@/types/shop';

interface QRCodeDisplayProps {
  product: Product;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ product }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  
  useEffect(() => {
    // Generate QR code URL using a free QR code generation service
    const encodedUrl = encodeURIComponent(product.externalUrl);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedUrl}`;
    setQrCodeUrl(qrUrl);
  }, [product.externalUrl]);

  const handleDownload = () => {
    // Create a temporary link element to download the QR code
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${product.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-3 truncate">{product.name}</h3>
        
        <div className="flex justify-center mb-4">
          {qrCodeUrl && (
            <img 
              src={qrCodeUrl} 
              alt={`QR Code for ${product.name}`} 
              className="w-32 h-32 object-contain"
            />
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-4 truncate">
          <p>링크: {product.externalUrl}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            QR 코드 다운로드
          </Button>
          
          <a 
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              상품 페이지 방문
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
