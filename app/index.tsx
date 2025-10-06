import { ThemeProvider } from '@/providers/ThemeProvider';
import { getUserData } from '@/utils/userStorage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<'/ageGate' | '/(auth)/sign-in' | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await getUserData();
      setRedirectTo(userData ? '/ageGate' : '/(auth)/sign-in');
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