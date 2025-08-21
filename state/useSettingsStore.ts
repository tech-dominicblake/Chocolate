import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Language = 'en' | 'ru' | 'id';

interface SettingsState {
  // App settings
  language: Language;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  
  // Actions
  setLanguage: (lang: Language) => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Initial state
      language: 'en',
      soundEnabled: true,
      hapticsEnabled: true,
      
      // Actions
      setLanguage: (language) => set({ language }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleHaptics: () => set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
    }),
    {
      name: 'chocolate-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);