import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlayScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center', gap: 20 }}>
        <TouchableOpacity
          onPress={() => router.push('/(game)/a/prompt1')}
          style={{
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
            Game A - Sequential
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(game)/b/chocoStats')}
          style={{
            backgroundColor: '#EC4899', // Pink color
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
            Game B - Free Choice
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}