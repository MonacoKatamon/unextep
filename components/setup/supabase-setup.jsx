'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SupabaseSetup({ onComplete }) {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleConfigure = async () => {
    if (!apiUrl || !apiKey) {
      alert('Please enter both Supabase URL and API key.');
      return;
    }
    
    setIsConfiguring(true);
    
    try {
      // In a real-world scenario, you would validate the API credentials and store them securely
      // For this demo, we'll simulate a successful setup
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Call the API endpoint to store the Supabase credentials
      // This would typically be a server-side request
      // await fetch('/api/supabase/setup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ apiUrl, apiKey }),
      // });
      
      setSuccess(true);
      
      // Wait a moment before proceeding to the next step
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      console.error('Error configuring Supabase:', error);
      alert('Failed to configure Supabase. Please try again.');
    } finally {
      setIsConfiguring(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Connect Supabase</h3>
      <p className="text-gray-600">
        Supabase provides authentication and database for your SaaS application. Follow these steps to set it up:
      </p>
      
      <ol className="space-y-6 mt-6 list-decimal pl-5">
        <li className="pl-2">
          <p className="font-medium">Create a Supabase account</p>
          <p className="text-gray-600 mt-1">
            If you don't have a Supabase account yet, sign up at{' '}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noreferrer"
              className="text-violet-600 hover:text-violet-700"
            >
              supabase.com
            </a>
            .
          </p>
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Create a new project</p>
          <p className="text-gray-600 mt-1">
            From your Supabase dashboard, click "New Project" and fill in the details.
          </p>
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Get your API credentials</p>
          <p className="text-gray-600 mt-1">
            Go to Project Settings → API and copy the URL and anon/public key.
          </p>
          <img
            src="/images/supabase-api-keys.png"
            alt="Supabase API keys"
            className="mt-2 rounded-md border shadow-sm"
          />
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Enter your API credentials below</p>
          
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="supabase-url" className="block mb-2 text-sm font-medium text-gray-700">
                Supabase URL
              </label>
              <input
                id="supabase-url"
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                placeholder="https://example.supabase.co"
              />
            </div>
            
            <div>
              <label htmlFor="supabase-key" className="block mb-2 text-sm font-medium text-gray-700">
                Supabase Anon Key
              </label>
              <input
                id="supabase-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              />
            </div>
            
            <Button
              onClick={handleConfigure}
              disabled={isConfiguring || success}
              className="mt-2"
            >
              {isConfiguring ? 'Configuring...' : success ? 'Configured!' : 'Configure Supabase'}
            </Button>
          </div>
        </li>
      </ol>
      
      {success && (
        <div className="mt-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md">
          Supabase has been successfully configured! You can now move on to the next step.
        </div>
      )}
    </div>
  );
} 