
import React, { useState, ChangeEvent } from 'react'; // Import useState and ChangeEvent
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash, Link as LinkIcon, Upload } from 'lucide-react'; // Import Upload icon
import { Checkbox } from '@/components/ui/checkbox';

interface AdSettings {
  id: number;
  title: string;
  description: string;
  position: string;
  targetPages: string[];
  imageUrl: string; // Can be a URL or a data URL for preview
  link?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  imageFile?: File; // Optional: Store the file object if needed for upload later
}

interface AdManagementTabProps {
  adSettings: AdSettings[];
  setAdSettings: React.Dispatch<React.SetStateAction<AdSettings[]>>;
}

const AdManagementTab: React.FC<AdManagementTabProps> = ({ adSettings, setAdSettings }) => {
  // State to manage file input key, forcing re-render on new selection
  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());

  const addNewAd = () => {
    const newAd: AdSettings = { // Explicitly type newAd
      id: Date.now(),
      title: "새 광고",
      description: "광고 설명을 입력하세요",
      position: "sidebar",
      targetPages: ["home"],
      imageUrl: "https://via.placeholder.com/400x300.png?text=광고+이미지", // Placeholder
      link: "https://example.com",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Corrected calculation
      isActive: true
    };
    
    setAdSettings([...adSettings, newAd]);
  };

  const deleteAd = (adId: number) => {
    setAdSettings(adSettings.filter(ad => ad.id !== adId));
  };

  // Generic handler for most fields
  const handleAdChange = (adId: number, field: keyof AdSettings, value: string | boolean | string[]) => {
    setAdSettings(prevSettings =>
      prevSettings.map(ad =>
        ad.id === adId ? { ...ad, [field]: value } : ad
      )
    );
  };

  // Specific handler for image changes
  const handleImageChange = (adId: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdSettings(prevSettings =>
          prevSettings.map(ad =>
            ad.id === adId ? { ...ad, imageUrl: reader.result as string, imageFile: file } : ad
          )
        );
      };
      reader.readAsDataURL(file);
      // Reset file input to allow selecting the same file again
      setFileInputKey(Date.now());
    }
  };


  const handleTargetPagesChange = (adId: number, page: string, checked: boolean) => {
    setAdSettings(adSettings.map(ad => {
      if (ad.id === adId) {
        let newTargetPages = [...ad.targetPages];
        
        if (checked && !newTargetPages.includes(page)) {
          newTargetPages.push(page);
        } else if (!checked && newTargetPages.includes(page)) {
          newTargetPages = newTargetPages.filter(p => p !== page);
        }
        
        return { ...ad, targetPages: newTargetPages };
      }
      return ad;
    }));
  };
  
  const adPositions = [
    { value: "left", label: "왼쪽 사이드바" },
    { value: "right", label: "오른쪽 사이드바" },
    { value: "hero", label: "히어로 섹션" },
    { value: "products", label: "상품 목록 사이" },
    { value: "footer", label: "푸터 위" }
  ];
  
  const pageOptions = [
    { value: "home", label: "홈페이지" },
    { value: "product", label: "상품 상세 페이지" },
    { value: "about", label: "소개 페이지" },
    { value: "service", label: "서비스 페이지" }
  ];
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">광고 관리</h2>
        <Button onClick={addNewAd} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          새 광고 추가
        </Button>
      </div>
      
      <div className="space-y-4">
        {adSettings.map(ad => (
          <Card key={ad.id} className="overflow-hidden">
            <CardHeader className="p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md">{ad.title}</CardTitle>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteAd(ad.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Increased gap */}
                {/* Image Upload and Preview Section */}
                <div className="col-span-1 space-y-3">
                   <Label>광고 이미지</Label>
                   {/* Responsive Image Preview Container */}
                   <div className="w-full bg-gray-100 rounded-md overflow-hidden border border-dashed border-gray-300 flex items-center justify-center min-h-[150px]">
                     {ad.imageUrl ? (
                       <img
                         src={ad.imageUrl}
                         alt={ad.title || '광고 미리보기'}
                         className="w-full h-auto object-contain max-h-[300px]" // Responsive image styling
                       />
                     ) : (
                       <span className="text-gray-500 text-sm p-4 text-center">이미지 없음</span>
                     )}
                   </div>
                   {/* File Input */}
                   <Input
                     id={`ad-image-${ad.id}`}
                     key={fileInputKey} // Force re-render
                     type="file"
                     accept="image/*" // Accept only image files
                     onChange={(e) => handleImageChange(ad.id, e)}
                     className="text-sm file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                   />
                   <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={() => document.getElementById(`ad-image-${ad.id}`)?.click()}>
                     <Upload className="h-4 w-4" />
                     이미지 업로드
                   </Button>
                   <p className="text-xs text-gray-500 text-center">
                     이미지 크기는 자동으로 조절됩니다.
                   </p>
                 </div>

                {/* Ad Details Section */}
                <div className="col-span-2 space-y-4"> {/* Increased spacing */}
                  {/* Ad Title */}
                  <div>
                    <Label htmlFor={`ad-title-${ad.id}`}>광고 제목</Label>
                    <Input
                      id={`ad-title-${ad.id}`}
                      value={ad.title}
                      onChange={(e) => handleAdChange(ad.id, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Ad Description */}
                  <div>
                    <Label htmlFor={`ad-description-${ad.id}`}>광고 설명</Label>
                    <Input
                      id={`ad-description-${ad.id}`}
                      value={ad.description}
                      onChange={(e) => handleAdChange(ad.id, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Ad Link */}
                  <div>
                    <Label htmlFor={`ad-link-${ad.id}`}>연결 링크 (선택 사항)</Label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <LinkIcon className="h-4 w-4" />
                      </span>
                      <Input
                        id={`ad-link-${ad.id}`}
                        value={ad.link || ''}
                        onChange={(e) => handleAdChange(ad.id, 'link', e.target.value)}
                        className="rounded-l-none"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Position and Status */}
                  <div className="grid grid-cols-2 gap-4"> {/* Increased gap */}
                    <div>
                      <Label htmlFor={`ad-position-${ad.id}`}>표시 위치</Label>
                      <select 
                        id={`ad-position-${ad.id}`}
                        value={ad.position}
                        onChange={(e) => handleAdChange(ad.id, 'position', e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1" // Using ShadCN select styles (assuming it's used)
                      >
                        {adPositions.map(pos => (
                          <option key={pos.value} value={pos.value}>{pos.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`ad-active-${ad.id}`}>활성화 상태</Label>
                      <div className="flex items-center space-x-2 mt-3">
                        <Switch
                          id={`ad-active-${ad.id}`}
                          checked={ad.isActive}
                          onCheckedChange={(checked) => handleAdChange(ad.id, 'isActive', !!checked)} // Ensure boolean
                        />
                        <Label htmlFor={`ad-active-${ad.id}`} className="text-sm">
                          {ad.isActive ? '활성' : '비활성'}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Target Pages */}
                  <div>
                    <Label className="block mb-2 font-medium">노출 페이지</Label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2"> {/* Adjusted gap */}
                      {pageOptions.map(page => (
                        <div key={page.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`page-${ad.id}-${page.value}`}
                            checked={ad.targetPages?.includes(page.value) || false}
                            onCheckedChange={(checked) => 
                              handleTargetPagesChange(ad.id, page.value, !!checked)
                            }
                          />
                          <Label 
                            htmlFor={`page-${ad.id}-${page.value}`}
                            className="text-sm font-normal"
                          >
                            {page.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Start and End Dates */}
                  <div className="grid grid-cols-2 gap-4"> {/* Increased gap */}
                    <div>
                      <Label htmlFor={`ad-start-${ad.id}`}>시작일</Label>
                      <Input
                        id={`ad-start-${ad.id}`}
                        type="date"
                        value={ad.startDate}
                        onChange={(e) => handleAdChange(ad.id, 'startDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`ad-end-${ad.id}`}>종료일</Label>
                      <Input
                        id={`ad-end-${ad.id}`}
                        type="date"
                        value={ad.endDate}
                        onChange={(e) => handleAdChange(ad.id, 'endDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdManagementTab;
