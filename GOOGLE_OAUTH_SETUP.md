# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your React Native Expo app with Supabase.

## Prerequisites

- Google Cloud Console account
- Supabase project
- Expo development environment

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Create a new project or select an existing one
   - Note down your project ID

3. **Enable Required APIs**
   - Go to "APIs & Services" > "Library"
   - Search and enable:
     - Google+ API
     - Google Sign-In API
     - Google Identity API

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - You'll need to create 3 different client IDs:

   **Web Application (for Supabase):**
   - Application type: Web application
   - Name: Your App Name - Web
   - Authorized redirect URIs: 
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - Replace `your-project-ref` with your actual Supabase project reference

   **iOS Application:**
   - Application type: iOS
   - Name: Your App Name - iOS
   - Bundle ID: `com.yourcompany.chocolate` (or your actual bundle ID)

   **Android Application:**
   - Application type: Android
   - Name: Your App Name - Android
   - Package name: `com.yourcompany.chocolate` (or your actual package name)
   - SHA-1 certificate fingerprint: Get this from your keystore

5. **Get Your Client IDs**
   - Copy the Client ID for each application type
   - You'll need these for your environment variables

## Step 2: Supabase Configuration

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Configure Google Provider**
   - Go to "Authentication" > "Providers"
   - Find "Google" and click "Enable"
   - Enter your Google OAuth credentials:
     - Client ID: Your Web Application Client ID from Google Cloud Console
     - Client Secret: Your Web Application Client Secret from Google Cloud Console
   - Set the redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`

3. **Configure Site URL**
   - Go to "Authentication" > "URL Configuration"
   - Add your app's URL scheme: `chocolate://` (or your custom scheme)
   - Add any additional redirect URLs you need

## Step 3: Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google OAuth Configuration
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id_here
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id_here
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_google_android_client_id_here
```

## Step 4: Update App Configuration

1. **Update app.json**
   - The Google Sign-In plugin has been added to your `app.json`
   - Make sure the iOS URL scheme matches your bundle ID

2. **Update Constants/Config.ts**
   - Replace the placeholder values with your actual Google OAuth credentials
   - Or use environment variables as shown above

## Step 5: Testing

1. **Development Testing**
   - Run `expo start` to start your development server
   - Test on both iOS and Android devices/simulators
   - Make sure Google Sign-In buttons work correctly

2. **Production Testing**
   - Build your app for production
   - Test the Google authentication flow
   - Verify user data is properly stored in Supabase

## Troubleshooting

### Common Issues:

1. **"Google Play Services not available"**
   - Make sure you're testing on a real device or emulator with Google Play Services
   - Check that your Android client ID is correctly configured

2. **"Invalid client" error**
   - Verify your Google OAuth credentials are correct
   - Check that the bundle ID/package name matches exactly

3. **"Redirect URI mismatch"**
   - Ensure your Supabase redirect URL matches exactly what you configured in Google Cloud Console
   - Check for typos in the URL

4. **"Sign-in cancelled"**
   - This is normal if the user cancels the sign-in process
   - Handle this gracefully in your app

### Debug Steps:

1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with different Google accounts
4. Check Supabase logs in the dashboard

## Security Notes

- Never commit your `.env` file to version control
- Use different OAuth credentials for development and production
- Regularly rotate your OAuth secrets
- Monitor your OAuth usage in Google Cloud Console

## Additional Resources

- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the Google Cloud Console and Supabase logs
3. Test with a fresh Google account
4. Verify all configuration steps were completed correctly
