import { CONFIG } from '@/constants/Config';
import { supabase } from '@/utils/supabase';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

export const expoGoogleAuthService = {
  // Sign in with Google using Expo AuthSession
  signInWithGoogle: async (): Promise<{ success: boolean; error?: string; user?: any }> => {
    try {
      // Create the auth request
      const request = new AuthSession.AuthRequest({
        clientId: CONFIG.GOOGLE.WEB_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: AuthSession.makeRedirectUri(),
        responseType: AuthSession.ResponseType.Code,
        extraParams: {},
        prompt: AuthSession.Prompt.SelectAccount,
      });

      // Start the auth session
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      });

      if (result.type === 'success') {
        // Exchange the code for tokens
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: CONFIG.GOOGLE.WEB_CLIENT_ID,
            code: result.params.code,
            redirectUri: AuthSession.makeRedirectUri(),
            extraParams: {
              code_verifier: request.codeChallenge || '',
            },
          },
          {
            tokenEndpoint: 'https://oauth2.googleapis.com/token',
          }
        );

        // Get user info
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.accessToken}`
        );
        const userInfo = await userInfoResponse.json();

        // Sign in with Supabase using the ID token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: tokenResponse.idToken!,
        });

        if (error) {
          console.error('Supabase Google auth error:', error);
          return { success: false, error: error.message };
        }

        if (data.user) {
          // Update user metadata with Google profile info
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              name: userInfo.name || 'User',
              avatar_url: userInfo.picture,
              full_name: userInfo.name,
              first_name: userInfo.given_name,
              last_name: userInfo.family_name,
            }
          });

          if (updateError) {
            console.log('Error updating user profile:', updateError);
            // Don't fail the auth, just log the error
          }

          return { success: true, user: data.user };
        }

        return { success: false, error: 'No user data received' };
      } else if (result.type === 'cancel') {
        return { success: false, error: 'Sign-in was cancelled' };
      } else {
        return { success: false, error: 'Authentication failed' };
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      return { success: false, error: error.message || 'Google Sign-In failed' };
    }
  },

  // Sign up with Google (same as sign in for OAuth)
  signUpWithGoogle: async (): Promise<{ success: boolean; error?: string; user?: any }> => {
    return expoGoogleAuthService.signInWithGoogle();
  },

  // Sign out from Google
  signOutFromGoogle: async (): Promise<{ success: boolean; error?: string }> => {
    try {
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
      const { data: { user } } = await supabase.auth.getUser();
      return user !== null;
    } catch (error) {
      console.error('Error checking Google sign-in status:', error);
      return false;
    }
  },

  // Get current user from Google
  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current Google user:', error);
      return null;
    }
  }
};
