import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useAppThemeColor } from '../../hooks/useAppTheme';

interface LoginButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
}

export const LoginButton = ({ title, variant = 'primary', onPress, ...props }: LoginButtonProps) => {
  const primaryColor = useAppThemeColor('primary');
  const secondaryColor = useAppThemeColor('secondary');
  const primaryTextColor = useAppThemeColor('primaryText');
  const secondaryTextColor = useAppThemeColor('secondaryText');

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: variant === 'primary' ? primaryColor : secondaryColor,
      shadowColor: variant === 'primary' ? primaryColor : secondaryColor,
    },
  ];

  const textStyle = [
    styles.buttonText,
    {
      color: variant === 'primary' ? primaryTextColor : secondaryTextColor,
    },
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress} 
      activeOpacity={0.9}
      {...props}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Enhanced shadows for better depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    // Better border radius for modern look
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
