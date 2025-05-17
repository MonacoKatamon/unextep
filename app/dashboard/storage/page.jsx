'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserLimits } from '@/lib/limits';
import { getUserStorageUsage } from '@/lib/storage';
import { getCachedData } from '@/lib/cache';
import { HardDrive, Upload, File, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoragePage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [storageUsage, setStorageUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        // Get user data
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Get subscription data with caching
          const subscriptionData = await getCachedData(
            `subscription:${user.id}`,
            'subscription',
            async () => {
              const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .single();
              
              if (error) return null;
              return data;
            }
          );
          
          setSubscription(subscriptionData);
          
          // Get storage usage with caching
          const usageData = await getCachedData(
            `storage:${user.id}`,
            'files',
            async () => {
              return await getUserStorageUsage(user.id);
            }
          );
          
          setStorageUsage(usageData);
        }
      } catch (error) {
        console.error('Error loading storage data:', error);
        setError('Failed to load storage information');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // Get user limits based on subscription
  const limits = getUserLimits(subscription);
  
  // Calculate storage usage percentage
  const usagePercentage = storageUsage && limits ? 
    (storageUsage.totalSize / limits.totalStorage) * 100 : 0;
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }
      
      // Update storage usage after successful upload
      const updatedUsage = await getUserStorageUsage(user.id);
      setStorageUsage(updatedUsage);
      
      // Clear selected file
      setSelectedFile(null);
      document.getElementById('file-upload').value = '';
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };
  
  // Format bytes to readable format
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-violet-400 border-t-violet-700 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Storage</h1>
        <p className="text-gray-500 mt-1">
          Manage your files and storage quota
        </p>
      </div>
      
      {/* Storage Usage Card */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Storage Usage</h2>
            <p className="text-gray-600">
              {formatBytes(storageUsage?.totalSize || 0)} of {formatBytes(limits?.totalStorage || 0)} used
            </p>
          </div>
          <div className="p-2 bg-violet-100 rounded-md">
            <HardDrive className="h-6 w-6 text-violet-600" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${usagePercentage > 90 ? 'bg-red-600' : 'bg-violet-600'}`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-gray-500">{storageUsage?.filesCount || 0} files</span>
          <span className={`${usagePercentage > 90 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
            {usagePercentage.toFixed(1)}% used
          </span>
        </div>
        
        {usagePercentage > 90 && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>You're almost out of storage! Upgrade to Pro for more space.</span>
          </div>
        )}
      </div>
      
      {/* File Upload Card */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Upload New File</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {subscription?.plan_name === 'pro' ? 
              `You can upload files up to ${formatBytes(limits?.maxFileSize)}` : 
              `Free plan limited to ${formatBytes(limits?.maxFileSize)} per file. Upgrade to Pro for larger files.`
            }
          </p>
          
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="file-upload"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              onChange={handleFileChange}
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="flex items-center"
            >
              {uploading ? 'Uploading...' : 'Upload'}
              {!uploading && <Upload className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
          
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Supported File Types</h3>
          <div className="flex flex-wrap gap-2">
            {limits?.fileTypes.map(type => (
              <span key={type} className="px-2 py-1 bg-gray-100 rounded-md text-xs">.{type}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Upgrade Card */}
      {subscription?.plan_name !== 'pro' && (
        <div className="bg-violet-900 text-white rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">Upgrade to Pro</h2>
              <p className="text-violet-100 mb-4">
                Get 10GB storage, larger file uploads, and more file formats
              </p>
              <Button className="bg-white text-violet-900 hover:bg-gray-100">
                Upgrade Now
              </Button>
            </div>
            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-violet-800 rounded-full">
              <File className="h-12 w-12 text-violet-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 