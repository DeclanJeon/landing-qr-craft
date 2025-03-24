
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Link, Store, User } from "lucide-react";

// Placeholder function to generate QR code image URL
const generateQrCode = (content: string, type: string = 'url') => {
  // In a real implementation, this would call a QR code generation API with different settings based on type
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(content)}`;
};

const QRCodeGeneratorForm = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrContent, setQrContent] = useState('https://peermall.com');
  const [qrName, setQrName] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [savedQRCodes, setSavedQRCodes] = useState<{name: string, content: string, image: string, type: string, createdAt: string}[]>([]);

  // Load saved QR codes from localStorage on component mount
  useEffect(() => {
    const storedQRCodes = localStorage.getItem('peermall-qrcodes');
    if (storedQRCodes) {
      setSavedQRCodes(JSON.parse(storedQRCodes));
    }
  }, []);

  // Update QR image when content changes
  useEffect(() => {
    setQrImage(generateQrCode(qrContent, activeTab));
  }, [qrContent, activeTab]);

  // Handle QR code generation and saving
  const handleGenerateQR = () => {
    if (!qrContent.trim()) {
      toast({
        title: "내용을 입력해주세요",
        description: "QR 코드를 생성하려면 내용을 입력해야 합니다.",
        variant: "destructive"
      });
      return;
    }

    const newQRImage = generateQrCode(qrContent, activeTab);
    setQrImage(newQRImage);
    
    toast({
      title: "QR 코드가 생성되었습니다",
      description: "생성된 QR 코드를 다운로드하거나 저장할 수 있습니다.",
    });
  };

  // Handle saving QR code
  const handleSaveQR = () => {
    if (!qrName.trim()) {
      toast({
        title: "이름을 입력해주세요",
        description: "QR 코드를 저장하려면 이름을 입력해야 합니다.",
        variant: "destructive"
      });
      return;
    }

    const newQRCode = {
      name: qrName,
      content: qrContent,
      image: qrImage,
      type: activeTab,
      createdAt: new Date().toISOString()
    };

    const updatedQRCodes = [...savedQRCodes, newQRCode];
    setSavedQRCodes(updatedQRCodes);
    localStorage.setItem('peermall-qrcodes', JSON.stringify(updatedQRCodes));

    toast({
      title: "QR 코드가 저장되었습니다",
      description: "저장된 QR 코드는 목록에서 확인할 수 있습니다.",
    });

    // Reset form for new entry
    setQrName('');
  };

  // Handle QR download
  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = qrName ? `${qrName}.png` : 'peermall-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR 코드 다운로드",
      description: "QR 코드가 성공적으로 다운로드되었습니다.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-subtle">
      <h2 className="text-2xl font-bold mb-6 text-center">QR 코드 생성</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="url" className="flex items-center">
                <Link className="h-4 w-4 mr-2" />
                <span>URL</span>
              </TabsTrigger>
              <TabsTrigger value="store" className="flex items-center">
                <Store className="h-4 w-4 mr-2" />
                <span>스토어</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>연락처</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <div>
                <label htmlFor="qr-name" className="block text-sm font-medium text-gray-700 mb-1">QR 코드 이름</label>
                <Input 
                  id="qr-name"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  placeholder="예: 내 웹사이트 QR"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="qr-url" className="block text-sm font-medium text-gray-700 mb-1">URL 주소</label>
                <Input 
                  id="qr-url"
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder="https://"
                  className="w-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="store" className="space-y-4">
              <div>
                <label htmlFor="store-qr-name" className="block text-sm font-medium text-gray-700 mb-1">QR 코드 이름</label>
                <Input 
                  id="store-qr-name"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  placeholder="예: 내 스토어 QR"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="store-id" className="block text-sm font-medium text-gray-700 mb-1">스토어 ID</label>
                <Input 
                  id="store-id"
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder="스토어 ID를 입력하세요"
                  className="w-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div>
                <label htmlFor="contact-qr-name" className="block text-sm font-medium text-gray-700 mb-1">QR 코드 이름</label>
                <Input 
                  id="contact-qr-name"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  placeholder="예: 내 연락처 QR"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="contact-info" className="block text-sm font-medium text-gray-700 mb-1">연락처 정보</label>
                <Input 
                  id="contact-info"
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder="이름, 연락처 등을 입력하세요"
                  className="w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex space-x-3 mt-6">
            <Button onClick={handleGenerateQR} className="flex-1 bg-blue-600 hover:bg-blue-700">
              QR 코드 생성
            </Button>
            <Button onClick={handleSaveQR} className="flex-1" variant="outline">
              저장하기
            </Button>
            <Button onClick={handleDownloadQR} className="flex-1" variant="outline">
              다운로드
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">최근 생성한 QR 코드</h3>
            <div className="grid grid-cols-2 gap-3">
              {savedQRCodes.slice(-4).map((qrCode, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-md mb-2">
                      <img src={qrCode.image} alt={qrCode.name} className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-medium truncate">{qrCode.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-50 p-6 rounded-xl w-full max-w-xs">
            <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col items-center mb-4">
              <QrCode className="text-blue-600 mb-3 h-8 w-8" />
              <h3 className="text-lg font-medium mb-4">QR 코드 미리보기</h3>
              {qrImage && (
                <img src={qrImage} alt="QR 코드" className="w-48 h-48" />
              )}
              <p className="text-sm text-gray-500 mt-4 text-center">
                모바일 기기로 QR 코드를 스캔하여 테스트해보세요.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-medium">{qrName || '내 QR 코드'}</h4>
              <p className="text-sm text-gray-500 break-all">{qrContent}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGeneratorForm;
