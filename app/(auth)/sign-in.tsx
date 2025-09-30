import { IMAGES } from '@/constants';
import { googleAuth } from '@/lib/api/expoGoogleAuth';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Logo } from '../../components/Logo';
import ActionButton from '../../components/prompts/ActionButton';
import { CustomInput } from '../../components/ui/CustomInput';
import { useAppThemeColor } from '../../hooks/useAppTheme';

export default function SignInScreen() {
  const [email, setEmail] = useState('hushhexperience@gmail.com');
  const [password, setPassword] = useState('password1');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Loading states
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  
  // Animation refs for error ringing
  const emailRingAnimation = useRef(new Animated.Value(1)).current;
  const passwordRingAnimation = useRef(new Animated.Value(1)).current;

  const background = useAppThemeColor('background');
  const textColor = useAppThemeColor('text');
  const linkColor = useAppThemeColor('linkText');
  const greyText = useAppThemeColor('grey');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 4 characters, contains lowercase and number
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(password);
  };

  // Clear all errors
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  // Ring animation function
  const ringInput = (animation: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };



  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/sign-up');
  };

  const handleAccountBenefits = () => {
    // Handle account benefits logic
  };

  const handleSignIn = async () => {
    
    // Clear previous errors
    clearErrors();

    let hasErrors = false;

    // Required fields validation
    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasErrors = true;
    }

    // Email format validation (only if email is not empty)
    if (email.trim() && !validateEmail(email)) {
      setEmailError('ERROR! PLEASE, CHECK YOUR EMAIL');
      hasErrors = true;
    }

    // Password validation (only if password is not empty)
    if (password && !validatePassword(password)) {
      setPasswordError('Password must be at least 4 characters with lowercase and number');
      hasErrors = true;
    }

    // If there are validation errors, ring the error inputs and don't proceed
    if (hasErrors) {
      if (!email.trim() || (email.trim() && !validateEmail(email))) {
        ringInput(emailRingAnimation);
      }
      if (!password || (password && !validatePassword(password))) {
        ringInput(passwordRingAnimation);
      }
      return;
    }

    // Start loading
    setIsSignInLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        // Handle different types of errors
        if (error.message.includes('Invalid login credentials')) {
          setEmailError('Invalid email or password');
          setPasswordError('Invalid email or password');
          ringInput(emailRingAnimation);
          ringInput(passwordRingAnimation);
        } else if (error.message.includes('Email not confirmed')) {
          setEmailError('Please confirm your email address');
          ringInput(emailRingAnimation);
        } else {
          setEmailError('Sign in failed. Please try again.');
          ringInput(emailRingAnimation);
        }
      } else if (data.user) {
        Toast.show({
          type: "bottom",
          text1: "Welcome back!",
          text2: "Successfully signed in",
          position: "bottom",
          visibilityTime: 2500,
        });
        router.push('/ageGate');
      }
    } catch (err: any) {
      setEmailError('Network error. Please check your connection.');
      ringInput(emailRingAnimation);
    } finally {
      // Stop loading
      setIsSignInLoading(false);
    }
  };

    // Get Google Auth hook
  const { request, response, promptAsync } = googleAuth.useGoogleAuth();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      // First, prompt the user to sign in with Google
      await promptAsync();
      
      if (response?.type === 'success') {
        // Then sign in with Supabase using the Google token
        const { data, error } = await googleAuth.signInWithGoogle(response);
        
        if (error) {
          Toast.show({
            type: "error",
            text1: "Google Sign In Failed",
            text2: error,
            position: "bottom",
            visibilityTime: 3000,
          });
          return;
        }

        if (data) {
          Toast.show({
            type: "success",
            text1: "Welcome back!",
            text2: "Successfully signed in with Google",
            position: "bottom",
            visibilityTime: 2500,
          });
          router.push('/ageGate');
        }
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Sign In Failed",
        text2: "An unexpected error occurred",
        position: "bottom",
        visibilityTime: 3000,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGuestPlay = async () => {
    setIsGuestLoading(true);
    try {
      // Handle guest play logic and navigate to relationship page
      router.push('/ageGate');
    } finally {
      setIsGuestLoading(false);
    }
  };

  // Check if any button is loading
  const isAnyButtonLoading = isSignInLoading || isGoogleLoading || isGuestLoading;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isAnyButtonLoading}
          pointerEvents={isAnyButtonLoading ? 'none' : 'auto'}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Logo size={120} />
          </View>

          {/* Login Title */}
          <Text style={[styles.title, { color: textColor }]}>Login</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Animated.View style={{ transform: [{ scale: emailRingAnimation }] }}>
              <CustomInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={!!emailError}
                editable={!isAnyButtonLoading}
              />
            </Animated.View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <View style={styles.passwordContainer}>
              <Animated.View style={{ transform: [{ scale: passwordRingAnimation }] }}>
                <CustomInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={!!passwordError}
                  showPasswordToggle={true}
                  editable={!isAnyButtonLoading}
                />
              </Animated.View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <TouchableOpacity 
                onPress={handleForgotPassword}
                disabled={isAnyButtonLoading}
                style={{ opacity: isAnyButtonLoading ? 0.5 : 1 }}
              >
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
              loading={isSignInLoading}
              disabled={isAnyButtonLoading}
            />
            <ActionButton
              title="SIGN IN WITH GOOGLE"
              onPress={handleGoogleSignIn}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg2}
              color='#5556A3'
              loading={isGoogleLoading}
              disabled={isAnyButtonLoading}
            />
            <ActionButton
              title="PLAY AS GUEST"
              color='#5556A3'
              onPress={handleGuestPlay}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg1}
              loading={isGuestLoading}
              disabled={isAnyButtonLoading}
            />
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: '#8994A3' }]}>
              Don't have an account yet?
            </Text>

            <View style={styles.footerLinks}>
            <TouchableOpacity 
              onPress={handleCreateAccount}
              disabled={isAnyButtonLoading}
              style={{ opacity: isAnyButtonLoading ? 0.5 : 1 }}
            >
              <Text style={[styles.footerLink, { color: '#7E80F4' }]}>
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>

            <Text style={[styles.footerSeparator, { color: greyText }]}> • </Text>

            <TouchableOpacity 
              onPress={handleAccountBenefits}
              disabled={isAnyButtonLoading}
              style={{ opacity: isAnyButtonLoading ? 0.5 : 1 }}
            >
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
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
});