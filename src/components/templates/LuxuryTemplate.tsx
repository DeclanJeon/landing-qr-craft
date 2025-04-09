
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

// When accessing theme settings:
const themeSettings = shopData.templateSettings || shopData.themeSettings || defaultThemeSettings;
