import { CONFIG } from '@/constants/Config';
import { supabase } from '@/utils/supabase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Required for web browser-based auth
WebBrowser.maybeCompleteAuthSession();

// These will come from your Google Cloud Console
const GOOGLE_CLIENT_ID = {
  ios: CONFIG.GOOGLE.IOS_CLIENT_ID,
  android: CONFIG.GOOGLE.ANDROID_CLIENT_ID,
  web: CONFIG.GOOGLE.WEB_CLIENT_ID,
};

export const googleAuth = {
  useGoogleAuth: () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: GOOGLE_CLIENT_ID.android,
      iosClientId: GOOGLE_CLIENT_ID.ios,
      webClientId: GOOGLE_CLIENT_ID.web,
      // Make sure this matches your Google Cloud Console settings
      scopes: ['profile', 'email'],
    });

    return {
      request,
      response,
      promptAsync,
    };
  },

  signInWithGoogle: async (response: any) => {
    try {
      if (response?.type === 'success') {
        const { access_token } = response.authentication;

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_token,
              auth_type: 'reauthenticate',
            },
          },
        });

        if (error) throw error;
        return { data, error: null };
      }
      return {
        data: null,
        error: 'Google sign in was cancelled or failed',
      };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      return {
        data: null,
        error: error.message || 'Failed to sign in with Google',
      };
    }
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
