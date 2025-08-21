import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { tokens } from './tokens';

// Color palette based on Figma design
const palette = {
  primary: {
    pink: '#FF1493',
    blue: '#4169E1',
    red: '#DC143C',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F7F7FA',
    gray100: '#E7E7ED',
    gray200: '#D1D1DB',
    gray800: '#1F1F1F',
    gray900: '#0E0E10',
  },
  status: {
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF0000',
  },
};

export const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    // Base colors
    background: palette.neutral.gray50,
    text: palette.neutral.gray900,
    border: palette.neutral.gray100,
    
    // UI Elements
    primary: palette.primary.pink,
    secondary: palette.primary.blue,
    danger: palette.primary.red,
    
    // Cards & Containers
    card: palette.neutral.white,
    cardBorder: palette.neutral.gray100,
    
    // Game specific
    chocolateBox: palette.neutral.white,
    chocolateBorder: palette.neutral.gray200,
    prompt: palette.neutral.white,
    promptBorder: palette.neutral.gray100,

    // Required by React Navigation
    notification: palette.status.error,
  },
  tokens,
};

export const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    // Base colors
    background: palette.neutral.gray900,
    text: palette.neutral.white,
    border: palette.neutral.gray800,
    
    // UI Elements
    primary: palette.primary.pink,
    secondary: palette.primary.blue,
    danger: palette.primary.red,
    
    // Cards & Containers
    card: palette.neutral.gray800,
    cardBorder: palette.neutral.gray800,
    
    // Game specific
    chocolateBox: palette.neutral.gray800,
    chocolateBorder: palette.neutral.gray800,
    prompt: palette.neutral.gray800,
    promptBorder: palette.neutral.gray800,

    // Required by React Navigation
    notification: palette.status.error,
  },
  tokens,
};

export type Theme = typeof lightTheme;
export type ThemeColors = keyof typeof lightTheme.colors;