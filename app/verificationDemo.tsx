import { Alert, StyleSheet, View } from 'react-native';
import EmailVerification from './emailVerification';

export default function VerificationDemo() {
  const handleVerificationComplete = (code: string) => {
    console.log('Verification code entered:', code);
    // The success page will show automatically after verification
  };

  const handleResendCode = () => {
    Alert.alert('Code Resent', 'A new verification code has been sent to your email');
  };

  const handleChangeEmail = () => {
    Alert.alert('Change Email', 'Redirecting to email change page...');
  };

  return (
    <View style={styles.container}>
      <EmailVerification
        email="john.doe@example.com"
        onVerificationComplete={handleVerificationComplete}
        onResendCode={handleResendCode}
        onChangeEmail={handleChangeEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

