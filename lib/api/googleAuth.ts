import { CONFIG } from '@/constants/Config';
import { supabase } from '@/utils/supabase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: CONFIG.GOOGLE.WEB_CLIENT_ID, // From Google Cloud Console
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

export const googleAuthService = {
  // Sign in with Google using native Google Sign-In
  signInWithGoogle: async (): Promise<{ success: boolean; error?: string; user?: any }> => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      const user = signInResult.data?.user;
      
      if (!idToken) {
        return { success: false, error: 'No ID token received from Google' };
      }

      // Create a Google credential with the token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Supabase Google auth error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Update user metadata with Google profile info
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            name: user?.name || user?.givenName || 'User',
            avatar_url: user?.photo,
            full_name: user?.name,
            first_name: user?.givenName,
            last_name: user?.familyName,
          }
        });

        if (updateError) {
          console.log('Error updating user profile:', updateError);
          // Don't fail the auth, just log the error
        }

        return { success: true, user: data.user };
      }

      return { success: false, error: 'No user data received' };
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return { success: false, error: 'Sign-in was cancelled' };
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return { success: false, error: 'Sign-in is already in progress' };
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return { success: false, error: 'Google Play Services not available' };
      } else {
        return { success: false, error: error.message || 'Google Sign-In failed' };
      }
    }
  },

  // Sign up with Google (same as sign in for OAuth)
  signUpWithGoogle: async (): Promise<{ success: boolean; error?: string; user?: any }> => {
    // For OAuth providers, sign up and sign in are the same
    return googleAuthService.signInWithGoogle();
  },

  // Sign out from Google
  signOutFromGoogle: async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await GoogleSignin.signOut();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Google Sign-Out error:', error);
      return { success: false, error: error.message || 'Sign-out failed' };
    }
  },

  // Check if user is signed in with Google
  isSignedIn: async (): Promise<boolean> => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser !== null;
    } catch (error) {
      console.error('Error checking Google sign-in status:', error);
      return false;
    }
  },

  // Get current user from Google
  getCurrentUser: async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      return userInfo;
    } catch (error) {
      console.error('Error getting current Google user:', error);
      return null;
    }
  }
};