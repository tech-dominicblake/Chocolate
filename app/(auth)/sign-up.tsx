import { CustomInput } from '@/components/ui/CustomInput';
import { IMAGES } from '@/constants';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionButton from '../../components/prompts/ActionButton';
import { useAppThemeColor } from '../../hooks/useAppTheme';

export default function SignUpScreen() {
  const [email, setEmail] = useState('example2gmail.com');
  const [name, setName] = useState('nickname');
  const [password, setPassword] = useState('*********');
  const [confirmPassword, setConfirmPassword] = useState('');

  const background = useAppThemeColor('background');
  const textColor = useAppThemeColor('text');
  const linkColor = useAppThemeColor('linkText');
  const greyText = useAppThemeColor('grey');

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error);
        return;
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic
  };

  const handleBackToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Registration Title */}
          <Text style={[styles.title, { color: textColor }]}>Registration</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <CustomInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              value={name}
              onChangeText={setName}
              placeholder="Nickname"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ActionButton
              title="SIGN UP"
              onPress={handleSignUp}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg3}
              color='#33358F'
            />

            {/* OR Divider */}
            <View style={styles.orDivider}>
              <Text style={styles.orText}>OR</Text>
            </View>

            <ActionButton
              title="REGISTER WITH GOOGLE"
              onPress={handleGoogleSignUp}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg2}
              color='#5556A3'
            />
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: '#8994A3' }]}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={handleBackToSignIn}>
              <Text style={[styles.footerLink, { color: '#7E80F4' }]}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 127,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 46, // Increased spacing
    marginTop: 20,
  },
  title: {
    fontSize: 40, // Increased font size
    fontWeight: 'bold', // Bolder font weight
    textAlign: 'center',
    fontFamily: 'Inter',
    marginBottom: 32, // Increased spacing
    letterSpacing: -0.5, // Better letter spacing
  },
  inputContainer: {
    marginBottom: 30,
    gap: 16 // Increased spacing
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    marginBottom: 12, // Better spacing
  },
  buttonContainer: {
    marginBottom: 84, // Increased spacing
    paddingHorizontal: 0,
    gap: 16 // Remove horizontal padding since ActionButton has its own
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500', // Better font weight
    textAlign: 'center',
    marginBottom: 12, // Better spacing
    letterSpacing: 0.2, // Better letter spacing
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 16,
    fontWeight: '700', // Bolder font weight
    letterSpacing: 0.3, // Better letter spacing
  },
  footerSeparator: {
    fontSize: 16,
    marginHorizontal: 12, // Better spacing
    fontWeight: '500',
  },
  orDivider: {
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8994A3',
    textAlign: 'center',
  },
});