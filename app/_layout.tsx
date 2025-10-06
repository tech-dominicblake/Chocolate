import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
          <Stack screenOptions={{ headerShown: false }}>
            {/* Default redirect to sign-in */}
            <Stack.Screen name="index" />
            
            {/* Auth Group */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            
            {/* Game Group */}
            <Stack.Screen name="(game)" options={{ headerShown: false }} />
            
            {/* Other screens */}
            <Stack.Screen name="ageGate" options={{ headerShown: false }} />
            <Stack.Screen name="languageSelection" options={{ headerShown: false }} />
            <Stack.Screen name="userInfo" options={{ headerShown: false }} />
            <Stack.Screen name="relationship" options={{ headerShown: false }} />
            <Stack.Screen name="boyAvatarSelection" options={{ headerShown: false }} />
            <Stack.Screen name="girlAvatarSelection" options={{ headerShown: false }} />
            <Stack.Screen name="startPage" options={{ headerShown: false }} />
            <Stack.Screen name="gameRules" options={{ headerShown: false }} />
            <Stack.Screen name="gameSelection" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ headerShown: false }} />
            <Stack.Screen name="aboutPage" options={{ headerShown: false }} />
            <Stack.Screen name="final" options={{ headerShown: false }} />
            <Stack.Screen name="finalChoco" options={{ headerShown: false }} />
            <Stack.Screen name="endPage" options={{ headerShown: false }} />
            <Stack.Screen name="congrats" options={{ headerShown: false }} />
            <Stack.Screen name="congratsChoco" options={{ headerShown: false }} />
            <Stack.Screen name="experienceNoteA" options={{ headerShown: false }} />
            <Stack.Screen name="experienceNoteB" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          {/* <Toast
            config={{
              center: (props: BaseToastProps) => <CustomToast {...props} />,
            }}
          /> */}
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}