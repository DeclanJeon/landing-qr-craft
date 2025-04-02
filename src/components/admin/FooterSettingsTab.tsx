
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FooterSettings {
  background: string;
  textColor: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
}

interface FooterSettingsTabProps {
  shopName: string;
  footerSettings: FooterSettings;
  setFooterSettings: React.Dispatch<React.SetStateAction<FooterSettings>>;
}

const FooterSettingsTab: React.FC<FooterSettingsTabProps> = ({ 
  shopName, 
  footerSettings, 
  setFooterSettings 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">푸터 정보 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="footer-background">배경 스타일</Label>
            <select 
              id="footer-background"
              value={footerSettings.background}
              onChange={e => setFooterSettings({...footerSettings, background: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="bg-gray-800">다크 그레이</option>
              <option value="bg-gray-900">블랙</option>
              <option value="bg-blue-800">다크 블루</option>
              <option value="bg-purple-800">다크 퍼플</option>
              <option value="bg-green-800">다크 그린</option>
              <option value="bg-white">화이트</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="footer-text-color">텍스트 색상</Label>
            <select 
              id="footer-text-color"
              value={footerSettings.textColor}
              onChange={e => setFooterSettings({...footerSettings, textColor: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="text-white">화이트</option>
              <option value="text-gray-900">블랙</option>
              <option value="text-gray-500">그레이</option>
              <option value="text-blue-500">블루</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="owner-name">대표자명</Label>
            <Input 
              id="owner-name" 
              value={footerSettings.ownerName} 
              onChange={e => setFooterSettings({...footerSettings, ownerName: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="contact-number">연락처</Label>
            <Input 
              id="contact-number" 
              value={footerSettings.contactNumber} 
              onChange={e => setFooterSettings({...footerSettings, contactNumber: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email" 
              value={footerSettings.email} 
              onChange={e => setFooterSettings({...footerSettings, email: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="address">주소</Label>
            <Input 
              id="address" 
              value={footerSettings.address} 
              onChange={e => setFooterSettings({...footerSettings, address: e.target.value})}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">푸터 미리보기</h3>
          <div className={`rounded-lg overflow-hidden ${footerSettings.background} ${footerSettings.textColor} p-6`}>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{shopName}</h3>
              <p className="opacity-80">
                {shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-medium mb-2">연락처 정보</h4>
                <ul className="space-y-1 opacity-80">
                  {footerSettings.ownerName && <li>대표자: {footerSettings.ownerName}</li>}
                  {footerSettings.contactNumber && <li>연락처: {footerSettings.contactNumber}</li>}
                  {footerSettings.email && <li>이메일: {footerSettings.email}</li>}
                  {footerSettings.address && <li>주소: {footerSettings.address}</li>}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">쇼핑몰 정보</h4>
                <ul className="space-y-1">
                  <li className="opacity-80">소개</li>
                  <li className="opacity-80">서비스</li>
                  <li className="opacity-80">이용약관</li>
                  <li className="opacity-80">개인정보처리방침</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSettingsTab;
