import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { SelectOptionButton } from '@/components/SelectOptionButton';
import { IMAGES } from '@/constants';
import { Language } from '@/constants/Types';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const languages = [
  { key: 'english' as Language, label: 'English' },
  { key: 'russian' as Language, label: 'Russian' },
  { key: 'bahasa_indonesia' as Language, label: 'Bahasa Indonesia' },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const { setLanguage } = useGameStore();

  const background = useAppThemeColor('background');
  const barGrey = useAppThemeColor('bar');
  const textColor = useAppThemeColor('text');

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleConfirmAndContinue = () => {
    setLanguage(selectedLanguage);
    // Navigate to the next screen (you can adjust this based on your app flow)
    router.push('/gameSelection');
  };

  const handleBack = () => {
    router.back();
  };

  const handleMenu = () => {
    router.push('/menu');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backText, { color: barGrey }]}>← BACK</Text>
        </TouchableOpacity>

        <MenuButton onPress={handleMenu} />
      </View>

      {/* Title */}

      {/* Language Options */}
      <View style={styles.languageContainer}>
        <Text style={[styles.title, { color: textColor }]}>Language</Text>
        {languages.map((language) => (
          <SelectOptionButton
            key={language.key}
            title={language.label}
            isSelected={selectedLanguage === language.key}
            onPress={() => handleLanguageSelect(language.key)}
          />
        ))}
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <ActionButton
          title="Confirm & Continue"
          onPress={handleConfirmAndContinue}
          loading={false}
          // disabled={!selectedLanguage}
          backgroundImage={IMAGES.IMAGES.btnBg1}
          color='#8B2756'
          variant="primary"
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 76,
    paddingBottom: 30,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  languageContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  buttonContainer: {
    paddingBottom: 48,
  },
});
