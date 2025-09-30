import { useAppThemeColor, useThemeToggle } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  placeholder?: string;
  error?: boolean;
  showPasswordToggle?: boolean;
}

export const CustomInput = ({ placeholder, error, showPasswordToggle, ...props }: CustomInputProps) => {
  // Get theme-aware colors
  const backgroundColor = useAppThemeColor('inputBackground');
  const borderColor = useAppThemeColor('inputBorder');
  const textColor = useAppThemeColor('inputText');
  const { isDark } = useThemeToggle();

  // Password toggle state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Error state styles
  const errorBackgroundColor = isDark ? 'rgba(255, 68, 68, 0.1)' : 'rgba(255, 68, 68, 0.08)';
  const errorBorderColor = '#FF4444';

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // If showPasswordToggle is true, we control secureTextEntry internally
  // Otherwise, use the secureTextEntry from props
  const finalSecureTextEntry = showPasswordToggle ? !isPasswordVisible : props.secureTextEntry;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: error ? errorBackgroundColor : backgroundColor,
            borderColor: error ? errorBorderColor : borderColor,
            color: textColor,
            paddingRight: showPasswordToggle ? 50 : 16, // Add space for eye icon
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#676F7A' : '#808080'}
        {...props}
        secureTextEntry={finalSecureTextEntry}
      />
      {showPasswordToggle && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={isDark ? '#676F7A' : '#808080'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
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
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
});
