import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or key is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signUp(email, password, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    
    if (error) {
      throw error;
    }
    
    // Create user profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: metadata.full_name || '',
        updated_at: new Date().toISOString(),
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
} 