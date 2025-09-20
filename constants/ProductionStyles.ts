import { Platform } from 'react-native';

// Utility function to handle production vs development styling differences
export const getProductionShadow = (baseShadow: any) => {
  if (Platform.OS === 'android') {
    // In production Android builds, shadows might not render properly
    // So we add explicit borders as fallback
    return {
      ...baseShadow,
      borderWidth: 1,
      borderColor: baseShadow.borderColor || '#E5E7EB',
    };
  }
  return baseShadow;
};

// Common shadow configurations that work in both dev and production
export const shadowStyles = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    // Add border for production
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Add border for production
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    // Add border for production
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
};

// Button-specific styles that work in production
export const buttonStyles = {
  primary: {
    borderWidth: 1,
    borderColor: '#E91E63',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#E53E3E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  speechBubble: {
    borderWidth: 1,
    borderColor: '#6366F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
};
