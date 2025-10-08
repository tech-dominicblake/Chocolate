# Google OAuth Implementation Guide for React Native Expo

This comprehensive guide shows how to implement Google OAuth authentication in a React Native Expo project using Supabase as the backend authentication provider.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Libraries Used](#libraries-used)
4. [Setup Instructions](#setup-instructions)
5. [Implementation Details](#implementation-details)
6. [Code Examples](#code-examples)
7. [Configuration Files](#configuration-files)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)

## 🎯 Overview

This implementation provides:
- **Google OAuth** authentication for iOS, Android, and Web
- **Supabase** backend integration for user management
- **Session persistence** with automatic token refresh
- **Multiple authentication methods** (Google Sign-In + Guest mode)
- **TypeScript support** with proper type definitions

## 📦 Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Google Cloud Console account
- Supabase project
- Android Studio (for Android development)
- Xcode (for iOS development)

## 🔧 Libraries Used

### Core Dependencies
```json
{
  "@react-native-google-signin/google-signin": "^16.0.0",
  "@supabase/supabase-js": "^2.57.4",
  "expo-auth-session": "~6.2.1",
  "expo-crypto": "~14.1.5",
  "expo-linking": "~7.1.7",
  "expo-web-browser": "~14.2.0",
  "@react-native-async-storage/async-storage": "2.1.2"
}
```

### Key Libraries Explained

1. **`@react-native-google-signin/google-signin`**: Native Google Sign-In for React Native
2. **`@supabase/supabase-js`**: Supabase client for backend authentication
3. **`expo-auth-session`**: Expo's authentication session management
4. **`expo-web-browser`**: For web-based OAuth flows
5. **`@react-native-async-storage/async-storage`**: Local storage for session persistence

## 🚀 Setup Instructions

### Step 1: Google Cloud Console Setup

1. **Create/Select Project**
   ```bash
   # Go to Google Cloud Console
   https://console.cloud.google.com/
   ```

2. **Enable Required APIs**
   - Google+ API
   - Google Sign-In API
   - Google Identity API

3. **Create OAuth 2.0 Credentials**
   
   **Web Application (for Supabase):**
   - Application type: Web application
   - Authorized redirect URIs: `https://your-project-ref.supabase.co/auth/v1/callback`
   
   **iOS Application:**
   - Application type: iOS
   - Bundle ID: `com.yourcompany.chocolate`
   
   **Android Application:**
   - Application type: Android
   - Package name: `com.yourcompany.chocolate`
   - SHA-1 certificate fingerprint: Get from your keystore

### Step 2: Supabase Configuration

1. **Enable Google Provider**
   ```bash
   # In Supabase Dashboard
   Authentication > Providers > Google > Enable
   ```

2. **Configure OAuth Settings**
   - Client ID: Your Google Web Client ID
   - Client Secret: Your Google Web Client Secret
   - Redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### Step 3: Install Dependencies

```bash
# Install required packages
npm install @react-native-google-signin/google-signin @supabase/supabase-js expo-auth-session expo-crypto expo-linking expo-web-browser @react-native-async-storage/async-storage

# For Expo development builds
npx expo install expo-dev-client
```

## 💻 Implementation Details

### 1. Configuration Setup

**`constants/Config.ts`**
```typescript
export const CONFIG = {
  GOOGLE: {
    WEB_CLIENT_ID: 'your-web-client-id.apps.googleusercontent.com',
    IOS_CLIENT_ID: 'your-ios-client-id.apps.googleusercontent.com',
    ANDROID_CLIENT_ID: 'your-android-client-id.apps.googleusercontent.com'
  },
  SUPABASE: {
    URL: 'https://your-project-ref.supabase.co',
    ANON_KEY: 'your-supabase-anon-key'
  }
};
```

### 2. Supabase Client Setup

**`utils/supabase.ts`**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);
```

### 3. User Storage Management

**`utils/userStorage.ts`**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@user_data';
const EXPIRATION_KEY = '@user_data_expiration';
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export interface StoredUserData {
  id: string;
  email: string;
  created_at: string;
}

export async function storeUserData(userData: StoredUserData): Promise<void> {
  try {
    const expirationDate = new Date(Date.now() + TWO_DAYS_MS).toISOString();
    
    await Promise.all([
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData)),
      AsyncStorage.setItem(EXPIRATION_KEY, expirationDate)
    ]);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

export async function getUserData(): Promise<StoredUserData | null> {
  try {
    const [userData, expiration] = await Promise.all([
      AsyncStorage.getItem(USER_STORAGE_KEY),
      AsyncStorage.getItem(EXPIRATION_KEY)
    ]);

    if (!userData || !expiration) {
      return null;
    }

    const parsedUserData = JSON.parse(userData);
    
    // Validate required fields
    if (!parsedUserData.id || !parsedUserData.email) {
      await clearUserData();
      return null;
    }

    // Check expiration
    if (new Date(expiration) < new Date()) {
      await clearUserData();
      return null;
    }

    return parsedUserData;
  } catch (error) {
    console.error('Error getting user data:', error);
    await clearUserData();
    return null;
  }
}

export async function clearUserData(): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.removeItem(USER_STORAGE_KEY),
      AsyncStorage.removeItem(EXPIRATION_KEY)
    ]);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}
```

## 🔧 Code Examples

### 1. Google OAuth Hook Implementation

**`lib/api/expoGoogleAuth.ts`**
```typescript
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { Linking } from 'expo-linking';
import { supabase } from '@/utils/supabase';
import { CONFIG } from '@/constants/Config';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri({
  useProxy: true,
  scheme: "chocolate",
});

const GOOGLE_CLIENT_ID = {
  ios: CONFIG.GOOGLE.IOS_CLIENT_ID,
  android: CONFIG.GOOGLE.ANDROID_CLIENT_ID,
  web: CONFIG.GOOGLE.WEB_CLIENT_ID,
  redirectUri: "https://your-project-ref.supabase.co/auth/v1/callback",
};

export const googleAuth = {
  redirectTo: Linking.createURL('/auth/callback', {
    scheme: "chocolate",
  }),

  useGoogleAuth: () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: GOOGLE_CLIENT_ID.web,
      androidClientId: GOOGLE_CLIENT_ID.android,
      iosClientId: GOOGLE_CLIENT_ID.ios,
      webClientId: GOOGLE_CLIENT_ID.web,
      redirectUri: googleAuth.redirectTo,
      responseType: "id_token",
      scopes: ["openid", "profile", "email"],
      extraParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    });
    
    return { request, response, promptAsync };
  },

  signInWithGoogle: async (response: any) => {
    const idToken = response?.params?.id_token;
    if (!idToken) {
      throw new Error("No ID token found");
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
      options: {
        redirectTo: googleAuth.redirectTo,
      }
    });

    return { data, error };
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        error: error.message || 'Failed to sign out',
      };
    }
  },
};
```

### 2. Native Google Sign-In Component

**`components/Auth.tsx`**
```typescript
import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from '@/utils/supabase';
import { storeUserData } from '@/utils/userStorage';
import { router } from 'expo-router';
import { CONFIG } from '@/constants/Config';
import ActionButton from './prompts/ActionButton';

interface AuthProps {
  buttonText: string;
}

export default function Auth({ buttonText }: AuthProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Configure Google Sign-In
  GoogleSignin.configure({
    offlineAccess: true,
    webClientId: CONFIG.GOOGLE.WEB_CLIENT_ID,
    iosClientId: CONFIG.GOOGLE.IOS_CLIENT_ID,
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      
      // Check if Google Play Services are available
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      console.log('Google Play Services available:', hasPlayServices);
      
      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In result:', userInfo.data?.idToken);
      
      if (userInfo?.data?.idToken) {
        // Sign in with Supabase using Google token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        
        console.log('Supabase auth result:', { data, error });
        
        if (!error && data.user) {
          // Store user data with expiration
          await storeUserData({
            id: data.user.id,
            email: data.user.email!,
            created_at: data.user.created_at,
          });
          
          // Navigate to next screen
          router.push('/ageGate');
        } else {
          throw new Error(error?.message || 'Supabase authentication failed');
        }
      } else {
        throw new Error('No ID token received from Google');
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <ActionButton
      title={buttonText}
      variant="primary"
      loading={isGoogleLoading}
      disabled={isGoogleLoading}
      onPress={handleGoogleSignIn}
    />
  );
}
```

### 3. Sign-In Screen Implementation

**`app/(auth)/sign-in.tsx`**
```typescript
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { googleAuth } from '@/lib/api/expoGoogleAuth';
import Auth from '@/components/Auth';

export default function SignInScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { request, response, promptAsync } = googleAuth.useGoogleAuth();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      console.log('Starting Google Sign In...');
      
      // Prompt user to sign in with Google
      const result = await promptAsync();
      console.log('Prompt Result:', result);
      
      if (result?.type === 'success') {
        console.log('Google auth successful, exchanging token with Supabase...');
        
        // Sign in with Supabase using Google token
        const { data, error } = await googleAuth.signInWithGoogle(result);
        console.log('Supabase auth result:', { data, error });
        
        if (error) {
          console.error('Supabase auth error:', error);
          return;
        }

        if (data) {
          console.log('Successfully signed in with Google');
          router.push('/ageGate');
        }
      } else {
        console.log('Google auth was cancelled or failed:', result);
      }
    } catch (err: any) {
      console.error('Unexpected error during Google sign in:', err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Chocolate</Text>
        
        {/* Google Sign-In Button */}
        <Auth 
          buttonText="Sign in with Google"
        />
        
        {/* Alternative: Direct implementation */}
        <ActionButton
          title="Sign in with Google (Alternative)"
          variant="primary"
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
          onPress={handleGoogleSignIn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});
```

## ⚙️ Configuration Files

### 1. App Configuration

**`app.json`**
```json
{
  "expo": {
    "name": "chocolate",
    "slug": "chocolate",
    "scheme": "chocolate",
    "plugins": [
      "expo-router",
      "expo-dev-client",
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID"
        }
      ]
    ],
    "android": {
      "package": "com.chocolate",
      "adaptiveIcon": {
        "foregroundImage": "./icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "ios": {
      "bundleIdentifier": "com.chocolate",
      "supportsTablet": true
    }
  }
}
```

### 2. Package.json Scripts

**`package.json`**
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-native-google-signin/google-signin": "^16.0.0",
    "@supabase/supabase-js": "^2.57.4",
    "expo-auth-session": "~6.2.1",
    "expo-crypto": "~14.1.5",
    "expo-linking": "~7.1.7",
    "expo-web-browser": "~14.2.0",
    "@react-native-async-storage/async-storage": "2.1.2"
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **"No development build installed"**
   ```bash
   # Solution: Build and install development build
   npx expo run:android
   npx expo run:ios
   ```

2. **"Google Play Services not available"**
   ```typescript
   // Check before signing in
   const hasPlayServices = await GoogleSignin.hasPlayServices();
   if (!hasPlayServices) {
     // Handle error or redirect to Play Store
   }
   ```

3. **"Invalid client ID"**
   - Verify client IDs in Google Cloud Console
   - Check bundle ID/package name matches exactly
   - Ensure SHA-1 fingerprint is correct for Android

4. **"Redirect URI mismatch"**
   - Verify redirect URIs in Google Cloud Console
   - Check Supabase callback URL configuration
   - Ensure scheme matches in app.json

### Debug Commands

```bash
# Check Expo configuration
npx expo doctor

# Verify dependencies
npx expo install --check

# Clear cache and restart
npx expo start --clear

# Check Android build
npx expo run:android --no-install
```

## 🔒 Security Considerations

### 1. Environment Variables
```typescript
// Use environment variables for sensitive data
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

### 2. Token Validation
```typescript
// Always validate tokens on the server side
const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'google',
  token: idToken,
  options: {
    redirectTo: 'https://your-app.com/auth/callback'
  }
});
```

### 3. Session Management
```typescript
// Implement proper session cleanup
export const signOut = async () => {
  try {
    // Sign out from Google
    await GoogleSignin.signOut();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    // Clear local storage
    await clearUserData();
    
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
  }
};
```

## 📱 Platform-Specific Notes

### Android
- Requires Google Play Services
- SHA-1 fingerprint must be registered
- Uses `@react-native-google-signin/google-signin`

### iOS
- Requires iOS 11.0+
- Bundle ID must match Google Console
- Uses native Google Sign-In SDK

### Web
- Uses OAuth 2.0 flow
- Requires HTTPS in production
- Uses `expo-auth-session` and `expo-web-browser`

## 🎯 Best Practices

1. **Always handle errors gracefully**
2. **Implement loading states**
3. **Validate tokens server-side**
4. **Use environment variables for sensitive data**
5. **Implement proper session cleanup**
6. **Test on all target platforms**
7. **Follow OAuth 2.0 security guidelines**

## 📚 Additional Resources

- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

**Note**: Replace placeholder values (like `your-project-ref`, `your-client-id`, etc.) with your actual configuration values before using this implementation.
