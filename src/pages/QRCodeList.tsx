
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { QrCode, Download, Trash, Plus, Search } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface QRCode {
  name: string;
  content: string;
  image: string;
  type: string;
  createdAt: string;
}

// 샘플 QR 코드 데이터
const sampleQRCodes: QRCode[] = [
  {
    name: "내 피어몰 입구",
    content: "https://mystore.peermall.com",
    image: "https://placehold.co/400/4F46E5/FFFFFF?text=QR1",
    type: "URL",
    createdAt: "2025-03-15T09:00:00.000Z"
  },
  {
    name: "베스트셀러 제품",
    content: "https://mystore.peermall.com/products/best",
    image: "https://placehold.co/400/10B981/FFFFFF?text=QR2",
    type: "URL",
    createdAt: "2025-03-14T14:30:00.000Z"
  },
  {
    name: "신상품 소개",
    content: "https://mystore.peermall.com/products/new",
    image: "https://placehold.co/400/F59E0B/FFFFFF?text=QR3",
    type: "URL",
    createdAt: "2025-03-13T11:20:00.000Z"
  },
  {
    name: "봄 시즌 할인 이벤트",
    content: "https://mystore.peermall.com/events/spring-sale",
    image: "https://placehold.co/400/84CC16/FFFFFF?text=QR4",
    type: "URL",
    createdAt: "2025-03-12T16:45:00.000Z"
  },
  {
    name: "회원가입 페이지",
    content: "https://mystore.peermall.com/signup",
    image: "https://placehold.co/400/EC4899/FFFFFF?text=QR5",
    type: "URL",
    createdAt: "2025-03-11T13:15:00.000Z"
  },
  {
    name: "고객 연락처",
    content: "tel:+82-10-1234-5678",
    image: "https://placehold.co/400/8B5CF6/FFFFFF?text=QR6",
    type: "TEL",
    createdAt: "2025-03-10T10:30:00.000Z"
  },
  {
    name: "고객센터 이메일",
    content: "mailto:support@mystore.peermall.com",
    image: "https://placehold.co/400/3B82F6/FFFFFF?text=QR7",
    type: "EMAIL",
    createdAt: "2025-03-09T09:20:00.000Z"
  },
  {
    name: "매장 위치",
    content: "서울시 강남구 테헤란로 123",
    image: "https://placehold.co/400/0EA5E9/FFFFFF?text=QR8",
    type: "TEXT",
    createdAt: "2025-03-08T15:10:00.000Z"
  },
  {
    name: "매장 WiFi 정보",
    content: "SSID: MyStore_Guest, PW: welcome2025",
    image: "https://placehold.co/400/F43F5E/FFFFFF?text=QR9",
    type: "TEXT",
    createdAt: "2025-03-07T11:05:00.000Z"
  },
  {
    name: "공식 인스타그램",
    content: "https://instagram.com/mystore_official",
    image: "https://placehold.co/400/6366F1/FFFFFF?text=QR10",
    type: "URL",
    createdAt: "2025-03-06T14:25:00.000Z"
  }
];

const QRCodeList = () => {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // 로컬 스토리지에서 QR 코드 데이터를 가져오거나, 없으면 샘플 데이터 사용
    const storedQRCodes = localStorage.getItem('peermall-qrcodes');
    if (storedQRCodes) {
      setQrCodes(JSON.parse(storedQRCodes));
    } else {
      setQrCodes(sampleQRCodes);
      localStorage.setItem('peermall-qrcodes', JSON.stringify(sampleQRCodes));
    }
  }, []);
  
  const handleDeleteQR = (index: number) => {
    const updatedQRCodes = [...qrCodes];
    updatedQRCodes.splice(index, 1);
    setQrCodes(updatedQRCodes);
    localStorage.setItem('peermall-qrcodes', JSON.stringify(updatedQRCodes));
    
    toast({
      title: "QR 코드 삭제됨",
      description: "선택한 QR 코드가 삭제되었습니다.",
    });
  };
  
  const handleDownloadQR = (qrCode: QRCode) => {
    const link = document.createElement('a');
    link.href = qrCode.image;
    link.download = `${qrCode.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR 코드 다운로드",
      description: "QR 코드가 성공적으로 다운로드되었습니다.",
    });
  };
  
  const filteredQRCodes = qrCodes.filter(qr => 
    qr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    qr.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <h1 className="text-3xl font-bold">내 QR 코드 목록</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="QR 코드 검색..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Link to="/qr-generator">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>새 QR 코드 생성</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {filteredQRCodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredQRCodes.map((qrCode, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center justify-center bg-gray-50 p-4 rounded-md mb-3">
                          <img src={qrCode.image} alt={qrCode.name} className="w-32 h-32" />
                        </div>
                        <h3 className="font-medium truncate">{qrCode.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{qrCode.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {qrCode.type}
                          </span>
                          <p className="text-xs text-gray-400">
                            {new Date(qrCode.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex border-t">
                        <Button 
                          variant="ghost" 
                          className="flex-1 rounded-none py-2 h-12 text-blue-600"
                          onClick={() => handleDownloadQR(qrCode)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          <span>다운로드</span>
                        </Button>
                        <div className="w-px bg-gray-200"></div>
                        <Button 
                          variant="ghost" 
                          className="flex-1 rounded-none py-2 h-12 text-red-600"
                          onClick={() => handleDeleteQR(index)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          <span>삭제</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <QrCode className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">QR 코드가 없습니다</h3>
                <p className="text-gray-500 mb-6">
                  아직 생성한 QR 코드가 없습니다. 새로운 QR 코드를 만들어보세요.
                </p>
                <Link to="/qr-generator">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>QR 코드 생성하기</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeList;
