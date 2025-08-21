import { useGameStore } from '@/state/useGameStore';
import { useTheme } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatBubble } from '../../../../components/ChatBubble';

export default function GameALevelScreen() {
  const { colors } = useTheme();
  const { round, level } = useLocalSearchParams<{ round: string; level: string }>();
  const { completeTask, failTask } = useGameStore();

  const handleAccept = () => {
    completeTask();
    router.back();
  };

  const handleBail = () => {
    failTask();
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
          Round {round} • Level {level}
        </Text>

        <ChatBubble message="This is a sample challenge prompt. Replace with real content." />

        <View style={{ flex: 1, justifyContent: 'flex-end', gap: 10 }}>
          <TouchableOpacity
            onPress={handleAccept}
            style={{
              backgroundColor: colors.primary,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
              Let's Get Messy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBail}
            style={{
              backgroundColor: colors.primary,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
              Nah, I bail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}