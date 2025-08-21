import { useTheme } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ChocolateGridProps {
  mode: 'A' | 'B';
  consumedChocolates: number[];
  onSelectChocolate: (id: number) => void;
}

// Mock chocolate data - replace with actual images and data
const chocolates = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  image: require('../../../assets/images/splash-icon.png'), // Replace with actual chocolate images
}));

function ChocolateGrid({ mode, consumedChocolates, onSelectChocolate }: ChocolateGridProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.grid}>
      {chocolates.map((chocolate) => (
        <TouchableOpacity
          key={chocolate.id}
          onPress={() => onSelectChocolate(chocolate.id)}
          disabled={consumedChocolates.includes(chocolate.id)}
          style={[
            styles.chocolate,
            {
              backgroundColor: colors.card,
              opacity: consumedChocolates.includes(chocolate.id) ? 0.5 : 1,
            },
          ]}
        >
          <Image source={chocolate.image} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
export default ChocolateGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  chocolate: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});