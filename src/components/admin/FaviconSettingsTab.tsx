
import React, { useState, useRef } from 'react'; // Import useState and useRef
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react'; // Import Upload icon

interface FaviconSettingsTabProps {
  shopName: string;
  faviconUrl: string; // Current saved URL
  setFaviconUrl: React.Dispatch<React.SetStateAction<string>>; // Add this prop to fix the error
}

const FaviconSettingsTab: React.FC<FaviconSettingsTabProps> = ({ 
  shopName, 
  faviconUrl,
  setFaviconUrl
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation (optional)
      if (!['image/png', 'image/jpeg', 'image/gif', 'image/x-icon', 'image/svg+xml'].includes(file.type)) {
        alert('지원되지 않는 파일 형식입니다. (PNG, JPG, GIF, ICO, SVG)');
        return;
      }
      // Create a temporary URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      // Update the favicon URL to be saved
      setFaviconUrl(objectUrl);
      
      // Clean up the previous object URL if it exists
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

  // Determine the source for the preview images
  const currentPreviewSrc = previewUrl || faviconUrl || "https://placehold.co/32x32";
  const currentTabPreviewSrc = previewUrl || faviconUrl || "https://placehold.co/16x16";

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">파비콘 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Hidden File Input */}
          <Input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif, image/x-icon, image/svg+xml" 
          />
          
          {/* Upload Button */}
          <Button variant="outline" onClick={triggerFileInput}>
            <Upload className="mr-2 h-4 w-4" />
            파비콘 업로드
          </Button>
           <p className="text-xs text-gray-500 mt-1">
              권장: 정사각형 PNG, JPG, GIF, ICO, SVG (예: 32x32)
           </p>
          
          {/* Preview Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">미리보기 (32x32)</h3>
            <div className="flex items-center space-x-4">
              <div className="border rounded p-2 inline-block">
                <img 
                  src={currentPreviewSrc} 
                  alt="Favicon preview" 
                  className="w-8 h-8"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/32x32")} // Fallback
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Browser Tab Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">브라우저 탭 미리보기</h3>
          <div className="flex items-center space-x-2 mb-4 p-2 bg-white rounded border shadow-sm">
            <img 
              src={currentTabPreviewSrc} 
              alt="Favicon tab preview" 
              className="w-4 h-4"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/16x16")} // Fallback
            />
            <span className="text-sm truncate text-gray-700">
              {shopName || "내 피어몰"} | Peermall
            </span>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
            <p className="text-sm text-blue-700">
              파비콘은 브라우저 탭, 북마크 등에 표시되는 작은 아이콘입니다.
              실제 파비콘을 적용하려면 변경 사항을 저장하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaviconSettingsTab;
