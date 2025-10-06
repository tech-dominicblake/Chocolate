// Configuration constants for the app
export const CONFIG = {
  // Google OAuth Configuration
  // You need to set these in your environment variables or replace with actual values
  GOOGLE: {
    WEB_CLIENT_ID: '479407816447-kcfcj9lbegfgf3p1tea7hm7442fq4egi.apps.googleusercontent.com',
    IOS_CLIENT_ID: '479407816447-aa3frtdkhnoqoem3vf9t9eqelpmnvumv.apps.googleusercontent.com',
    ANDROID_CLIENT_ID: '479407816447-ec7i3o1ajnb22o7ntkvoji7471ikvn14.apps.googleusercontent.com'
  },
  
  // Supabase Configuration
  SUPABASE: {
    URL: 'https://kommsuzfzgeszvreydwk.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbW1zdXpmemdlc3p2cmV5ZHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTM3NTgsImV4cCI6MjA2OTU2OTc1OH0.ktFrkhuuMMQRsP8Ims8GhtHXlLLgXvpdMLPzZ2ebjIo',
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
