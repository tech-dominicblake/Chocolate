import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@user_data';
const EXPIRATION_KEY = '@user_data_expiration';
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

export interface StoredUserData {
  id: string;
  email: string;
  created_at: string;
  // Add any other user fields you want to store
}

export async function storeUserData(userData: StoredUserData): Promise<void> {
  try {
    const expirationDate = new Date(Date.now() + TWO_DAYS_MS).toISOString();
    
    await Promise.all([
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData)),
      AsyncStorage.setItem(EXPIRATION_KEY, expirationDate)
    ]);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

export async function getUserData(): Promise<StoredUserData | null> {
  try {
    const [userData, expiration] = await Promise.all([
      AsyncStorage.getItem(USER_STORAGE_KEY),
      AsyncStorage.getItem(EXPIRATION_KEY)
    ]);

    if (!userData || !expiration) {
      console.log('No user data or expiration found');
      return null;
    }

    const parsedUserData = JSON.parse(userData);
    
    // Validate required user data fields
    if (!parsedUserData.id || !parsedUserData.email) {
      console.log('Invalid user data structure');
      await clearUserData();
      return null;
    }

    // Check if data is expired
    if (new Date(expiration) < new Date()) {
      console.log('User data expired');
      await clearUserData();
      return null;
    }

    // Calculate remaining time
    const remainingTime = new Date(expiration).getTime() - new Date().getTime();
    console.log(`Session valid for ${Math.round(remainingTime / (1000 * 60 * 60))} hours`);

    return parsedUserData;
  } catch (error) {
    console.error('Error getting user data:', error);
    await clearUserData();
    return null;
  }
}

export async function clearUserData(): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.removeItem(USER_STORAGE_KEY),
      AsyncStorage.removeItem(EXPIRATION_KEY)
    ]);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}
