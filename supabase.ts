import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://nnjveepyrhcuugnvtsmh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uanZlZXB5cmhjdXVnbnZ0c21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTM0MjQsImV4cCI6MjA0NDU4OTQyNH0.B0aGqZgt13OxeBlIeOgiuSg-HXeP15d_BwmAUFXoc3s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const createUserProfile = async (userId: string, userType: string) => {
  console.log('Creating profile for:', userId, userType);
  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: userId, user_type: userType });
  
  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
  console.log('Profile created:', data);
};
