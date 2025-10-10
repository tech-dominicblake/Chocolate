# i18n Multi-Language Implementation

This project uses **i18next** and **react-i18next** for internationalization.

## 🌍 Supported Languages

- **English** (en)
- **Russian** (ru) 
- **Bahasa Indonesia** (id)

## 📁 Project Structure

```
i18n/
├── index.ts              # i18n initialization
├── i18n.d.ts            # TypeScript declarations
├── locales/
│   ├── en.json          # English translations
│   ├── ru.json          # Russian translations
│   └── id.json          # Indonesian translations
└── README.md            # This file
```

## 🚀 Usage

### Basic Usage with `useTranslation` Hook

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('common.back')}</Text>
      <Text>{t('languageSelection.title')}</Text>
    </View>
  );
}
```

### Using the Custom `useI18n` Hook

```tsx
import { useI18n } from '@/hooks/useI18n';

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useI18n();
  
  const handleLanguageChange = () => {
    changeLanguage('ru');
  };
  
  return (
    <View>
      <Text>{t('common.continue')}</Text>
      <Text>Current: {currentLanguage}</Text>
      <Button onPress={handleLanguageChange} title="Switch to Russian" />
    </View>
  );
}
```

### Using `useSettingsStore` Directly

```tsx
import { useSettingsStore } from '@/state/useSettingsStore';

function MyComponent() {
  const { language, setLanguage } = useSettingsStore();
  
  const handleChange = async () => {
    await setLanguage('id');
  };
  
  return (
    <Text>Current language: {language}</Text>
  );
}
```

## 📝 Adding New Translations

### 1. Add keys to all language files

**en.json:**
```json
{
  "myFeature": {
    "title": "My Feature",
    "description": "This is my feature"
  }
}
```

**ru.json:**
```json
{
  "myFeature": {
    "title": "Моя функция",
    "description": "Это моя функция"
  }
}
```

**id.json:**
```json
{
  "myFeature": {
    "title": "Fitur Saya",
    "description": "Ini adalah fitur saya"
  }
}
```

### 2. Use in your component

```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>
```

## 🔄 Language Mapping

The app uses two language type systems:

1. **i18n Language Codes**: `'en' | 'ru' | 'id'` (used by i18next)
2. **Game Language Types**: `'english' | 'russian' | 'bahasa_indonesia'` (used by game store)

Use the mapping utilities in `hooks/useI18n.ts`:

```tsx
import { languageMap, reverseLanguageMap } from '@/hooks/useI18n';

// Convert i18n code to game language
const gameLanguage = languageMap['en']; // 'english'

// Convert game language to i18n code
const i18nCode = reverseLanguageMap['english']; // 'en'
```

## 💾 Persistence

Language preference is automatically saved to AsyncStorage via Zustand's persist middleware. It will be restored when the app restarts.

## 🔧 Configuration

Configuration is in `i18n/index.ts`:

```typescript
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',        // Use v3 format for React Native
    lng: languageTag,               // Initial language
    fallbackLng: 'en',              // Fallback to English
    resources: { ... },             // Translation resources
    interpolation: { 
      escapeValue: false            // React already escapes
    },
    react: {
      useSuspense: false,           // Disable suspense for React Native
    },
  });
```

## 📱 Language Selection Flow

1. User opens app → `useSettingsStore.loadLanguage()` loads saved language
2. User goes to Language Selection screen
3. User selects language → immediately updates i18n for preview
4. User clicks "Confirm & Continue" → saves to both stores
5. Language persists across app restarts

## 🎯 Best Practices

1. **Always use nested keys**: `t('section.key')` instead of `t('key')`
2. **Keep translations consistent**: Use the same structure across all language files
3. **Use descriptive keys**: `t('auth.signIn')` instead of `t('button1')`
4. **Group related translations**: Group by feature/screen
5. **Interpolation for dynamic content**:
   ```tsx
   // In JSON:
   "welcome": "Hello, {{name}}!"
   
   // In code:
   t('welcome', { name: 'John' })
   ```

## 🐛 Troubleshooting

### Language not changing
- Make sure you're awaiting `setLanguage()`
- Check that the language code is correct ('en', 'ru', or 'id')
- Verify i18n is initialized in `app/_layout.tsx`

### Missing translations
- Check that the key exists in all language files
- Verify the key path is correct
- Use fallback: `t('key', { defaultValue: 'Fallback text' })`

### TypeScript errors
- Make sure `i18n.d.ts` is included in your `tsconfig.json`
- Rebuild TypeScript: `npx tsc --noEmit`

## 📦 Installation

Required packages:
```bash
npm install i18next react-i18next react-native-localize
```

## 🔗 References

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [react-native-localize](https://github.com/zoontek/react-native-localize)

