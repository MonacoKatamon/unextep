'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, CreditCard, Settings, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    getUser();
  }, []);
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User,
    },
    {
      name: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCard,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-400 border-t-violet-700 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    // If not logged in, redirect to login
    window.location.href = '/login';
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
        <Link href="/dashboard" className="font-bold text-xl">SaaS App</Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-white border-r`}
      >
        <div className="p-6">
          <Link href="/dashboard" className="font-bold text-xl hidden md:block">SaaS App</Link>
          <div className="mt-6 md:mt-10 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md ${
                  pathname === item.href
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t md:absolute md:bottom-6 md:left-6 md:right-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-gray-700"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
