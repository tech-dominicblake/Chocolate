import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../theme';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const colorScheme = useColorScheme();
  
  return (
    <NavigationThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </NavigationThemeProvider>
  );
}