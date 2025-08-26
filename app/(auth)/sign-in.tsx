import { IMAGES } from '@/constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
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
import { Logo } from '../../components/Logo';
import ActionButton from '../../components/prompts/ActionButton';
import { CustomInput } from '../../components/ui/CustomInput';
import { useAppThemeColor } from '../../hooks/useAppTheme';

export default function SignInScreen() {
  const [email, setEmail] = useState('emailtemplate@gmail.com');
  const [password, setPassword] = useState('');

  const background = useAppThemeColor('background');
  const textColor = useAppThemeColor('text');
  const linkColor = useAppThemeColor('linkText');
  const greyText = useAppThemeColor('grey');



  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password');
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/sign-up');
  };

  const handleAccountBenefits = () => {
    // Handle account benefits logic
    console.log('Account benefits');
  };

  const handleSignIn = () => {
    // Handle sign in logic and navigate to relationship page
    console.log('Sign in:', { email, password });
    router.push('/startPage');
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic and navigate to relationship page
    console.log('Google sign in');
    router.push('/userInfo');
  };

  const handleGuestPlay = () => {
    // Handle guest play logic and navigate to relationship page
    console.log('Guest play');
    router.push('/ageGate');
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
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Logo size={120} />
          </View>

          {/* Login Title */}
          <Text style={[styles.title, { color: textColor }]}>Login</Text>

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

            <View style={styles.passwordContainer}>
              <CustomInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={[styles.forgotPassword]}>
                  FORGOT PASSWORD?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ActionButton
              title="SIGN IN"
              onPress={handleSignIn}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg3}
              color='#33358F'
            />
            <ActionButton
              title="SIGN IN WITH GOOGLE"
              onPress={handleGoogleSignIn}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg2}
              color='#5556A3'
            />
            <ActionButton
              title="PLAY AS GUEST"
              color='#5556A3'
              onPress={handleGuestPlay}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg1}
            />
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: '#8994A3' }]}>
              Don't have an account yet?
            </Text>

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={[styles.footerLink, { color: '#7E80F4' }]}>
                  CREATE ACCOUNT
                </Text>
              </TouchableOpacity>

              <Text style={[styles.footerSeparator, { color: greyText }]}> • </Text>

              <TouchableOpacity onPress={handleAccountBenefits}>
                <Text style={[styles.footerLink, { color: '#7E80F4' }]}>
                  ACCOUNT BENEFITS
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: 40,
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
    marginBottom: 32, // Increased spacing
  },
  passwordContainer: {
    position: 'relative',
    marginTop: 16,
  },
  passwordInput: {
    marginBottom: 12, // Better spacing
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '700', // Bolder font weight
    textAlign: 'right',
    letterSpacing: 0.3, // Better letter spacing
    color: '#8994A3'
  },
  buttonContainer: {
    marginBottom: 48, // Increased spacing
    paddingHorizontal: 0, // Remove horizontal padding since ActionButton has its own
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
});