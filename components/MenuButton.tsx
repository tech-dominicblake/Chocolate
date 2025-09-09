import { useAppThemeColor } from '@/hooks/useAppTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface MenuButtonProps {
  onPress: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => {
  const barGrey = useAppThemeColor('bar');

  return (
    <TouchableOpacity onPress={onPress} style={styles.menuButton}>
      <View style={styles.menuIcon}>
        <View style={[styles.menuLine, { backgroundColor: barGrey }]} />
        <View style={[styles.menuLine, { backgroundColor: barGrey }]} />
        <View style={[styles.menuLine, { backgroundColor: barGrey }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
});
