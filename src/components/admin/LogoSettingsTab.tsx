import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface LogoSettingsTabProps {
  shopName: string; // Used for alt text maybe
  logoUrl: string; // Current saved logo URL
  // setLogoUrl will be needed for saving
}

const LogoSettingsTab: React.FC<LogoSettingsTabProps> = ({ 
  shopName, 
  logoUrl 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].includes(file.type)) {
        alert('지원되지 않는 파일 형식입니다. (PNG, JPG, GIF, SVG)');
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Clean up previous object URL
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const currentPreviewSrc = previewUrl || logoUrl || "https://placehold.co/150x50?text=Logo";

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">로고 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Hidden File Input */}
          <Input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif, image/svg+xml" 
          />
          
          {/* Upload Button */}
          <Button variant="outline" onClick={triggerFileInput}>
            <Upload className="mr-2 h-4 w-4" />
            로고 이미지 업로드
          </Button>
           <p className="text-xs text-gray-500 mt-1">
              권장: 가로형 이미지 (PNG, JPG, GIF, SVG)
           </p>
          
          {/* Preview Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">로고 미리보기</h3>
            <div className="border rounded p-4 inline-block bg-gray-100">
              <img 
                src={currentPreviewSrc} 
                alt={`${shopName || 'Shop'} Logo Preview`} 
                className="max-h-16 max-w-xs" // Adjust size as needed
                onError={(e) => (e.currentTarget.src = "https://placehold.co/150x50?text=Logo")} // Fallback
              />
            </div>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">안내</h3>
          <p className="text-sm text-gray-700">
            업로드된 로고는 피어몰 헤더 영역에 표시됩니다. 
            투명 배경의 PNG 또는 SVG 파일을 권장합니다.
            변경 사항을 저장해야 실제 로고가 적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoSettingsTab;
