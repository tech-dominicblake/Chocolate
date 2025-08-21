import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 24, textAlign: 'center' }}>
          Sign Up Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}