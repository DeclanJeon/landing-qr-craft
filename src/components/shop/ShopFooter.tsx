import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react'; // Import more icons
import { ShopData } from '@/types/shop'; // Import ShopData

// Define the type for footer settings from ShopData
type FooterSettings = NonNullable<ShopData['footerSettings']>;

interface ShopFooterProps {
  shopName: string;
  shopUrl: string;
  shopData?: ShopData; // Pass the whole shopData
  footerSettingsOverride?: FooterSettings; // Optional override for preview
}

const ShopFooter: React.FC<ShopFooterProps> = ({
  shopName,
  shopUrl,
  shopData,
  footerSettingsOverride
}) => {
  const params = useParams();
  const actualShopUrl = shopUrl || params.shopUrl || '';

  // Determine the settings to use: override first, then from shopData, then defaults
  const settings: FooterSettings = {
    background: "bg-gray-900", // Default background
    textColor: "text-white",   // Default text color
    skin: 'default',           // Default skin
    links: [],                 // Default empty links
    // Merge defaults with shopData settings
    ...(shopData?.footerSettings || {}),
    // Override with footerSettingsOverride if provided
    ...(footerSettingsOverride || {})
  };

  // Extract settings for easier use
  const {
    background = "bg-gray-900",
    textColor = "text-white",
    ownerName = shopData?.ownerName, // Fallback to shopData ownerName
    contactNumber = shopData?.contactNumber,
    email = shopData?.email,
    address = shopData?.address,
    links = [],
    skin = 'default'
  } = settings;

  // Get shop description from main shopData
  const shopDescription = shopData?.shopDescription || `${shopName}에 오신 것을 환영합니다.`;

  // --- Render different footer layouts based on skin ---

  const renderDefaultFooter = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Shop Info */}
        <div className="md:col-span-2 mb-8 md:mb-0">
          <h3 className="text-2xl font-serif font-medium mb-4">{shopName}</h3>
          <p className={`${textColor}/80 max-w-md leading-relaxed text-sm`}>
            {shopDescription}
          </p>
        </div>

        {/* Custom Links */}
        {links.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">바로가기</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  {/* Use Link component for internal links, 'a' for external */}
                  {link.url.startsWith('/') ? (
                    <Link to={link.url} className={`${textColor}/70 hover:${textColor} transition-colors text-sm`}>
                      {link.title}
                    </Link>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${textColor}/70 hover:${textColor} transition-colors text-sm`}>
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-medium mb-4">연락처 정보</h4>
          <ul className={`space-y-2 ${textColor}/70 text-sm`}>
            {ownerName && <li>대표: {ownerName}</li>}
            {contactNumber && (
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{contactNumber}</span>
              </li>
            )}
            {email && (
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href={`mailto:${email}`} className={`hover:${textColor}`}>{email}</a>
              </li>
            )}
            {address && (
               <li className="flex items-start">
                 <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                 <span>{address}</span>
               </li>
            )}
          </ul>
        </div>
      </div>
      <div className={`border-t border-${textColor}/10 mt-12 pt-8 text-center ${textColor}/60 text-xs`}>
        <p>© {new Date().getFullYear()} {shopName}. All rights reserved. Powered by Peermall.</p>
      </div>
    </div>
  );

  const renderMinimalFooter = () => (
     <div className="container mx-auto px-4 py-8">
       <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
         <p className={`${textColor}/60 text-xs mb-4 sm:mb-0`}>
           © {new Date().getFullYear()} {shopName}. All rights reserved.
           {ownerName && ` | 대표: ${ownerName}`}
           {contactNumber && ` | 연락처: ${contactNumber}`}
         </p>
         {links.length > 0 && (
           <ul className="flex space-x-4">
             {links.map((link, index) => (
               <li key={index}>
                 {link.url.startsWith('/') ? (
                    <Link to={link.url} className={`${textColor}/70 hover:${textColor} transition-colors text-xs`}>
                      {link.title}
                    </Link>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${textColor}/70 hover:${textColor} transition-colors text-xs`}>
                      {link.title}
                    </a>
                  )}
               </li>
             ))}
           </ul>
         )}
       </div>
     </div>
   );

   const renderCenteredFooter = () => (
     <div className="container mx-auto px-4 py-12 text-center">
       <h3 className="text-xl font-serif font-medium mb-4">{shopName}</h3>
       <p className={`${textColor}/80 max-w-lg mx-auto leading-relaxed text-sm mb-6`}>
         {shopDescription}
       </p>
       {links.length > 0 && (
         <ul className="flex justify-center space-x-6 mb-6">
           {links.map((link, index) => (
             <li key={index}>
               {link.url.startsWith('/') ? (
                  <Link to={link.url} className={`${textColor}/70 hover:${textColor} transition-colors text-sm font-medium`}>
                    {link.title}
                  </Link>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${textColor}/70 hover:${textColor} transition-colors text-sm font-medium`}>
                    {link.title}
                  </a>
                )}
             </li>
           ))}
         </ul>
       )}
       <div className={`border-t border-${textColor}/10 pt-6 ${textColor}/60 text-xs`}>
         <p>
           {ownerName && `대표: ${ownerName} | `}
           {contactNumber && `연락처: ${contactNumber} | `}
           {email && `이메일: ${email}`}
         </p>
         <p className="mt-1">© {new Date().getFullYear()} {shopName}. All rights reserved. Powered by Peermall.</p>
       </div>
     </div>
   );


  // Choose the render function based on the skin
  const renderFooterContent = () => {
    switch (skin) {
      case 'minimal':
        return renderMinimalFooter();
      case 'centered':
        return renderCenteredFooter();
      case 'default':
      default:
        return renderDefaultFooter();
    }
  };

  // Use background and textColor classes directly if they are Tailwind classes
  // Apply inline styles if they are hex codes
  const footerStyle: React.CSSProperties = {};
  let footerClasses = '';

  if (background?.startsWith('#')) {
    footerStyle.backgroundColor = background;
  } else {
    footerClasses += ` ${background}`; // Add background class
  }

  if (textColor?.startsWith('#')) {
    footerStyle.color = textColor;
    // Note: Applying hex color via style might override Tailwind text color utilities used inside
  } else {
    footerClasses += ` ${textColor}`; // Add text color class
  }

  return (
    <footer className={footerClasses.trim()} style={footerStyle}>
      {renderFooterContent()}
    </footer>
  );
};

export default ShopFooter;
