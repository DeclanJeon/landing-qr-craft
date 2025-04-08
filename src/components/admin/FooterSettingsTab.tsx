import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ShopData } from '@/types/shop';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import ShopFooter from '@/components/shop/ShopFooter'; // Import ShopFooter for preview

// Define the type for footer settings, ensuring links and skin are included
type FooterSettings = NonNullable<ShopData['footerSettings']>;
// Define the type for a single footer link
type FooterLink = NonNullable<FooterSettings['links']>[number];

interface FooterSettingsTabProps {
  shopData: ShopData; // Pass the whole shopData to edit description
  footerSettings: FooterSettings;
  setShopData: React.Dispatch<React.SetStateAction<ShopData | null>>; // Function to update the whole shopData
  setFooterSettings: React.Dispatch<React.SetStateAction<FooterSettings>>;
}

const FooterSettingsTab: React.FC<FooterSettingsTabProps> = ({
  shopData,
  footerSettings,
  setShopData,
  setFooterSettings
}) => {
  // State for managing the link being edited
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
  const [currentEditTitle, setCurrentEditTitle] = useState('');
  const [currentEditUrl, setCurrentEditUrl] = useState('');
  // State for the new link input fields
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');


  // Ensure links array exists
  const links = footerSettings.links || [];

  const handleInputChange = (field: keyof FooterSettings, value: string) => {
    setFooterSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    // Update the shopDescription within the main shopData state
    setShopData(prev => prev ? { ...prev, shopDescription: newDescription } : null);
    // Also update the description in heroSettings if it's linked (optional, depends on desired behavior)
    setFooterSettings(prev => ({
        ...prev,
        // If you want footer description to be separate, add a new field to FooterSettings
        // Otherwise, this update might not be needed here if shopDescription is the source
    }));
  };


  const handleLinkChange = (field: keyof FooterLink, value: string) => {
    // No longer needed as we use separate states for new link
  };

  // Function to add a new link
  const handleAddNewLink = () => {
    if (!newLinkTitle || !newLinkUrl) return; // Basic validation
    const newLink: FooterLink = { title: newLinkTitle, url: newLinkUrl };
    const newLinks = [...links, newLink];
    setFooterSettings(prev => ({ ...prev, links: newLinks }));
    // Reset new link fields
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  // Function to start editing an existing link
  const handleEditLink = (index: number) => {
    setEditingLinkIndex(index);
    setCurrentEditTitle(links[index].title);
    setCurrentEditUrl(links[index].url);
  };

  // Function to save changes to an existing link
  const handleUpdateLink = () => {
    if (editingLinkIndex === null || !currentEditTitle || !currentEditUrl) return;
    const newLinks = [...links];
    newLinks[editingLinkIndex] = { title: currentEditTitle, url: currentEditUrl };
    setFooterSettings(prev => ({ ...prev, links: newLinks }));
    // Reset editing state
    setEditingLinkIndex(null);
    setCurrentEditTitle('');
    setCurrentEditUrl('');
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setFooterSettings(prev => ({ ...prev, links: newLinks }));
  };

  const handleSkinChange = (value: string) => {
    setFooterSettings(prev => ({ ...prev, skin: value }));
  };

  // Define available footer skins/templates
  const footerSkins = [
    { value: 'default', label: '기본 스타일' },
    { value: 'minimal', label: '미니멀 스타일' },
    { value: 'centered', label: '중앙 정렬 스타일' },
    // Add more skins as needed
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">푸터 설정</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">기본 연락처 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="owner-name">대표자 이름</Label><Input type="text" id="owner-name" value={footerSettings.ownerName || ''} onChange={e => handleInputChange('ownerName', e.target.value)} className="mt-1"/></div>
              <div><Label htmlFor="contact-number">연락처</Label><Input type="text" id="contact-number" value={footerSettings.contactNumber || ''} onChange={e => handleInputChange('contactNumber', e.target.value)} className="mt-1"/></div>
              <div><Label htmlFor="email">이메일</Label><Input type="email" id="email" value={footerSettings.email || ''} onChange={e => handleInputChange('email', e.target.value)} className="mt-1"/></div>
              <div><Label htmlFor="address">주소</Label><Input type="text" id="address" value={footerSettings.address || ''} onChange={e => handleInputChange('address', e.target.value)} className="mt-1"/></div>
            </div>
          </div>

          {/* Shop Description */}
          <div className="space-y-4 p-4 border rounded-lg">
             <h3 className="font-medium mb-2">피어몰 소개글 (푸터 표시용)</h3>
             <Label htmlFor="shop-description-footer">소개글</Label>
             <Textarea
               id="shop-description-footer"
               value={shopData?.shopDescription || ''}
               onChange={handleDescriptionChange}
               className="mt-1 min-h-[80px]"
               placeholder="푸터에 표시될 피어몰 소개글을 입력하세요."
             />
             <p className="text-xs text-gray-500">이 내용은 피어몰의 기본 소개글과 연동됩니다.</p>
           </div>

          {/* Custom Links */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">커스텀 링크 관리</h3>
            <div className="space-y-3"> {/* Increased spacing */}
              {links.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-gray-50"> {/* Added background */}
                  {editingLinkIndex === index ? (
                    // Editing View
                    <div className="flex-grow space-y-2 mr-2">
                       <Input
                         placeholder="링크 제목"
                         value={currentEditTitle}
                         onChange={e => setCurrentEditTitle(e.target.value)}
                         className="h-8 text-sm"
                       />
                       <Input
                         placeholder="URL"
                         value={currentEditUrl}
                         onChange={e => setCurrentEditUrl(e.target.value)}
                         className="h-8 text-sm"
                       />
                    </div>
                  ) : (
                    // Display View
                    <div className="flex items-center space-x-2 overflow-hidden mr-2">
                      <LinkIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm truncate" title={`${link.title} (${link.url})`}>
                        {link.title} <span className="text-gray-400">({link.url})</span>
                      </span>
                    </div>
                  )}
                  <div className="flex space-x-1 flex-shrink-0">
                    {editingLinkIndex === index ? (
                      <>
                        <Button variant="ghost" size="sm" onClick={handleUpdateLink} className="text-xs h-7 px-2">저장</Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingLinkIndex(null)} className="text-xs h-7 px-2">취소</Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleEditLink(index)} className="text-xs h-7 px-2">수정</Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteLink(index)} className="text-xs h-7 px-2 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {links.length === 0 && <p className="text-sm text-gray-500 mt-2">추가된 링크가 없습니다.</p>}

            {/* Always visible New Link Form */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">새 링크 추가</h4>
              <div className="flex items-start space-x-2">
                <Input
                  placeholder="링크 제목"
                  value={newLinkTitle}
                  onChange={e => setNewLinkTitle(e.target.value)}
                  className="flex-1 h-9 text-sm"
                />
                <Input
                  placeholder="URL"
                  value={newLinkUrl}
                  onChange={e => setNewLinkUrl(e.target.value)}
                  className="flex-1 h-9 text-sm"
                />
                <Button size="sm" onClick={handleAddNewLink} className="h-9">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Style & Skin */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">스타일 및 스킨</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <Label htmlFor="footer-background">배경 색상</Label>
                 <Input type="color" id="footer-background" value={footerSettings.background?.startsWith('#') ? footerSettings.background : '#374151'} onChange={e => handleInputChange('background', e.target.value)} className="mt-1 h-10 w-full"/>
               </div>
               <div>
                 <Label htmlFor="footer-text-color">글자 색상</Label>
                 <Input type="color" id="footer-text-color" value={footerSettings.textColor?.startsWith('#') ? footerSettings.textColor : '#ffffff'} onChange={e => handleInputChange('textColor', e.target.value)} className="mt-1 h-10 w-full"/>
               </div>
               <div>
                 <Label htmlFor="footer-skin">푸터 스킨</Label>
                 <select
                   id="footer-skin"
                   value={footerSettings.skin || 'default'}
                   onChange={e => handleSkinChange(e.target.value)}
                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                 >
                   {footerSkins.map(skin => (
                     <option key={skin.value} value={skin.value}>{skin.label}</option>
                   ))}
                 </select>
               </div>
             </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-24"> {/* Make preview sticky */}
            <h3 className="font-semibold mb-3 text-lg">푸터 미리보기</h3>
            <div className="border rounded-lg overflow-hidden">
              {/* Pass necessary data to ShopFooter for accurate preview */}
              <ShopFooter
                shopName={shopData.shopName}
                shopUrl={shopData.shopUrl}
                shopData={shopData} // Pass the entire shopData
                // Override footerSettings with current state for live preview
                footerSettingsOverride={footerSettings}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              실제 페이지에서는 선택된 스킨과 설정에 따라 다르게 보일 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSettingsTab;
