import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { tokens } from './tokens';

// Color palette based on login screenshot design - enhanced for Figma accuracy
const palette = {
  primary: {
    purple: '#8B5CF6', // Main purple for SIGN IN button - more vibrant
    lightPurple: '#E9D5FF', // Light purple for other buttons - softer
    darkPurple: '#6D28D9',
    barGrey: '#8994A3', // Dark purple text on light buttons - richer
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    lightGrey: '#F5F5F5', // Exact background from Figma screenshot
    grey: '#E0E0E0', // Exact border color from Figma screenshot
    darkGrey: '#6B7280', // Darker grey for some text
    inputBackground: '#E6E8EB',
    darkInputBackground: '#33373D',
    darkCardBackground: '#2D2F33',
    darkMessageGrey: '#454952'
  },
  accent: {
    yellow: '#FBBF24', // Logo background yellow - more vibrant
    orange: '#FB923C', // Lips orange - richer
    pink: '#F472B6', // Tongue pink - more saturated
    brown: '#92400E', // Chocolate brown - deeper
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
    // Base colors from login screenshot
    background: palette.neutral.lightGrey,
    text: palette.neutral.black,
    border: palette.neutral.grey,
    bar: palette.primary.barGrey,

    // UI Elements
    primary: palette.primary.purple,
    secondary: palette.primary.lightPurple,
    primaryText: '#191919', // White text on purple buttons
    secondaryText: palette.primary.darkPurple, // Dark purple text on light buttons

    // Cards & Containers
    card: palette.neutral.white,
    cardBorder: palette.neutral.grey,
    messageGrey: palette.neutral.white,

    // Login specific colors
    inputBackground: palette.neutral.inputBackground,
    inputBorder: palette.neutral.grey,
    inputText: '#191919', // Exact dark color from Figma selection colors
    placeholderText: palette.neutral.grey,
    linkText: palette.primary.purple,
    grey: palette.neutral.grey,
    cardBackground: palette.neutral.white,
    // Logo colors
    logoBackground: palette.accent.yellow,
    logoLips: palette.accent.orange,
    logoTongue: palette.accent.pink,
    logoChocolate: palette.accent.brown,
    logoBorder: palette.neutral.white,

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
    background: '#27282A', // Updated dark theme background
    text: palette.neutral.white,
    border: palette.neutral.darkGrey,

    // UI Elements
    primary: palette.primary.purple,
    secondary: palette.primary.lightPurple,
    primaryText: palette.neutral.white,
    secondaryText: palette.primary.darkPurple,
    bar: palette.primary.barGrey,

    // Cards & Containers
    card: palette.neutral.darkGrey,
    cardBorder: palette.neutral.darkGrey,
    messageGrey: palette.neutral.darkMessageGrey,

    // Login specific colors
    inputBackground: palette.neutral.darkInputBackground,
    inputBorder: palette.neutral.darkGrey,
    inputText: palette.neutral.white, // White text for dark theme
    placeholderText: '#676F7A', // Custom placeholder color for dark theme
    linkText: palette.primary.purple,
    grey: palette.neutral.grey,
    cardBackground: palette.neutral.darkCardBackground,
    // Logo colors
    logoBackground: palette.accent.yellow,
    logoLips: palette.accent.orange,
    logoTongue: palette.accent.pink,
    logoChocolate: palette.accent.brown,
    logoBorder: palette.neutral.darkGrey,

    // Required by React Navigation
    notification: palette.status.error,
  },
  tokens,
};

export type Theme = typeof lightTheme;
export type ThemeColors = keyof typeof lightTheme.colors;