import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18n from '../i18n';

export type Language = 'en' | 'ru' | 'id';

interface SettingsState {
  // App settings
  language: Language;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  isLanguageLoaded: boolean;
  
  // Actions
  setLanguage: (lang: Language) => Promise<void>;
  loadLanguage: () => Promise<void>;
  toggleSound: () => void;
  toggleHaptics: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // Initial state
      language: 'en',
      soundEnabled: true,
      hapticsEnabled: true,
      isLanguageLoaded: false,
      
      // Actions
      setLanguage: async (lang: Language) => {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem('language', lang);
        set({ language: lang });
      },
      
      loadLanguage: async () => {
        const savedLang = await AsyncStorage.getItem('language');
        const lang = (savedLang as Language) || i18n.language as Language || 'en';
        await i18n.changeLanguage(lang);
        set({ language: lang, isLanguageLoaded: true });
      },
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleHaptics: () => set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
    }),
    {
      name: 'chocolate-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);