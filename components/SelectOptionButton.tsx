import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectOptionButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export const SelectOptionButton: React.FC<SelectOptionButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => {
  const { isDark } = useThemeContext();
  const backgroundColor = useAppThemeColor('background');

  return (
    <TouchableOpacity
      style={[
        styles.gameOption,
        isDark && { backgroundColor: '#373852' },
        isSelected && styles.selectedGame,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[
        styles.radioButton,
        isDark && { borderColor: '#7A7CCC', backgroundColor: 'transparent' },
        isSelected && styles.selectedRadio,
      ]}>
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark} />
          </View>
        )}
      </View>
      <Text style={[
        styles.gameText,
        isDark && { color: '#7A7CCC' },
        isSelected && styles.selectedGameText,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8D8F0',
    height: 80,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedGame: {
    backgroundColor: '#7E80F4',
    outlineColor: '#7E80F4',
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineOffset: 4,
  },
  radioButton: {
    position: 'absolute',
    left: 26,
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#6A6CCC',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectedRadio: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFF',
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 13,
    height: 8,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#7E80F4',
    transform: [{ rotate: '-45deg' }],
  },
  gameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6A6CCC',
    textAlign: 'center',
  },
  selectedGameText: {
    color: '#FFF',
  },
});
