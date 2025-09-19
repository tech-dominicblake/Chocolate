import { Stack } from 'expo-router';

export default function GameBLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chocoStats" />
      <Stack.Screen name="promptB" />
      <Stack.Screen name="statsB" />
      <Stack.Screen name="super" />
      <Stack.Screen name="round" />
    </Stack>
  );
}