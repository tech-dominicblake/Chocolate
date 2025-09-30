import ActionButton from '@/components/prompts/ActionButton';
import { CodeInput } from '@/components/ui/CodeInput';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VerificationSuccess from './verificationSuccess';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete?: (code: string) => void;
  onResendCode?: () => void;
  onChangeEmail?: () => void;
  onSuccess?: () => void;
  showSuccessPage?: boolean;
}

export default function EmailVerification({
  email,
  onVerificationComplete,
  onResendCode,
  onChangeEmail,
  onSuccess,
  showSuccessPage = false,
}: EmailVerificationProps) {
  const [code, setCode] = useState('');

  const { isDark } = useThemeToggle();

  // Theme colors - matching the design
  const backgroundColor = '#F8F9FA'; // Light grey background
  const textColor = '#2C3E50'; // Dark grey text
  const cardBackground = '#FFFFFF'; // White for envelopes
  const primaryColor = '#8B5CF6'; // Purple accent
  const linkColor = '#8B5CF6'; // Purple links
  const inputBackground = '#F1F3F4'; // Light grey input background
  const inputBorder = '#E5E7EB'; // Light border

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeComplete = (completedCode: string) => {
    // Auto-trigger verification when all 6 digits are entered
    if (completedCode.length === 6 && onVerificationComplete) {
      onVerificationComplete(completedCode);
    }
  };

  const handleConfirm = () => {
    if (code.length !== 6) {
      Alert.alert('Incomplete Code', 'Please enter all 6 digits');
      return;
    }
    
    // Manual confirmation - trigger verification
    if (onVerificationComplete) {
      onVerificationComplete(code);
    }
  };

  const handleResendCode = () => {
    if (onResendCode) {
      onResendCode();
    } else {
      Alert.alert('Code Resent', 'A new verification code has been sent to your email');
    }
  };

  const handleChangeEmail = () => {
    if (onChangeEmail) {
      onChangeEmail();
    } else {
      Alert.alert('Change Email', 'Redirecting to email change page...');
    }
  };

  // Show success page if verification is successful
  if (showSuccessPage) {
    return (
      <VerificationSuccess
        onGoToDashboard={() => {
          // Call the onSuccess callback to navigate to main app
          if (onSuccess) {
            onSuccess();
          }
        }}
        onClose={() => {
          // Call the onSuccess callback to navigate to main app
          if (onSuccess) {
            onSuccess();
          }
        }}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View style={styles.messageBoxContainer}>
          <Image source={IMAGES.IMAGES.messageBox} style={styles.messageBox} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: textColor }]}>Verify your email</Text>
          {/* Instructions */}
          <Text style={[styles.instructions, { color: textColor }]}>
            Please enter the 6 digit code sent to{' '}
            <Text style={[styles.emailText, { color: textColor }]}>{email}</Text>
          </Text>
        </View>


        {/* Code input fields */}
        <View style={styles.codeContainer}>
          <CodeInput
            length={6}
            value={code}
            onChangeText={handleCodeChange}
            onComplete={handleCodeComplete}
            autoFocus={true}
          />
        </View>

      </View>

      <View style={styles.bottomContainer}>
        {/* Confirm button */}
        <View style={styles.buttonContainer}>
          <ActionButton
            title="CONFIRM"
            onPress={handleConfirm}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg3}
            color='#33358F'
          />
        </View>

        {/* Footer links */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor }]}>
            Didn't get a code?
          </Text>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={[styles.linkText, { color: linkColor }]}>RESEND CODE</Text>
            </TouchableOpacity>
            <Text style={[styles.separator, { color: textColor }]}>•</Text>
            <TouchableOpacity onPress={handleChangeEmail}>
              <Text style={[styles.linkText, { color: linkColor }]}>CHANGE EMAIL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 149,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  timeText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIcon: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2C3E50',
  },
  menuIcon: {
    width: 20,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#2C3E50',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 48,
  },
  mailTray: {
    width: 100,
    height: 75,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  envelope: {
    width: 60,
    height: 42,
    borderRadius: 6,
    position: 'absolute',
    transform: [{ rotate: '-8deg' }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  envelopeSecond: {
    transform: [{ rotate: '8deg' }],
    marginLeft: 12,
  },
  envelopeFlap: {
    width: 60,
    height: 18,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2C3E50',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
    color: '#2C3E50',
  },
  emailText: {
    fontWeight: '700',
  },
  codeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    marginBottom: 38,
  },
  confirmButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    gap: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  separator: {
    fontSize: 16,
    color: '#2C3E50',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    marginLeft: -34,
    width: 68,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2C3E50',
  },
  messageBox: {
    width: 160,
    height: 160,
  },
  messageBoxContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  bottomContainer: {
    marginTop: 'auto',
    paddingBottom: 48,
  },
});
