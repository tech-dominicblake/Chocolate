import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function GameLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="a" />
      <Stack.Screen name="b" />
    </Stack>
  );
}