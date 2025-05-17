'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, DollarSign, Users, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        // Get user data
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Get subscription data
          const { data: subscriptionData, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (!error) {
            setSubscription(subscriptionData);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);
  
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
        <h1 className="text-2xl font-bold">
          Welcome, {user?.user_metadata?.full_name || user?.email}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your SaaS application.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Plan Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Plan</p>
              <h3 className="text-2xl font-bold">
                {subscription?.plan_name === 'pro' ? 'Pro' : 'Free'}
              </h3>
            </div>
            <div className="p-2 bg-violet-100 rounded-md">
              <DollarSign className="h-6 w-6 text-violet-600" />
            </div>
          </div>
          {subscription?.plan_name === 'pro' ? (
            <p className="text-sm text-gray-500 mt-2">
              Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              Upgrade to Pro for more features
            </p>
          )}
        </div>
        
        {/* Users Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Invite team members to collaborate
          </p>
        </div>
        
        {/* Revenue Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <h3 className="text-2xl font-bold">$0</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
            <span>0% from last month</span>
          </div>
        </div>
        
        {/* Usage Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">API Usage</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-md">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Requests this month
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Quick Start Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 mr-3">
              1
            </div>
            <div>
              <h3 className="font-medium">Customize your application</h3>
              <p className="text-sm text-gray-500">
                Update your app's name, colors, and branding in the Settings page.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 mr-3">
              2
            </div>
            <div>
              <h3 className="font-medium">Invite your team</h3>
              <p className="text-sm text-gray-500">
                Add team members to collaborate on your project.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 mr-3">
              3
            </div>
            <div>
              <h3 className="font-medium">Set up payments</h3>
              <p className="text-sm text-gray-500">
                Configure your payment plans to start earning revenue.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 mr-3">
              4
            </div>
            <div>
              <h3 className="font-medium">Launch your application</h3>
              <p className="text-sm text-gray-500">
                Share your application with the world and start growing your user base.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 text-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-gray-300 mb-4">
              Get access to premium features, priority support, and more.
            </p>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700">
              Upgrade Now
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full">
            <ArrowUpRight className="h-12 w-12 text-violet-400" />
          </div>
        </div>
      </div>
    </div>
  );
} 