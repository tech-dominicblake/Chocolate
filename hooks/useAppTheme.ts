import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../providers/ThemeProvider';
import { darkTheme, lightTheme } from '../theme';

export function useAppTheme() {
  const theme = useTheme();
  return theme;
}

export function useAppThemeColor(colorName: keyof typeof lightTheme.colors) {
  const { isDark } = useThemeContext();
  return isDark ? darkTheme.colors[colorName] : lightTheme.colors[colorName];
}

export function useThemeToggle() {
  const { themeMode, setThemeMode, isDark, toggleTheme } = useThemeContext();
  return { themeMode, setThemeMode, isDark, toggleTheme };
}
