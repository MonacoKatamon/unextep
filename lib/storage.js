import { supabase } from './supabase';
import { getUserLimits } from './limits';

export async function getUserStorageUsage(userId) {
  try {
    // Get list of files owned by user
    const { data: files, error } = await supabase
      .storage
      .from('user_files')
      .list(userId);
    
    if (error) throw error;
    
    // Calculate total size
    const totalSize = files.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);
    
    return { totalSize, filesCount: files.length };
  } catch (error) {
    console.error('Error getting storage usage:', error);
    throw error;
  }
}

export async function checkUploadEligibility(userId, fileSize, fileType, subscription) {
  try {
    // Get user limits based on subscription
    const limits = getUserLimits(subscription);
    
    // Check file size limit
    if (fileSize > limits.maxFileSize) {
      return { 
        eligible: false, 
        reason: `File exceeds the maximum size limit of ${formatBytes(limits.maxFileSize)}` 
      };
    }
    
    // Check file type
    const extension = fileType.split('/').pop().toLowerCase();
    if (!limits.fileTypes.includes(extension)) {
      return { 
        eligible: false, 
        reason: `File type ${extension} is not supported in your plan` 
      };
    }
    
    // Check storage quota
    const { totalSize } = await getUserStorageUsage(userId);
    if (totalSize + fileSize > limits.totalStorage) {
      return { 
        eligible: false, 
        reason: `You have reached your storage limit of ${formatBytes(limits.totalStorage)}` 
      };
    }
    
    return { eligible: true };
  } catch (error) {
    console.error('Error checking upload eligibility:', error);
    throw error;
  }
}

export async function uploadFile(userId, file, subscription) {
  try {
    // Check if user can upload this file
    const { eligible, reason } = await checkUploadEligibility(
      userId, 
      file.size, 
      file.type, 
      subscription
    );
    
    if (!eligible) {
      throw new Error(reason);
    }
    
    // Generate a unique filename
    const filename = `${Date.now()}-${file.name}`;
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('user_files')
      .upload(`${userId}/${filename}`, file);
    
    if (error) throw error;
    
    // Update user's storage metadata in database
    await updateUserStorageMetadata(userId);
    
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

async function updateUserStorageMetadata(userId) {
  try {
    const { totalSize, filesCount } = await getUserStorageUsage(userId);
    
    // Update user's profile with storage info
    const { error } = await supabase
      .from('profiles')
      .update({
        storage_used: totalSize,
        files_count: filesCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating storage metadata:', error);
    throw error;
  }
}

// Helper function to format bytes to human-readable form
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
} 