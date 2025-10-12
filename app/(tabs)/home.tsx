import { Redirect } from 'expo-router';

// This is a placeholder home screen - redirect to main menu or sign-in
export default function HomeScreen() {
  return <Redirect href="/menu" />;
}

