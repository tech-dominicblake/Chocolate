import BasicInput from '@/components/ui/BasicInput';
import { useTheme } from '@react-navigation/native';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 24, textAlign: 'center' }}>
          It's tension you can taste
        </Text>
        <Text style={{ color: colors.text, fontSize: 16, textAlign: 'center', marginTop: 10 }}>
          Welcome to HUSHH
        </Text>
        <BasicInput value='I am a Basic Input Component.' onChange={() => { }} />
        <TextInput value='fdfdfd' />
      </View>
    </SafeAreaView>
  );
}