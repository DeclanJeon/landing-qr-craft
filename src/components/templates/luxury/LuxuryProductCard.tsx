
// Create a helper function to safely convert prices to numbers
const getNumericPrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  // Remove non-numeric characters (like commas, currency symbols) and convert to number
  return parseFloat(price.replace(/[^\d.]/g, ''));
};

// Then replace all price calculations with this safer method
const originalPrice = getNumericPrice(product.originalPrice || product.price);
const currentPrice = getNumericPrice(product.price);
const discountPercentage = product.originalPrice ? 
  Math.round(((getNumericPrice(product.originalPrice) - getNumericPrice(product.price)) / getNumericPrice(product.originalPrice)) * 100) : 0;

// For product object creation:
const productWithImage = {
  ...product,
  image: product.imageUrl // Ensure image property is set from imageUrl
};
