
import { supabase } from '@/utils/supabase';

// Real email verification service using Supabase Auth
export const emailVerificationService = {
  // Send verification code to email using Supabase Auth OTP
  sendVerificationCode: async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log(`Sending OTP code to: ${email}`);
      
      // Use signInWithOtp to send 6-digit OTP code
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true,
          // Don't provide emailRedirectTo to force OTP mode
        }
      });

      if (error) {
        console.error('Error sending OTP code:', error);
        return { 
          success: false, 
          error: error.message || 'Failed to send verification code' 
        };
      }

      console.log('OTP code sent successfully:', data);
      return { success: true };
    } catch (error) {
      console.error('Exception sending OTP code:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  },

  // Verify the OTP code using Supabase Auth
  verifyCode: async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log(`Verifying OTP code ${code} for email: ${email}`);
      
      // Use verifyOtp to verify the 6-digit code
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: code,
        type: 'email'
      });

      if (error) {
        console.error('Error verifying OTP code:', error);
        return { 
          success: false, 
          error: error.message || 'Invalid verification code' 
        };
      }

      console.log('OTP code verified successfully:', data);
      return { success: true };
    } catch (error) {
      console.error('Exception verifying OTP code:', error);
      return { 
        success: false, 
        error: 'Verification failed. Please try again.' 
      };
    }
  },

  // Legacy method for backward compatibility
  verifyCodeAndSetPassword: async (email: string, code: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    return emailVerificationService.verifyCode(email, code);
  },
};