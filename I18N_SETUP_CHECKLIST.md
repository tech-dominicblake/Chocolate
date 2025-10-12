# ✅ i18n Setup Checklist

Use this checklist to complete your i18n setup and start using multi-language features.

---

## 📦 Step 1: Installation (Required)

```bash
npm install i18next react-i18next react-native-localize
```

- [ ] Run the command above
- [ ] Wait for installation to complete
- [ ] No errors during installation

---

## 🧪 Step 2: Test Basic Setup

- [ ] Run `npm start` to start your app
- [ ] App loads without errors
- [ ] Navigate to language selection screen
- [ ] You see: English, Russian, Indonesian options
- [ ] Click Russian - UI text changes to Russian
- [ ] Click Indonesian - UI text changes to Indonesian
- [ ] Click English - UI text changes back to English

---

## 💾 Step 3: Test Persistence

- [ ] Select Russian language
- [ ] Click "Confirm & Continue"
- [ ] Close the app completely
- [ ] Reopen the app
- [ ] Language should still be Russian ✅

---

## 🔍 Step 4: Verify Files

Check these files exist:

### Core Files
- [ ] `i18n/index.ts`
- [ ] `i18n/locales/en.json`
- [ ] `i18n/locales/ru.json`
- [ ] `i18n/locales/id.json`
- [ ] `hooks/useI18n.ts`

### Modified Files (check imports)
- [ ] `app/_layout.tsx` imports `'../i18n'`
- [ ] `state/useSettingsStore.ts` imports `i18n from '../i18n'`
- [ ] `app/languageSelection.tsx` imports `useTranslation`

### Documentation
- [ ] `i18n/README.md`
- [ ] `docs/I18N_QUICK_START.md`
- [ ] `docs/I18N_USAGE_EXAMPLES.md`

---

## 🎯 Step 5: Try It in Your Code

### Test 1: Basic Usage
Create a test component:

```tsx
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export function TestComponent() {
  const { t } = useTranslation();
  return <Text>{t('common.back')}</Text>;
}
```

- [ ] Add component to a screen
- [ ] It displays "BACK" in English
- [ ] Switch to Russian - displays "НАЗАД"
- [ ] Switch to Indonesian - displays "KEMBALI"

### Test 2: Language Switcher
```tsx
import { Button } from 'react-native';
import { useI18n } from '@/hooks/useI18n';

export function TestSwitcher() {
  const { changeLanguage } = useI18n();
  return (
    <Button 
      title="Switch to Russian" 
      onPress={() => changeLanguage('ru')} 
    />
  );
}
```

- [ ] Add to a screen
- [ ] Click button
- [ ] All UI text changes to Russian

---

## 📝 Step 6: Add Your Own Translations

### Add a New Translation Key

1. Open `i18n/locales/en.json`
2. Add your key:
   ```json
   {
     "myTest": {
       "greeting": "Hello World"
     }
   }
   ```

3. Open `i18n/locales/ru.json`
4. Add same key:
   ```json
   {
     "myTest": {
       "greeting": "Привет мир"
     }
   }
   ```

5. Open `i18n/locales/id.json`
6. Add same key:
   ```json
   {
     "myTest": {
       "greeting": "Halo Dunia"
     }
   }
   ```

7. Use in your component:
   ```tsx
   <Text>{t('myTest.greeting')}</Text>
   ```

**Checklist:**
- [ ] Added key to en.json
- [ ] Added key to ru.json
- [ ] Added key to id.json
- [ ] Used in component with t()
- [ ] Tested in all 3 languages

---

## 🌐 Step 7: Test on Different Devices (Optional)

- [ ] Test on Android
- [ ] Test on iOS
- [ ] Test on web (if applicable)
- [ ] Test with device language set to Russian
- [ ] Test with device language set to Indonesian
- [ ] App respects device language on first launch

---

## 🎨 Step 8: Update Your Screens

Pick a screen to translate:

- [ ] Identify hardcoded strings
- [ ] Add translation keys to JSON files
- [ ] Import `useTranslation`
- [ ] Replace strings with `t('key')`
- [ ] Test in all languages

Example transformation:
```tsx
// Before
<Text>Welcome</Text>
<Button title="Continue" />

// After
const { t } = useTranslation();
<Text>{t('welcome.title')}</Text>
<Button title={t('common.continue')} />
```

---

## 📚 Step 9: Read Documentation

- [ ] Read `docs/I18N_QUICK_START.md` (5 minutes)
- [ ] Skim `docs/I18N_USAGE_EXAMPLES.md` (examples)
- [ ] Bookmark `i18n/README.md` (reference)

---

## 🐛 Troubleshooting

### Issue: "Module not found: i18next"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start -- --clear
```
- [ ] Fixed

### Issue: Language not changing
**Solution:** Make sure you're using `await`:
```tsx
await setLanguage('ru');
```
- [ ] Fixed

### Issue: Translation key not found
**Solution:**
1. Check key exists in all 3 JSON files
2. Check spelling is exactly the same
3. Use dot notation: `t('section.key')`
- [ ] Fixed

### Issue: TypeScript errors
**Solution:**
1. Check `i18n/i18n.d.ts` exists
2. Restart TypeScript server (CMD+Shift+P → Restart TS Server)
3. Run: `npx tsc --noEmit`
- [ ] Fixed

---

## ✨ Advanced Features (Optional)

### Dynamic Content
- [ ] Learn interpolation: `t('welcome', { name: 'John' })`
- [ ] Learn pluralization: `t('items', { count: 5 })`
- [ ] Learn context: `t('button', { context: 'male' })`

### Performance
- [ ] Check app performance with translations
- [ ] Optimize large translation files if needed
- [ ] Consider code splitting for very large apps

### Additional Languages
- [ ] Learn how to add 4th language (French, Spanish, etc.)
- [ ] Update language selection UI
- [ ] Add to `i18n/index.ts` resources

---

## 🎉 Completion Checklist

### Core Setup
- [ ] Packages installed
- [ ] Files created
- [ ] No errors in console
- [ ] App runs successfully

### Functionality
- [ ] Language selection works
- [ ] Translations display correctly
- [ ] Language persists across restarts
- [ ] All 3 languages work

### Code
- [ ] Can use `t()` in components
- [ ] Can switch languages programmatically
- [ ] Custom hook works
- [ ] TypeScript has no errors

### Documentation
- [ ] Read quick start
- [ ] Understand how to add translations
- [ ] Know where to find examples
- [ ] Bookmarked reference docs

---

## 🏆 Final Check

Everything working? Check all that apply:

- [ ] ✅ Installed packages successfully
- [ ] ✅ App runs without errors
- [ ] ✅ Can switch languages
- [ ] ✅ Language persists
- [ ] ✅ Added custom translation key
- [ ] ✅ Used `t()` in a component
- [ ] ✅ Tested all 3 languages
- [ ] ✅ Read documentation

---

## 🎯 You're Ready!

If all boxes are checked, you're ready to use i18n in your Chocolate app!

### Quick Reference

**Translate text:**
```tsx
const { t } = useTranslation();
<Text>{t('common.back')}</Text>
```

**Change language:**
```tsx
const { changeLanguage } = useI18n();
changeLanguage('ru');
```

**Add translation:**
1. Add key to all 3 JSON files
2. Use with `t('your.key')`
3. Test in all languages

---

## 📞 Need Help?

- 📖 Quick Start: `docs/I18N_QUICK_START.md`
- 💡 Examples: `docs/I18N_USAGE_EXAMPLES.md`
- 📚 Full Reference: `i18n/README.md`
- 🎉 Summary: `🎉_I18N_IMPLEMENTATION_COMPLETE.md`

---

**Last Updated**: October 8, 2025  
**Status**: Ready for Production ✅

Print this checklist and check off items as you complete them!

