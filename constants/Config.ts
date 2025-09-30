// Configuration constants for the app
export const CONFIG = {
  // Google OAuth Configuration
  // You need to set these in your environment variables or replace with actual values
  GOOGLE: {
    WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'your_google_web_client_id_here',
    IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || 'your_google_ios_client_id_here',
    ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || 'your_google_android_client_id_here',
  },
  
  // Supabase Configuration
  SUPABASE: {
    URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'your_supabase_url_here',
    ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here',
  }
};

// Instructions for setting up Google OAuth:
/*
1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google Sign-In API
4. Go to Credentials and create OAuth 2.0 Client IDs:
   - Web application (for Supabase)
   - iOS application (for iOS app)
   - Android application (for Android app)
5. Add your bundle ID/package name for mobile apps
6. Add your domain for web app
7. Copy the client IDs and add them to your environment variables
8. In Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set redirect URLs
*/
