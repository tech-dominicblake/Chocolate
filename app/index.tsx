import { useAppPermissions } from '@/hooks/useAppPermissions';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { getUserData } from '@/utils/userStorage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<'/ageGate' | '/(auth)/sign-in' | null>(null);
  const { permissionsRequested, requestAllPermissions, isLoading: permissionsLoading } = useAppPermissions();

  useEffect(() => {
    checkAuthStateAndPermissions();
  }, []);

  const checkAuthStateAndPermissions = async () => {
    try {
      const userData = await getUserData();
      setRedirectTo(userData ? '/ageGate' : '/(auth)/sign-in');
      
      // Request permissions only on first launch after splash screen
      if (userData && !permissionsRequested && !permissionsLoading) {
        // Small delay to ensure splash screen is dismissed and app is fully loaded
        setTimeout(async () => {
          await requestAllPermissions();
        }, 1000);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setRedirectTo('/(auth)/sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  if (!redirectTo) return <Redirect href="/(auth)/sign-in" />;
  return <Redirect href={redirectTo} />;
}