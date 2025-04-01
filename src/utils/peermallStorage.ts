
import { ShopData } from '@/types/shop';

// Key for storing peermalls in localStorage
const PEERMALLS_STORAGE_KEY = 'peermall_shops';

// Get all peermalls from localStorage
export const getPeermalls = (): ShopData[] => {
  try {
    const storedPeermalls = localStorage.getItem(PEERMALLS_STORAGE_KEY);
    if (storedPeermalls) {
      return JSON.parse(storedPeermalls);
    }
    
    // Also check for individually stored peermall data (legacy format)
    const individualPeermall = localStorage.getItem('peermallShopData');
    if (individualPeermall) {
      const peermall = JSON.parse(individualPeermall);
      // If individual peermall exists but not in the list, add it
      if (!storedPeermalls) {
        // Save it to the proper format
        localStorage.setItem(PEERMALLS_STORAGE_KEY, JSON.stringify([peermall]));
        return [peermall];
      }
    }
  } catch (error) {
    console.error('Error getting peermalls from localStorage:', error);
  }
  return [];
};

// Add a new peermall to localStorage
export const addPeermall = (peermall: ShopData): void => {
  try {
    const peermalls = getPeermalls();
    
    // Check if peermall with the same URL already exists
    const exists = peermalls.some(p => p.shopUrl === peermall.shopUrl);
    if (exists) {
      console.error('Peermall with this URL already exists');
      return;
    }
    
    // Process data to include required fields for list display
    const processedPeermall = {
      ...peermall,
      location: peermall.location || peermall.address?.split(' ')[0] || '온라인',
      category: peermall.category || peermall.shopDescription?.split(' ')[0] || '일반',
      rating: peermall.rating || 5.0
    };
    
    // Add the new peermall
    peermalls.push(processedPeermall);
    localStorage.setItem(PEERMALLS_STORAGE_KEY, JSON.stringify(peermalls));
  } catch (error) {
    console.error('Error adding peermall to localStorage:', error);
  }
};

// Update an existing peermall in localStorage
export const updatePeermall = (updatedPeermall: ShopData): void => {
  try {
    const peermalls = getPeermalls();
    const index = peermalls.findIndex(p => p.shopUrl === updatedPeermall.shopUrl);
    
    if (index === -1) {
      console.error('Peermall not found');
      return;
    }
    
    // Process data to include required fields for list display
    const processedPeermall = {
      ...updatedPeermall,
      location: updatedPeermall.location || updatedPeermall.address?.split(' ')[0] || '온라인',
      category: updatedPeermall.category || updatedPeermall.shopDescription?.split(' ')[0] || '일반',
      rating: updatedPeermall.rating || 5.0
    };
    
    peermalls[index] = processedPeermall;
    localStorage.setItem(PEERMALLS_STORAGE_KEY, JSON.stringify(peermalls));
  } catch (error) {
    console.error('Error updating peermall in localStorage:', error);
  }
};

// Delete a peermall from localStorage
export const deletePeermall = (shopUrl: string): void => {
  try {
    const peermalls = getPeermalls();
    const updatedPeermalls = peermalls.filter(p => p.shopUrl !== shopUrl);
    localStorage.setItem(PEERMALLS_STORAGE_KEY, JSON.stringify(updatedPeermalls));
  } catch (error) {
    console.error('Error deleting peermall from localStorage:', error);
  }
};

// Get a specific peermall by URL
export const getPeermallByUrl = (shopUrl: string): ShopData | undefined => {
  const peermalls = getPeermalls();
  return peermalls.find(p => p.shopUrl === shopUrl);
};
