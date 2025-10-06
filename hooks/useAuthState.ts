import { getUserData } from '@/utils/userStorage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export function useAuthState() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await getUserData();
      
      if (userData) {
        // User data exists and is not expired
        router.replace('/ageGate');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading };
}
