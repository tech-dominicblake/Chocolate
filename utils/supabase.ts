import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://kommsuzfzgeszvreydwk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbW1zdXpmemdlc3p2cmV5ZHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTM3NTgsImV4cCI6MjA2OTU2OTc1OH0.ktFrkhuuMMQRsP8Ims8GhtHXlLLgXvpdMLPzZ2ebjIo';


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
)