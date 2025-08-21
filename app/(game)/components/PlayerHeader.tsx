import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';

interface PlayerHeaderProps {
  playerName: string;
  round: number;
  level: number;
}

export function PlayerHeader({ playerName, round, level }: PlayerHeaderProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18 }}>{playerName}</Text>
      <Text style={{ color: colors.text, fontSize: 16 }}>
        Round {round} • Level {level}
      </Text>
    </View>
  );
}