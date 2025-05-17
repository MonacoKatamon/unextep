'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function StripeSetup({ plan = 'free', onComplete }) {
  const [apiKey, setApiKey] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const isPro = plan === 'pro';
  
  const handleConfigure = async () => {
    if (!apiKey || !webhookSecret) {
      alert('Please enter both Stripe API key and webhook secret.');
      return;
    }
    
    setIsConfiguring(true);
    
    try {
      // In a real-world scenario, you would validate the API credentials and store them securely
      // For this demo, we'll simulate a successful setup
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Call the API endpoint to store the Stripe credentials
      // This would typically be a server-side request
      // await fetch('/api/stripe/setup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ apiKey, webhookSecret }),
      // });
      
      setSuccess(true);
      
      // Wait a moment before proceeding to the next step
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      console.error('Error configuring Stripe:', error);
      alert('Failed to configure Stripe. Please try again.');
    } finally {
      setIsConfiguring(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Connect Stripe</h3>
      <p className="text-gray-600">
        Stripe powers the payment processing for your SaaS application.
        {isPro
          ? ' Since you selected the Pro plan, setting up Stripe is required.'
          : ' Even though you selected the Free plan, setting up Stripe now will make it easier to monetize your SaaS later.'}
      </p>
      
      <ol className="space-y-6 mt-6 list-decimal pl-5">
        <li className="pl-2">
          <p className="font-medium">Create a Stripe account</p>
          <p className="text-gray-600 mt-1">
            If you don't have a Stripe account yet, sign up at{' '}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noreferrer"
              className="text-violet-600 hover:text-violet-700"
            >
              stripe.com
            </a>
            .
          </p>
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Get your API keys</p>
          <p className="text-gray-600 mt-1">
            From your Stripe dashboard, go to Developers → API keys and copy your secret key.
            For testing, you can use the test mode keys.
          </p>
          <img
            src="/images/stripe-api-keys.png"
            alt="Stripe API keys"
            className="mt-2 rounded-md border shadow-sm"
          />
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Set up a webhook endpoint</p>
          <p className="text-gray-600 mt-1">
            Go to Developers → Webhooks → Add endpoint and enter your webhook URL:
          </p>
          <div className="bg-gray-100 p-3 mt-2 mb-3 rounded-md font-mono text-sm">
            https://your-app.vercel.app/api/stripe/webhook
          </div>
          <p className="text-gray-600">
            Add the following events: <code>checkout.session.completed</code>,{' '}
            <code>customer.subscription.created</code>,{' '}
            <code>customer.subscription.updated</code>, and{' '}
            <code>customer.subscription.deleted</code>.
          </p>
          <p className="text-gray-600 mt-2">
            After creating the webhook, reveal and copy the signing secret.
          </p>
        </li>
        
        <li className="pl-2">
          <p className="font-medium">Enter your Stripe credentials below</p>
          
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="stripe-key" className="block mb-2 text-sm font-medium text-gray-700">
                Stripe Secret Key
              </label>
              <input
                id="stripe-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                placeholder="sk_test_..."
              />
            </div>
            
            <div>
              <label htmlFor="webhook-secret" className="block mb-2 text-sm font-medium text-gray-700">
                Webhook Signing Secret
              </label>
              <input
                id="webhook-secret"
                type="text"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                placeholder="whsec_..."
              />
            </div>
            
            <Button
              onClick={handleConfigure}
              disabled={isConfiguring || success}
              className="mt-2"
            >
              {isConfiguring ? 'Configuring...' : success ? 'Configured!' : 'Configure Stripe'}
            </Button>
          </div>
        </li>
      </ol>
      
      {success && (
        <div className="mt-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md">
          Stripe has been successfully configured! You can now move on to the next step.
        </div>
      )}
    </div>
  );
} 