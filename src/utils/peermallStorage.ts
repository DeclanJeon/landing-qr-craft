
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
    
    // Add the new peermall
    peermalls.push(peermall);
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
    
    peermalls[index] = updatedPeermall;
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
