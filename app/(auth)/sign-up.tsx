import { CustomInput } from '@/components/ui/CustomInput';
import { IMAGES } from '@/constants';
import { googleAuth } from '@/lib/api/expoGoogleAuth';
import { emailVerificationService } from '@/lib/api/supabase';
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
import ActionButton from '../../components/prompts/ActionButton';
import { useAppThemeColor } from '../../hooks/useAppTheme';
import EmailVerification from '../emailVerification';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Email verification state
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  
  // Google sign-up loading state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { promptAsync } = googleAuth.useGoogleAuth();
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Animation refs for error ringing
  const emailRingAnimation = useRef(new Animated.Value(1)).current;
  const nameRingAnimation = useRef(new Animated.Value(1)).current;
  const passwordRingAnimation = useRef(new Animated.Value(1)).current;
  const confirmPasswordRingAnimation = useRef(new Animated.Value(1)).current;

  const background = useAppThemeColor('background');
  const textColor = useAppThemeColor('text');
  const linkColor = useAppThemeColor('linkText');
  const greyText = useAppThemeColor('grey');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, contains uppercase, lowercase, and number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Clear all errors
  const clearErrors = () => {
    setEmailError('');
    setNameError('');
    setPasswordError('');
    setConfirmPasswordError('');
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

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await promptAsync();
      
      if (response?.type === 'success') {
        const { data, error } = await googleAuth.signInWithGoogle(response);
        
        if (error) throw error;
        
        if (data?.user) {
        
          // Navigate to age gate after successful registration
          router.push('/ageGate');
        }
      } else {
        throw new Error('Google sign in was cancelled or failed');
      }
    } catch (error: any) {
      console.error('Google Registration Error:', error);
     
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignUp = async () => {
    // Clear previous errors
    clearErrors();

    let hasErrors = false;

    // Required fields validation
    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    }
    if (!name.trim()) {
      setNameError('Name is required');
      hasErrors = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasErrors = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      hasErrors = true;
    }

    // Email format validation (only if email is not empty)
    if (email.trim() && !validateEmail(email)) {
      setEmailError('ERROR! PLEASE, CHECK YOUR EMAIL');
      hasErrors = true;
    }

    // Password strength validation (only if password is not empty)
    if (password && !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters with uppercase, lowercase, and number');
      hasErrors = true;
    }

    // Password confirmation validation (only if both passwords are not empty)
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasErrors = true;
    }

    // If there are validation errors, ring the error inputs and don't proceed
    if (hasErrors) {
      if (!email.trim() || (email.trim() && !validateEmail(email))) {
        ringInput(emailRingAnimation);
      }
      if (!name.trim()) {
        ringInput(nameRingAnimation);
      }
      if (!password || (password && !validatePassword(password))) {
        ringInput(passwordRingAnimation);
      }
      if (!confirmPassword || (password && confirmPassword && password !== confirmPassword)) {
        ringInput(confirmPasswordRingAnimation);
      }
      return;
    }

    // If validation passes, show email verification
    setIsVerifyingEmail(true);
    
    // Send verification code to email
    try {
      const result = await emailVerificationService.sendVerificationCode(email.trim());
      
      if (result.success) {
        
        setShowEmailVerification(true);
      
      } else {
        setEmailError(result.error || 'Failed to send verification code');
        ringInput(emailRingAnimation);
        setIsVerifyingEmail(false);
      }
    } catch (error) {
      setEmailError('Failed to send verification code');
      ringInput(emailRingAnimation);
      setIsVerifyingEmail(false);
    }
  };

  // Handle email verification completion
  const handleEmailVerificationComplete = async (verificationCode: string) => {
    try {
      // Verify the OTP code
      const verificationResult = await emailVerificationService.verifyCode(email, verificationCode);
      
      if (!verificationResult.success) {
      
        return;
      }

      // If verification is successful, update user profile with name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          name: name.trim()
        }
      });

      if (updateError) {
        console.log('Error updating user profile:', updateError);
        // Don't fail the verification, just log the error
      }

      // User is now automatically signed in after successful verification
      // Show success page
      setShowVerificationSuccess(true);
      
    } catch (err: any) {
    
      setShowEmailVerification(false);
      setIsVerifyingEmail(false);
    }
  };

  // Handle resend verification code
  const handleResendVerificationCode = async () => {
    try {
      const result = await emailVerificationService.sendVerificationCode(email);
      
      if (result.success) {
      
      } else {
        
      }
    } catch (error) {
     
    }
  };

  // Handle change email
  const handleChangeEmail = () => {
    setShowEmailVerification(false);
    setIsVerifyingEmail(false);
  };


  const handleBackToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <>
      {showEmailVerification ? (
        <EmailVerification
          email={email}
          onVerificationComplete={handleEmailVerificationComplete}
          onResendCode={handleResendVerificationCode}
          onChangeEmail={handleChangeEmail}
          showSuccessPage={showVerificationSuccess}
          onSuccess={() => {
            // User is already signed in, navigate to main app
            router.push('/(tabs)/home');
          }}
        />
      ) : (
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
                <Animated.View style={{ transform: [{ scale: emailRingAnimation }] }}>
                  <CustomInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!emailError}
                  />
                </Animated.View>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}

                <Animated.View style={{ transform: [{ scale: nameRingAnimation }] }}>
                  <CustomInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Nickname"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!nameError}
                  />
                </Animated.View>
                {nameError ? (
                  <Text style={styles.errorText}>{nameError}</Text>
                ) : null}

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
                  />
                </Animated.View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <Animated.View style={{ transform: [{ scale: confirmPasswordRingAnimation }] }}>
                  <CustomInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!confirmPasswordError}
                    showPasswordToggle={true}
                  />
                </Animated.View>
                {confirmPasswordError ? (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <ActionButton
                  title="SIGN UP"
                  onPress={handleSignUp}
                  variant="primary"
                  backgroundImage={IMAGES.IMAGES.buttonBg3}
                  color='#33358F'
                  loading={isVerifyingEmail}
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
                  loading={isGoogleLoading}
                  disabled={isGoogleLoading || isVerifyingEmail}
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
      )}
    </>
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
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
});