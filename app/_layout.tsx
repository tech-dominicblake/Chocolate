import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GameStatusProvider } from '@/contexts/GameStatusContext';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '../providers/QueryProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryProvider>
          <GameStatusProvider>
            <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Group */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            {/* Game Group */}
            <Stack.Screen name="(game)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </GameStatusProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}