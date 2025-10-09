import { Language as GameLanguage } from '@/constants/Types';
import { Language, useSettingsStore } from '@/state/useSettingsStore';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for i18n functionality
 * Provides translation function and language management
 */
export const useI18n = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  /**
   * Change the app language
   * @param lang - Language code ('en' | 'ru' | 'id')
   */
  const changeLanguage = async (lang: Language) => {
    await setLanguage(lang);
  };

  /**
   * Get current language code
   */
  const currentLanguage = language;

  /**
   * Check if a language is currently active
   */
  const isLanguage = (lang: Language) => language === lang;

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,
    isLanguage,
  };
};

/**
 * Map between i18n language codes and game language types
 */
export const languageMap: Record<Language, GameLanguage> = {
  en: 'english',
  ru: 'russian',
  id: 'bahasa_indonesia',
};

export const reverseLanguageMap: Record<GameLanguage, Language> = {
  english: 'en',
  russian: 'ru',
  bahasa_indonesia: 'id',
};

