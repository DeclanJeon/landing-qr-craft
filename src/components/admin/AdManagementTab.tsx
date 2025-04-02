
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash } from 'lucide-react';

interface AdSettings {
  id: number;
  title: string;
  description: string;
  position: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface AdManagementTabProps {
  adSettings: AdSettings[];
  setAdSettings: React.Dispatch<React.SetStateAction<AdSettings[]>>;
}

const AdManagementTab: React.FC<AdManagementTabProps> = ({ adSettings, setAdSettings }) => {
  const addNewAd = () => {
    const newAd = {
      id: Date.now(),
      title: "새 광고",
      description: "광고 설명을 입력하세요",
      position: "sidebar",
      imageUrl: "https://placehold.co/300x200",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    };
    
    setAdSettings([...adSettings, newAd]);
  };

  const deleteAd = (adId: number) => {
    setAdSettings(adSettings.filter(ad => ad.id !== adId));
  };

  const handleAdChange = (adId: number, field: string, value: string | boolean) => {
    setAdSettings(adSettings.map(ad => 
      ad.id === adId ? { ...ad, [field]: value } : ad
    ));
  };
  
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    이미지 변경
                  </Button>
                </div>
                
                <div className="col-span-2 space-y-3">
                  <div>
                    <Label htmlFor={`ad-title-${ad.id}`}>광고 제목</Label>
                    <Input 
                      id={`ad-title-${ad.id}`} 
                      value={ad.title} 
                      onChange={(e) => handleAdChange(ad.id, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`ad-description-${ad.id}`}>광고 설명</Label>
                    <Input 
                      id={`ad-description-${ad.id}`} 
                      value={ad.description} 
                      onChange={(e) => handleAdChange(ad.id, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`ad-position-${ad.id}`}>표시 위치</Label>
                      <select 
                        id={`ad-position-${ad.id}`}
                        value={ad.position}
                        onChange={(e) => handleAdChange(ad.id, 'position', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="hero">히어로 섹션</option>
                        <option value="sidebar">사이드바</option>
                        <option value="products">상품 목록 사이</option>
                        <option value="footer">푸터 위</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`ad-active-${ad.id}`}>활성화 상태</Label>
                      <select 
                        id={`ad-active-${ad.id}`}
                        value={ad.isActive ? "true" : "false"}
                        onChange={(e) => handleAdChange(ad.id, 'isActive', e.target.value === "true")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="true">활성화</option>
                        <option value="false">비활성화</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
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
