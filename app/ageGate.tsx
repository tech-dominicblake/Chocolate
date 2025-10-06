import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor, useThemeToggle } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AgeGate() {
  const [nsfwMode, setNsfwMode] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const { isDark } = useThemeToggle();
  const barGrey = useAppThemeColor('bar');



  const handleProceed = () => {
    if (agreed) {
      router.push('/startPage');
      // Navigate to the next screen
    }
  };

  const handleDecline = () => {
    // Navigate back or to a different screen
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const handleMenu = () => {
    router.push('/menu');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#EDEFF2' }]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color='#79828F' />
          <Text style={[styles.backText, { color: barGrey }]}> BACK</Text>
        </TouchableOpacity>

        <MenuButton onPress={handleMenu} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Content */}
        <View style={styles.content}>
          {/* Devil Emoji */}
          <Image source={IMAGES.IMAGES.image3} style={styles.devilEmoji} />
          {/* Main Question */}
          <Text style={[styles.mainQuestion, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Are you 18+ and ready for chaos, chocolate, and questionable choices?
          </Text>

          {/* Divider Line */}
          <View style={styles.divider} />

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            This game includes mature themes and emotional content. By proceeding, you agree to play responsibly and take breaks if needed.
          </Text>

          {/* Agreement Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked, { borderColor: isDark ? '#33373D' : '#9C27B0', backgroundColor: isDark ? '#33373D' : '#FFFFFF' }]}>
              {agreed && <Text style={[styles.checkmark, { color: isDark ? '#FFFFFF' : '#4A5568' }]}>✓</Text>}
            </View>
            <Text style={[styles.checkboxLabel, { color: isDark ? '#FFFFFF' : '#191919' }]}>
              I understand and agree to the content warnings and rules of this game
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ActionButton
              title="BORN TO SLAY. LET'S GO 👆❤️"
              onPress={handleProceed}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg3}
              color='#33358F'
            />
            <ActionButton
              title="NAH, I'M BABY FR 👶🍫"
              onPress={handleDecline}
              variant="secondary"
              backgroundImage={IMAGES.IMAGES.btnBg2}
              color='#7A1818'
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    gap: 32,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  devilEmoji: {
    width: 104,
    height: 104,
    marginTop: 32,
  },
  mainQuestion: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  disclaimer: {
    fontSize: 16,
    color: '#8994A3',
    fontWeight: '500',
    lineHeight: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191919',
  },
  toggle: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    width: 52,
    height: 28,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#9C27B0',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#9C27B0',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#191919',
    flex: 1,
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    // bottom: 64,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 76,
    paddingBottom: 30,
  },
});
