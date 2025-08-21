import { useGameStore } from '@/state/useGameStore';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const relationshipStages = [
  { id: 'recentlyMet', title: 'Recently Met' },
  { id: 'gettingSerious', title: 'Getting Serious' },
  { id: 'weHateEachOther', title: 'We Hate Each Other' },
];

export default function GameSelectionScreen() {
  const { colors } = useTheme();
  const { setStage, setMode } = useGameStore();

  const handleStageSelect = (stage: string) => {
    setStage(stage as any);
    router.push('/(game)/a');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
          Select Your Relationship Stage
        </Text>

        <View style={{ gap: 10 }}>
          {relationshipStages.map((stage) => (
            <TouchableOpacity
              key={stage.id}
              onPress={() => handleStageSelect(stage.id)}
              style={{
                backgroundColor: colors.card,
                padding: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.text, fontSize: 18 }}>
                {stage.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}