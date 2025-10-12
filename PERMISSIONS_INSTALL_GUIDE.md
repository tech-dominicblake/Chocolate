# 🚀 Quick Installation Guide - App Permissions

Follow these steps to install and test the permission system.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Prebuild Native Code
```bash
npx expo prebuild --clean
```
⚠️ **Important**: This step is required because we added native permissions!

### Step 3: Run the App
**iOS:**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

---

## 📦 What Was Added?

### New Dependencies
- `expo-notifications` (~0.30.8) - Push notification support
- `expo-tracking-transparency` (~4.1.7) - iOS ATT support

### New Files
- `hooks/useAppPermissions.ts` - Permission management hook
- `PERMISSIONS_IMPLEMENTATION.md` - Full documentation

### Modified Files
- `app/index.tsx` - Integrated permission flow
- `app.json` - Added iOS/Android permissions config
- `package.json` - Added new dependencies

---

## ✅ Testing Checklist

### First Launch Test
- [ ] Install app on device
- [ ] Launch app for the first time
- [ ] **iOS**: See ATT prompt, then notification prompt
- [ ] **Android 13+**: See notification prompt
- [ ] **Android ≤12**: No prompt (auto-granted)

### Second Launch Test
- [ ] Close the app completely
- [ ] Reopen the app
- [ ] **Expected**: NO permission prompts should appear

### Reset Test (Optional)
```typescript
// Add this temporarily to test reset
import { useAppPermissions } from '@/hooks/useAppPermissions';

const { resetPermissions } = useAppPermissions();
await resetPermissions();
```

---

## 🎯 Expected Behavior

### 📱 iOS Sequence
```
App Launches
    ↓
Wait 1 second (splash finishes)
    ↓
Show ATT Prompt:
"Allow [App] to track your activity across 
other companies' apps and websites?"
    ↓
User taps "Allow" or "Ask App Not to Track"
    ↓
Wait 500ms
    ↓
Show Notification Prompt:
"[App] would like to send you notifications"
    ↓
User taps "Allow" or "Don't Allow"
    ↓
Permissions saved → Never ask again
```

### 🤖 Android Sequence (13+)
```
App Launches
    ↓
Wait 1 second (splash finishes)
    ↓
Show Notification Prompt:
"Allow [App] to send notifications?"
    ↓
User taps "Allow" or "Don't Allow"
    ↓
Permissions saved → Never ask again
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "expo-notifications is not installed"
**Solution:**
```bash
npm install
npx expo prebuild --clean
```

### Issue 2: Permissions showing multiple times
**Solution:**
- Clear app data and reinstall
- Check if AsyncStorage is working properly

### Issue 3: iOS ATT not appearing
**Solution:**
- Must be iOS 14.5 or higher
- Check device is not in "Limit Ad Tracking" mode
- Verify `NSUserTrackingUsageDescription` in app.json

### Issue 4: Android notification permission failing
**Solution:**
- Android 13+ required for permission prompt
- Check `POST_NOTIFICATIONS` is in app.json
- Verify device notification settings

### Issue 5: Build errors after adding packages
**Solution:**
```bash
# Clean everything
rm -rf node_modules ios android
npm install
npx expo prebuild --clean

# iOS specific (if needed)
cd ios && pod install && cd ..

# Then rebuild
npx expo run:ios  # or run:android
```

---

## 🔍 Debug Console Output

When permissions are working correctly, you should see:

```
📱 iOS detected - requesting ATT permission first...
📍 App Tracking Permission: Granted (or Denied)
🔔 Requesting notification permission...
🔔 Notification Permission: Granted (or Denied)
✅ All permissions requested and saved
```

On subsequent launches:
```
✅ Permissions already requested, skipping...
```

---

## 🧹 Clean Install (If Something Breaks)

```bash
# 1. Remove everything
rm -rf node_modules
rm -rf ios android
rm package-lock.json  # or yarn.lock

# 2. Fresh install
npm install

# 3. Prebuild
npx expo prebuild --clean

# 4. iOS pods (if on Mac)
cd ios && pod install && cd ..

# 5. Run
npx expo run:ios  # or run:android
```

---

## 📝 Notes

- **First launch only**: Permissions are requested once and saved
- **Platform-aware**: Automatically handles iOS vs Android differences
- **Non-blocking**: App works even if user denies permissions
- **Privacy-compliant**: Follows Apple and Google guidelines

---

## 🎉 You're All Set!

The permission system is now integrated and will:
- ✅ Show on first launch only
- ✅ Follow iOS/Android best practices
- ✅ Save user choices
- ✅ Never ask again after first time

---

**Need Help?** Check `PERMISSIONS_IMPLEMENTATION.md` for detailed documentation.

