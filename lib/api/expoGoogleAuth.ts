import { CONFIG } from '@/constants/Config';
import { supabase } from '@/utils/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// Required for web browser-based auth
WebBrowser.maybeCompleteAuthSession();

// Create redirect URI using Expo's proxy
const redirectUri = makeRedirectUri({
    // ✅ use the proxy for Expo Go
    // (works in development, not production)
    useProxy: true,
    scheme: "chocolate",
    // path: "auth/callback"
} as any); // 👈 cast to any to silence TS, safe here

// These will come from your Google Cloud Console
const GOOGLE_CLIENT_ID = {
    ios: CONFIG.GOOGLE.IOS_CLIENT_ID,
    android: CONFIG.GOOGLE.ANDROID_CLIENT_ID,
    web: CONFIG.GOOGLE.WEB_CLIENT_ID,
    redirectUri: "https://kommsuzfzgeszvreydwk.supabase.co/auth/v1/callback", // Use the same redirectUri created above
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
            responseType: "id_token", // ✅ this avoids needing clientSecret
            scopes: ["openid", "profile", "email"],
            extraParams: {
                access_type: 'offline',
                prompt: 'consent'
            }
        });

        console.warn('=============================> Google Auth State:', {
            request,
            response,
            clientIds: {
                android: GOOGLE_CLIENT_ID.android,
                ios: GOOGLE_CLIENT_ID.ios,
                web: GOOGLE_CLIENT_ID.web,
                redirectUri: GOOGLE_CLIENT_ID.redirectUri
            }
        });

        return {
            request,
            response,
            promptAsync,
        };
    },

    // getRedirectUri: () => makeRedirectUri({
    //     scheme: "chocolate", // must match what you set in app.json
    //     path: "auth/callback"
    // }),

    signInWithGoogle: async (response: any) => {
        const idToken = response?.params?.id_token;
        if (!idToken) {
            throw new Error("No ID token found");
        }

        // Use Supabase signInWithIdToken
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: idToken,
            options: {
                redirectTo: googleAuth.redirectTo,
            } as any
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
