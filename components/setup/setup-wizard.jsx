'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, 
  Code, 
  CreditCard, 
  Github, 
  Lock, 
  Server, 
  Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupabaseSetup from '@/components/setup/supabase-setup';
import StripeSetup from '@/components/setup/stripe-setup';

export default function SetupWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if a plan was selected from pricing
  const initialPlan = searchParams.get('plan') || 'free';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState({
    cloned: false,
    supabaseConnected: false,
    stripeConnected: false,
    deployed: false,
    customized: false,
  });
  
  const steps = [
    {
      id: 'clone',
      name: 'Clone Repository',
      icon: Code,
      component: () => (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Clone the Repository</h3>
          <p className="text-gray-600">Start by cloning the Unextep starter repository to your local machine.</p>
          
          <div className="bg-gray-100 p-4 rounded-md my-6 font-mono text-sm overflow-x-auto">
            git clone https://github.com/unextep/starter.git my-saas-app
          </div>
          
          <p className="text-gray-600">
            This will create a new directory with all the code you need to get started. Next, navigate to the directory and install the dependencies:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-md my-6 font-mono text-sm overflow-x-auto">
            cd my-saas-app<br />
            npm install
          </div>
          
          <Button
            onClick={() => {
              setProgress({ ...progress, cloned: true });
              setCurrentStep(1);
            }}
            className="mt-4"
          >
            I've cloned the repository
          </Button>
        </div>
      ),
    },
    {
      id: 'supabase',
      name: 'Connect Supabase',
      icon: Lock,
      component: () => (
        <SupabaseSetup 
          onComplete={() => {
            setProgress({ ...progress, supabaseConnected: true });
            setCurrentStep(2);
          }}
        />
      ),
    },
    {
      id: 'stripe',
      name: 'Connect Stripe',
      icon: CreditCard,
      component: () => (
        <StripeSetup 
          plan={initialPlan}
          onComplete={() => {
            setProgress({ ...progress, stripeConnected: true });
            setCurrentStep(3);
          }}
        />
      ),
    },
    {
      id: 'deploy',
      name: 'Deploy to Vercel',
      icon: Zap,
      component: () => (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Deploy to Vercel</h3>
          <p className="text-gray-600">
            Deploy your SaaS application to Vercel with a single click. Vercel will automatically set up your environment variables from the previous steps.
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <Button
              onClick={() => {
                // In a real app, this would open a new window to the Vercel deployment page
                window.open(
                  'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Funextep%2Fstarter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,STRIPE_PRO_PRICE_ID',
                  '_blank'
                );
              }}
              className="bg-black hover:bg-gray-900 text-white px-6 py-3 flex items-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M24 22.525H0l12-21.05 12 21.05z" />
              </svg>
              Deploy to Vercel
            </Button>
            
            <p className="mt-4 text-sm text-gray-500">
              This will take you to Vercel to deploy your application.
            </p>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <p className="font-medium">After deploying on Vercel</p>
            <ol className="mt-4 space-y-4 list-decimal pl-5">
              <li className="pl-2">
                <p className="text-gray-600">
                  Wait for the deployment to complete.
                </p>
              </li>
              <li className="pl-2">
                <p className="text-gray-600">
                  Make sure all your environment variables are correctly set.
                </p>
              </li>
              <li className="pl-2">
                <p className="text-gray-600">
                  Visit your deployed site to make sure everything is working correctly.
                </p>
              </li>
            </ol>
            
            <div className="mt-6">
              <Button
                onClick={() => {
                  setProgress({ ...progress, deployed: true });
                  setCurrentStep(4);
                }}
              >
                I've Deployed My App
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'customize',
      name: 'Customize',
      icon: Server,
      component: () => (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Customize Your App</h3>
          <p className="text-gray-600">
            Make your SaaS application unique by customizing its appearance and branding.
          </p>
          
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="app-name" className="block mb-2 text-sm font-medium text-gray-700">
                Application Name
              </label>
              <input
                id="app-name"
                type="text"
                defaultValue="My SaaS App"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            
            <div>
              <label htmlFor="primary-color" className="block mb-2 text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="primary-color"
                  type="color"
                  defaultValue="#7c3aed"
                  className="h-10 w-20 border-0 rounded-md p-0 cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#7c3aed"
                  className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                This color will be used for buttons, links, and accents throughout your application.
              </p>
            </div>
            
            <div>
              <label htmlFor="logo-url" className="block mb-2 text-sm font-medium text-gray-700">
                Logo URL (optional)
              </label>
              <input
                id="logo-url"
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                placeholder="https://example.com/your-logo.png"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter a URL to your logo image. If left blank, your app name will be used as the logo.
              </p>
            </div>
            
            <div className="mt-6">
              <Button
                onClick={() => {
                  setProgress({ ...progress, customized: true });
                  router.push('/dashboard');
                }}
              >
                Save Customizations
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container">
          <Link href="/" className="font-bold text-xl">unextep</Link>
        </div>
      </header>
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Launch Your SaaS in Minutes
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Steps Sidebar */}
              <div className="md:w-1/3 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-6">Setup Steps</h3>
                <ul className="space-y-4">
                  {steps.map((step, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
                        ${currentStep === idx ? 'bg-violet-100' : 'hover:bg-gray-100'}`}
                      onClick={() => setCurrentStep(idx)}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full mr-3
                        ${
                          idx < currentStep || 
                          (idx === 0 && progress.cloned) ||
                          (idx === 1 && progress.supabaseConnected) ||
                          (idx === 2 && progress.stripeConnected) ||
                          (idx === 3 && progress.deployed) ||
                          (idx === 4 && progress.customized)
                            ? 'bg-green-500 text-white'
                            : currentStep === idx
                              ? 'bg-violet-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {idx < currentStep || 
                         (idx === 0 && progress.cloned) ||
                         (idx === 1 && progress.supabaseConnected) ||
                         (idx === 2 && progress.stripeConnected) ||
                         (idx === 3 && progress.deployed) ||
                         (idx === 4 && progress.customized) ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="font-medium">{step.name}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-gray-500 mb-4">
                    Need help? Our assistant can guide you through each step.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Toggle the chat assistant
                      alert('Chat assistant would open here');
                    }}
                  >
                    Get Help
                  </Button>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="md:w-2/3 bg-white rounded-lg border p-6">
                {steps[currentStep].component()}
                
                <div className="flex justify-between mt-8 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < steps.length - 1 && (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={
                        (currentStep === 0 && !progress.cloned) ||
                        (currentStep === 1 && !progress.supabaseConnected) ||
                        (currentStep === 2 && !progress.stripeConnected) ||
                        (currentStep === 3 && !progress.deployed)
                      }
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 