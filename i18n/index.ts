import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en.json';
import id from './locales/id.json';
import ru from './locales/ru.json';

// Map language codes to your app's language types
export const languageCodeMap = {
  en: 'english',
  ru: 'russian',
  id: 'bahasa_indonesia',
} as const;

export const reverseLanguageCodeMap = {
  english: 'en',
  russian: 'ru',
  bahasa_indonesia: 'id',
} as const;

// Get device language (will work after react-native-localize is installed)
let languageTag = 'en';
try {
  const Localization = require('react-native-localize');
  const result = Localization.findBestAvailableLanguage(['en', 'ru', 'id']);
  languageTag = result?.languageTag || 'en';
} catch (error) {
  // Package not installed yet, use default
  languageTag = 'en';
}

i18n
  .use(initReactI18next)
  .init({
    lng: languageTag,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      id: { translation: id },
    },
    interpolation: { 
      escapeValue: false 
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

