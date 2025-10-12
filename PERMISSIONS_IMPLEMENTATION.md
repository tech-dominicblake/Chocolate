# 🔐 App Permissions Implementation

This document explains the permission system implemented for iOS App Tracking Transparency (ATT) and Push Notifications on both iOS and Android.

---

## 📋 Overview

The app now requests two types of permissions on first launch:

1. **App Tracking Transparency (iOS only)** - Required by Apple for analytics and tracking
2. **Push Notifications** - For both iOS and Android 13+ devices

### ✅ Key Features

- **Show only once** - Permissions are requested only on the first app launch
- **Proper sequencing** - iOS shows ATT first, then notifications
- **Persistent storage** - Permission status saved to prevent re-asking
- **Platform-aware** - Handles iOS and Android differences automatically
- **Non-blocking** - Doesn't prevent app usage if permissions are denied

---

## 🛠️ Implementation Details

### Files Modified/Created

#### 1. **`hooks/useAppPermissions.ts`** (NEW)
The main hook that handles all permission logic:

```typescript
const { permissionsRequested, requestAllPermissions, resetPermissions } = useAppPermissions();
```

**Functions:**
- `requestAllPermissions()` - Triggers the permission flow
- `resetPermissions()` - Clears saved permissions (for testing/debugging)
- `permissionsRequested` - Boolean indicating if permissions were already asked

**Storage:**
- Uses AsyncStorage key: `@app_permissions`
- Stores: tracking status, notification status, and hasAskedForPermissions flag

#### 2. **`app/index.tsx`** (MODIFIED)
Integrated permission flow on first launch:

```typescript
// Request permissions only on first launch after authentication
if (userData && !permissionsRequested && !permissionsLoading) {
  setTimeout(async () => {
    await requestAllPermissions();
  }, 1000);
}
```

**Flow:**
1. Check authentication status
2. If user is authenticated and permissions not yet requested
3. Wait 1 second (for splash screen to finish)
4. Request permissions

#### 3. **`package.json`** (MODIFIED)
Added required dependencies:

```json
"expo-notifications": "~0.30.8",
"expo-tracking-transparency": "~4.1.7"
```

#### 4. **`app.json`** (MODIFIED)
Added necessary configurations:

**iOS:**
```json
"ios": {
  "infoPlist": {
    "NSUserTrackingUsageDescription": "We would like to track your activity to provide personalized content and improve your experience with the app.",
    "UIBackgroundModes": ["remote-notification"]
  }
}
```

**Android:**
```json
"android": {
  "permissions": ["POST_NOTIFICATIONS"]
}
```

**Plugins:**
```json
[
  "expo-tracking-transparency",
  {
    "userTrackingPermission": "We would like to track your activity..."
  }
],
[
  "expo-notifications",
  {
    "icon": "./icon.png",
    "color": "#ffffff",
    "mode": "production"
  }
]
```

---

## 📱 User Experience Flow

### iOS
```
App Launch
    ↓
Splash Screen (dismisses)
    ↓
1 second delay
    ↓
ATT Prompt: "Allow [App] to track your activity?"
    ↓ (User responds)
500ms delay
    ↓
Notification Prompt: "[App] would like to send you notifications"
    ↓ (User responds)
Permissions saved
    ↓
Continue to app (never ask again)
```

### Android (13+)
```
App Launch
    ↓
Splash Screen (dismisses)
    ↓
1 second delay
    ↓
Notification Prompt: "Allow [App] to send notifications?"
    ↓ (User responds)
Permissions saved
    ↓
Continue to app (never ask again)
```

### Android (≤12)
```
App Launch
    ↓
Splash Screen (dismisses)
    ↓
Notifications automatically granted (no prompt)
    ↓
Continue to app
```

---

## 🔧 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 2: Prebuild (Required for native changes)

```bash
npx expo prebuild --clean
```

### Step 3: Run the app

**iOS:**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

---

## 🧪 Testing

### Test First Launch
1. Install the app on a device/simulator
2. Launch the app
3. You should see:
   - **iOS**: ATT prompt → Notification prompt
   - **Android 13+**: Notification prompt
   - **Android ≤12**: No prompt (auto-granted)

### Test Subsequent Launches
1. Close and reopen the app
2. **Expected**: No permission prompts should appear
3. The app should remember your previous choices

### Reset Permissions (For Testing)

You can manually reset permissions by calling:

```typescript
const { resetPermissions } = useAppPermissions();
await resetPermissions();
```

Or clear app data:
- **iOS**: Settings → General → iPhone Storage → [App] → Delete App
- **Android**: Settings → Apps → [App] → Storage → Clear Data

---

## 📊 Permission Status Storage

Stored in AsyncStorage under key: `@app_permissions`

```typescript
{
  "trackingPermission": "granted" | "denied" | "not-determined" | null,
  "notificationPermission": "granted" | "denied" | "not-determined" | null,
  "hasAskedForPermissions": true | false
}
```

---

## 🐛 Debugging

### Enable Console Logs

The hook includes detailed console logs:

```
📱 iOS detected - requesting ATT permission first...
📍 App Tracking Permission: Granted
🔔 Requesting notification permission...
🔔 Notification Permission: Granted
✅ All permissions requested and saved
```

### Common Issues

**Issue**: Permissions not showing
- **Solution**: Make sure you've run `npx expo prebuild --clean`

**Issue**: Permissions show multiple times
- **Solution**: Check AsyncStorage - permissions might not be saving

**Issue**: ATT not showing on iOS
- **Solution**: 
  1. Check iOS version (iOS 14.5+ required)
  2. Verify `NSUserTrackingUsageDescription` in `app.json`
  3. Ensure device is not in "Limit Ad Tracking" mode

**Issue**: Notifications not working on Android
- **Solution**: 
  1. Check Android version (13+ requires explicit permission)
  2. Verify `POST_NOTIFICATIONS` in `app.json`
  3. Check device notification settings

---

## 🔒 Privacy & Compliance

### Apple App Store Requirements
- ✅ ATT prompt with clear messaging
- ✅ User consent before tracking
- ✅ Respects user's choice
- ✅ No tracking before consent

### Google Play Store Requirements
- ✅ POST_NOTIFICATIONS permission declared
- ✅ Runtime permission request (Android 13+)
- ✅ Graceful handling of denied permissions

---

## 🚀 Future Enhancements

Possible improvements:

1. **Custom Permission UI**: Show a pre-permission explainer screen
2. **Analytics Integration**: Track permission acceptance rates
3. **Re-request Logic**: Smart prompting for denied permissions
4. **Settings Deep Link**: Direct users to app settings if denied
5. **A/B Testing**: Test different permission messaging

---

## 📞 Support

If you encounter issues or have questions:
1. Check the console logs for debugging info
2. Verify all dependencies are installed correctly
3. Ensure native builds are up to date (`expo prebuild`)
4. Test on actual devices (simulators may behave differently)

---

**Last Updated**: January 2025
**Expo SDK Version**: ~53.0.23
**React Native Version**: 0.79.5

