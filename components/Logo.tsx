import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAppThemeColor } from '@/hooks/useAppTheme';

export const Logo = ({ size = 120 }: { size?: number }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image 
        source={require('../assets/images/image5.png')} 
        style={[styles.logoImage, { width: size, height: size, borderColor: useAppThemeColor('logoBorder') }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    borderRadius: 999,
  },
});
