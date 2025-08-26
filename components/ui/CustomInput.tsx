import { useAppThemeColor, useThemeToggle } from '@/hooks/useAppTheme';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  placeholder?: string;
}

export const CustomInput = ({ placeholder, ...props }: CustomInputProps) => {
  // Get theme-aware colors
  const backgroundColor = useAppThemeColor('inputBackground');
  const borderColor = useAppThemeColor('inputBorder');
  const textColor = useAppThemeColor('inputText');
  const { isDark } = useThemeToggle();

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor,
          borderColor,
          color: textColor,
        }
      ]}
      placeholder={placeholder}
      placeholderTextColor={isDark ? '#676F7A' : '#808080'} // Dark theme: #676F7A, Light theme: original #808080
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 52, // Exact height from Figma: 52px
    width: '100%', // Full width to match Figma 358px
    borderWidth: 1, // Thin border as shown in Figma
    borderRadius: 10, // No rounded corners - flat design
    paddingHorizontal: 16, // Internal padding for text
    paddingVertical: 0, // No vertical padding
    fontSize: 16,
    fontWeight: '400', // Regular weight as shown in Figma
    textAlignVertical: 'center',
  },
});
