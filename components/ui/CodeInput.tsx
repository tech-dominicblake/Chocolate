import { useThemeToggle } from '@/hooks/useAppTheme';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface CodeInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  length?: number;
  value?: string;
  onChangeText?: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
}

export const CodeInput = ({
  length = 6, // Changed to 6 for verification
  value = '',
  onChangeText,
  onComplete,
  autoFocus = true,
  ...props
}: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { isDark } = useThemeToggle();

  // Theme colors - matching the design
  const focusedInputBackground = 'rgba(126, 128, 244, 0.06)'; // 6% opacity of #7E80F4 for focused
  const defaultInputBackground = '#E6E8EB'; // Light grey for unfocused
  const unfocusedBorder = '#CAD3E0'; // Light border for unfocused inputs
  const primaryColor = '#8B5CF6'; // Purple accent
  const textColor = '#2C3E50'; // Dark grey text

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    // Update internal state when external value changes
    if (value !== code.join('')) {
      const newCode = value.split('').slice(0, length);
      while (newCode.length < length) {
        newCode.push('');
      }
      setCode(newCode);
    }
  }, [value, length]);

  const handleCodeChange = (value: string, index: number) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setActiveIndex(index);

    // Notify parent component
    const fullCode = newCode.join('');
    onChangeText?.(fullCode);

    // Auto-focus next input if current input has value
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled and notify completion
    if (newCode.every(digit => digit !== '') && onComplete) {
      onComplete(fullCode);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getInputStyle = (index: number) => {
    const isActive = activeIndex === index;
    const hasValue = code[index] !== '';
    const isLastInserted = hasValue && index === activeIndex;

    return [
      styles.input,
        {
          backgroundColor: isActive ? focusedInputBackground : defaultInputBackground,
          borderColor: isActive || isLastInserted ? primaryColor : unfocusedBorder,
          borderWidth: isActive || isLastInserted ? 2 : 1,
          color: textColor,
        },
      // Special styling for the last inserted input
      isLastInserted && styles.lastInsertedInput,
    ];
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          style={getInputStyle(index)}
          value={digit}
          onChangeText={(value) => handleCodeChange(value, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => setActiveIndex(index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="•"
          placeholderTextColor={isDark ? '#676F7A' : '#808080'}
          selectionColor="transparent"
          underlineColorAndroid="transparent"
          {...props}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 12,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    // Remove any default text input styling
    outline: 'none',
  },
  lastInsertedInput: {
    // Enhanced styling for the last inserted input
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ scale: 1.02 }],
  },
});

