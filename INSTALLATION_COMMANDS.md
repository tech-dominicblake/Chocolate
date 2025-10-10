# Installation Commands for i18n

Run these commands to complete the i18n setup:

## 📦 Install Required Packages

```bash
npm install i18next react-i18next react-native-localize
```

Or with yarn:

```bash
yarn add i18next react-i18next react-native-localize
```

## 🔄 For iOS (if using iOS)

After installing, run:

```bash
cd ios && pod install && cd ..
```

## ✅ Verify Installation

Check that packages are installed:

```bash
npm list i18next react-i18next react-native-localize
```

## 🚀 Run the App

```bash
# For Android
npm run android

# For iOS  
npm run ios

# For Web
npm run web

# For Expo Go
npm start
```

## 📱 Test Multi-Language

1. Run the app
2. Navigate to the language selection screen
3. Select different languages to see the UI change
4. Restart the app to verify language persistence

## 🔍 Verify Setup

After installation, check:
- ✅ All translation files exist in `i18n/locales/`
- ✅ `app/_layout.tsx` imports `'../i18n'`
- ✅ `useSettingsStore` has `loadLanguage()` and `setLanguage()`
- ✅ Language selection screen uses `useTranslation()`

## ⚠️ If You Get Errors

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start -- --clear
```

### TypeScript errors

```bash
# Restart TypeScript server in your IDE
# Or run type check:
npx tsc --noEmit
```

### React Native errors

```bash
# For Expo
npx expo start --clear

# For bare React Native
npm start -- --reset-cache
```

## 🎯 Next Steps

After installation:
1. Read the [Quick Start Guide](docs/I18N_QUICK_START.md)
2. Check [Usage Examples](docs/I18N_USAGE_EXAMPLES.md)
3. Start translating your screens!

---

Need help? Check the [i18n README](i18n/README.md) for more details.

