
// Ensure the theme settings are properly initialized with default values
const defaultThemeSettings = {
  primaryColor: '#3B82F6',
  secondaryColor: '#6366F1',
  fontFamily: 'system-ui, sans-serif',
  borderRadius: 'rounded-lg',
  skin: 'default',
  accentColor: '#F59E0B',
  textColor: '#111827',
  cardStyle: 'shadow',
  buttonStyle: 'filled',
  headerStyle: 'classic',
  luxuryEffects: true,
  animations: 'subtle'
};

// When accessing theme settings in components:
// const themeSettings = shopData.templateSettings || shopData.themeSettings || defaultThemeSettings;

// Example usage in a component:
import React from 'react';
import { ShopData } from '@/types/shop';

interface LuxuryTemplateProps {
  shopData: ShopData;
  // Add other props as needed
}

const LuxuryTemplate: React.FC<LuxuryTemplateProps> = ({ shopData }) => {
  // Use the theme settings with proper fallback
  const themeSettings = shopData?.templateSettings || shopData?.themeSettings || defaultThemeSettings;
  
  return (
    <div className="luxury-template" 
      style={{ 
        '--primary-color': themeSettings.primaryColor,
        '--secondary-color': themeSettings.secondaryColor,
        '--font-family': themeSettings.fontFamily,
        '--text-color': themeSettings.textColor || '#111827'
      } as React.CSSProperties}
    >
      {/* Template content here */}
      <h1>Luxury Template</h1>
      <p>This is a placeholder for the luxury template.</p>
    </div>
  );
};

export default LuxuryTemplate;
