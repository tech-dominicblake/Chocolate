import { useThemeContext } from '@/providers/ThemeProvider';
import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

interface ConsumeTickProps {
  gender: 'her' | 'him';
}

export default function ConsumeTick({ gender = 'him' }: ConsumeTickProps) {
const {isDark} = useThemeContext();

  return (
    <View style={[styles.container]}>
      <View style={[styles.badge, { backgroundColor: gender==="her" ? '#EB7AAF' : '#7E80F4', borderColor: isDark ? '#27272B' : '#F5F5F5' }]}>
        <Check 
          size={26 * 0.6} 
          color={!isDark ? '#FFF' : '#000'}
          strokeWidth={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
