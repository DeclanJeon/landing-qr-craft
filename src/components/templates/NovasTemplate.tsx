
// Ensure NovasHeader accepts all the necessary props
interface NovasHeaderProps {
  shopName: string;
  shopUrl: string;
  logoUrl?: string;
  logoText?: string;
  logoTextStyle?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  themeSettings?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    borderRadius?: string;
    skin?: string;
    accentColor?: string;
    textColor?: string;
    cardStyle?: string;
    buttonStyle?: string;
    headerStyle?: string;
    luxuryEffects?: boolean;
    animations?: string;
  };
  page?: string;
}

// Then pass all necessary props to the NovasHeader component
<NovasHeader 
  shopName={shopData.shopName}
  shopUrl={shopUrl || ''}
  logoUrl={shopData.logoUrl}
  logoText={shopData.logoText}
  logoTextStyle={shopData.logoTextStyle}
  themeSettings={shopData.themeSettings || defaultThemeSettings}
  page={page || 'home'}
/>
