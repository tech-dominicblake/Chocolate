import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { SelectOptionButton } from '@/components/SelectOptionButton';
import { IMAGES } from '@/constants';
import { Language as GameLanguage } from '@/constants/Types';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { Language, useSettingsStore } from '@/state/useSettingsStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Map between i18n language codes and game language types
const languageMap: Record<Language, GameLanguage> = {
  en: 'english',
  ru: 'russian',
  id: 'bahasa_indonesia',
};

const reverseLanguageMap: Record<GameLanguage, Language> = {
  english: 'en',
  russian: 'ru',
  bahasa_indonesia: 'id',
};

const languages = [
  { key: 'en' as Language, label: 'languageSelection.english' },
  { key: 'ru' as Language, label: 'languageSelection.russian' },
  { key: 'id' as Language, label: 'languageSelection.indonesian' },
];

export default function LanguageSelectionScreen() {
  const { t } = useTranslation();
  const { language: currentLanguage, setLanguage: setI18nLanguage } = useSettingsStore();
  const { setLanguage: setGameLanguage } = useGameStore();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage);

  const background = useAppThemeColor('background');
  const barGrey = useAppThemeColor('bar');
  const textColor = useAppThemeColor('text');

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // Change language immediately for preview1000
    setI18nLanguage(language);
  };

  const handleConfirmAndContinue = () => {
    // Update both i18n and game store
    setI18nLanguage(selectedLanguage);
    setGameLanguage(languageMap[selectedLanguage]);
    // Navigate to the next screen (you can adjust this based on your app flow)
    router.push('/userInfo');
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
          <Ionicons name="chevron-back" size={24} color='#79828F' />
          <Text style={[styles.backText, { color: barGrey }]}> {t('common.back')}</Text>
        </TouchableOpacity>

        <MenuButton onPress={handleMenu} />
      </View>

      {/* Title */}

      {/* Language Options */}
      <View style={styles.languageContainer}>
        <Text style={[styles.title, { color: textColor }]}>{t('languageSelection.title')}</Text>
        {languages.map((language) => (
          <SelectOptionButton
            key={language.key}
            title={t(language.label as any)}
            isSelected={selectedLanguage === language.key}
            onPress={() => handleLanguageSelect(language.key)}
          />
        ))}
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <ActionButton
          title={t('common.confirm')}
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
    display: 'flex',
    flexDirection:'row',
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
    gap: 4,
  },
  buttonContainer: {
    paddingBottom: 48,
  },
});
