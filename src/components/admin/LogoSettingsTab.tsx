import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShopData } from '@/types/shop';

// Define the type for logoTextStyle based on ShopData
type LogoTextStyle = NonNullable<ShopData['logoTextStyle']>;

interface LogoSettingsTabProps {
  shopName: string;
  logoUrl: string | null; // Allow null for removed logo
  logoText?: string;
  logoTextStyle?: LogoTextStyle;
  setLogoUrl: (url: string | null) => void;
  setLogoText: (text: string) => void;
  setLogoTextStyle: (style: LogoTextStyle) => void;
}

const LogoSettingsTab: React.FC<LogoSettingsTabProps> = ({
  shopName,
  logoUrl,
  logoText = '',
  logoTextStyle = { fontSize: 'text-xl', fontWeight: 'font-bold', color: '#333333' }, // Default style (darker text)
  setLogoUrl,
  setLogoText,
  setLogoTextStyle
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(logoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when logoUrl prop changes
  useEffect(() => {
    // Only update preview if logoUrl is not null, otherwise keep preview null
    setPreviewUrl(logoUrl); 
  }, [logoUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].includes(file.type)) {
        alert('지원되지 않는 파일 형식입니다. (PNG, JPG, GIF, SVG)');
        return;
      }

      // Clean up previous blob URL if it exists
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      // NOTE: Using blob URL for saving. This is temporary and will break on reload.
      // A real implementation should upload the file and save the permanent URL.
      setLogoUrl(objectUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setLogoUrl(null); // Notify parent
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleStyleChange = (key: keyof LogoTextStyle, value: string) => {
    // Ensure default values if a style is somehow undefined
    const currentStyle = logoTextStyle ?? { fontSize: 'text-xl', fontWeight: 'font-bold', color: '#333333' };
    setLogoTextStyle({ ...currentStyle, [key]: value });
  };

  // Use previewUrl for the image source, fallback to placeholder if previewUrl is null
  const currentPreviewSrc = previewUrl || "https://placehold.co/150x50?text=Logo";

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">로고 및 텍스트 설정</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo Image Section */}
        <div className="space-y-4 border-r-0 md:border-r md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
          <h3 className="text-lg font-semibold mb-3">로고 이미지</h3>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif, image/svg+xml"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={triggerFileInput}>
              <Upload className="mr-2 h-4 w-4" />
              이미지 선택
            </Button>
            {/* Show remove button only if there's a logoUrl or previewUrl */}
            {(logoUrl || previewUrl) && (
              <Button variant="destructive" size="sm" onClick={handleRemoveLogo}>
                <XCircle className="mr-1 h-4 w-4" />
                이미지 제거
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            권장: 가로형, 투명 배경 (PNG, SVG)
          </p>
          <div className="mt-4">
            <Label className="font-semibold">이미지 미리보기</Label>
            <div className="mt-2 border rounded p-4 inline-block bg-gray-100 min-h-[60px] flex items-center justify-center">
              {/* Use previewUrl state for preview */}
              {previewUrl ? (
                <img
                  src={previewUrl} // Use state for preview source
                  alt={`${shopName || 'Shop'} Logo Preview`}
                  className="max-h-16 max-w-[200px]"
                  onError={(e) => {
                     e.currentTarget.src = "https://placehold.co/150x50?text=Error";
                     e.currentTarget.alt = "Error loading logo";
                  }}
                />
              ) : (
                 <span className="text-sm text-gray-400">로고 없음</span>
              )}
            </div>
          </div>
        </div>

        {/* Logo Text & Style Section */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold mb-3">로고 텍스트 (선택)</h3>
           <div>
             <Label htmlFor="logo-text">표시할 텍스트</Label>
             <Input
               id="logo-text"
               value={logoText}
               onChange={(e) => setLogoText(e.target.value)}
               placeholder="예: Awesome Shop"
               className="mt-1"
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label htmlFor="logo-font-size">글자 크기</Label>
               <Select value={logoTextStyle?.fontSize ?? 'text-xl'} onValueChange={(value) => handleStyleChange('fontSize', value)}>
                 <SelectTrigger id="logo-font-size" className="mt-1">
                   <SelectValue placeholder="크기 선택" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="text-sm">Small</SelectItem>
                   <SelectItem value="text-base">Medium</SelectItem>
                   <SelectItem value="text-lg">Large</SelectItem>
                   <SelectItem value="text-xl">XL</SelectItem>
                   <SelectItem value="text-2xl">2XL</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div>
               <Label htmlFor="logo-font-weight">글자 굵기</Label>
               <Select value={logoTextStyle?.fontWeight ?? 'font-bold'} onValueChange={(value) => handleStyleChange('fontWeight', value)}>
                 <SelectTrigger id="logo-font-weight" className="mt-1">
                   <SelectValue placeholder="굵기 선택" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="font-normal">Normal</SelectItem>
                   <SelectItem value="font-medium">Medium</SelectItem>
                   <SelectItem value="font-semibold">SemiBold</SelectItem>
                   <SelectItem value="font-bold">Bold</SelectItem>
                   <SelectItem value="font-extrabold">ExtraBold</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
           <div>
             <Label htmlFor="logo-text-color">글자 색상</Label>
             <Input
               id="logo-text-color"
               type="color"
               value={logoTextStyle?.color ?? '#333333'}
               onChange={(e) => handleStyleChange('color', e.target.value)}
               className="mt-1 h-10 w-full"
             />
           </div>

           {/* Text Preview */}
           <div className="mt-4">
             <Label className="font-semibold">텍스트 미리보기</Label>
             <div className="mt-2 border rounded p-4 bg-gray-100">
               <span style={{ color: logoTextStyle?.color ?? '#333333' }} className={`${logoTextStyle?.fontSize ?? 'text-xl'} ${logoTextStyle?.fontWeight ?? 'font-bold'}`}>
                 {logoText || "로고 텍스트"}
               </span>
             </div>
           </div>
        </div>
      </div>

       {/* Info Section */}
       <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">안내</h3>
          <p className="text-sm text-blue-700">
            로고 이미지와 텍스트는 헤더 영역에 함께 표시됩니다. 이미지가 없으면 텍스트만 표시됩니다.
            변경 사항을 저장해야 실제 피어몰에 적용됩니다.
          </p>
        </div>
    </div>
  );
};

export default LogoSettingsTab;
