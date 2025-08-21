import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  width?: number;
  height?: number;
}

function ProgressBar({ progress, width = 200, height = 8 }: ProgressBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: colors.border,
        borderRadius: height / 2,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: colors.primary,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}
export default ProgressBar;