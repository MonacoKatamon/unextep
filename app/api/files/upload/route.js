import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import { getCachedData, subscriptionCache } from '@/lib/cache';

export async function POST(request) {
  try {
    // Verify authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Get user's subscription from cache or database
    const subscription = await getCachedData(
      `subscription:${userId}`, 
      'subscription',
      async () => {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single();
          
        if (error) return null;
        return data;
      }
    );

    // Parse file from FormData
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Upload file with quota checks
    const result = await uploadFile(userId, file, subscription);
    
    return NextResponse.json({ 
      success: true, 
      file: result,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Handle specific error messages for quota limits
    if (error.message?.includes('exceeds the maximum size') || 
        error.message?.includes('reached your storage limit') ||
        error.message?.includes('not supported in your plan')) {
      return NextResponse.json({ 
        error: error.message,
        quota_exceeded: true
      }, { status: 403 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to upload file'
    }, { status: 500 });
  }
} 