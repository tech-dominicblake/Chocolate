import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleNavigate = () => {
    router.navigate('/(game)/prompt1')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleNavigate}>
          <Text style={{ color: colors.text, fontSize: 24, textAlign: 'center' }}>
            Sign In Screen
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}