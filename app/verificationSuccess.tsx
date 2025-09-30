import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface VerificationSuccessProps {
  onGoToDashboard?: () => void;
  onClose?: () => void;
}

export default function VerificationSuccess({
  onGoToDashboard,
  onClose,
}: VerificationSuccessProps) {
  const { isDark } = useThemeToggle();

  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      router.push('/ageGate');
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />


      {/* Main content */}
      <View style={styles.content}>
        {/* Envelope with heart icon */}
        <Image source={IMAGES.IMAGES.verify_success} style={styles.messageBox} />
        {/* Verification success box */}
        <View style={styles.verificationBox}>
          <Text style={styles.verifiedText}>Verified!</Text>
          <Text style={styles.successMessage}>
            Yahoo! You have successfully verified the account
          </Text>
        </View>

        {/* Go to dashboard button */}
      </View>
<View style={styles.buttonContainer}>
        <ActionButton
          title='GO TO DASHBOARD'
          onPress={handleGoToDashboard}
          variant="primary"
          backgroundImage={IMAGES.IMAGES.buttonBg3}
          color='#33358F'
        />
      </View>
      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA', // Light purple-grey background matching design
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  timeText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
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
    backgroundColor: '#000',
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
  },
  envelope: {
    width: 100,
    height: 80,
    position: 'relative',
  },
  envelopeBody: {
    width: 100,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  envelopeFlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    transform: [{ rotate: '-5deg' }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    left: 50,
    transform: [{ translateX: -15 }],
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 24,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  verificationBox: {
    backgroundColor: 'transparent', // Remove background to match design
    borderWidth: 0, // Remove border to match design
    alignItems: 'center',
    marginBottom: 60,
  },
  verifiedText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  dashboardButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -34,
    width: 68,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000',
  },

  messageBox: {
    width: 128,
    height: 128,
    marginBottom: 40,
  },
  buttonContainer: {
    marginHorizontal: 16,
    paddingBottom: 48,
    marginTop: 'auto',
  },
});
