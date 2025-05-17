'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp(email, password, { full_name: fullName });
      setSuccess(true);
      // In a real app, you might want to redirect to a confirmation page or to the dashboard
      // For now, we'll just show a success message
    } catch (error) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }
  
  if (success) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Registration Successful</h1>
          <p className="mt-2 text-gray-600">
            Please check your email for confirmation instructions.
          </p>
        </div>
        <div className="p-4 bg-green-100 border border-green-200 text-green-700 rounded-md">
          A confirmation email has been sent to {email}. Please check your inbox and confirm your account.
        </div>
        <div className="text-center mt-4">
          <Link href="/login" className="font-medium text-violet-600 hover:text-violet-500">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-2 text-gray-600">Sign up to get started with Unextep</p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 6 characters long
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        
        <div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-violet-600 hover:text-violet-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 