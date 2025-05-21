import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">unextep</Link>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Launch Your SaaS in Minutes
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unextep is a complete toolkit for indie hackers and solo developers to launch their SaaS products quickly and efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/setup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Setup Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need to Launch Fast
              </h2>
              <p className="text-xl text-gray-600">
                Built with the modern tech stack, Unextep helps you focus on your product, not infrastructure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Authentication System</h3>
                <p className="text-gray-600">
                  User registration, login, and profile management powered by Supabase Auth.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Payment Processing</h3>
                <p className="text-gray-600">
                  Stripe integration for subscriptions and one-time payments.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Responsive Dashboard</h3>
                <p className="text-gray-600">
                  Beautiful admin interface that works on all devices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-violet-900 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to launch your SaaS?
              </h2>
              <p className="text-xl opacity-80 mb-8">
                Get started today and launch your product in minutes, not months.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white text-violet-900 hover:bg-gray-100">
                  Start Building Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <Link href="/" className="font-bold text-xl mb-4 block">unextep</Link>
              <p className="text-gray-500">
                Launch your SaaS in minutes, not months.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()} Unextep. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 