import Stripe from 'stripe';

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Basic features',
      'Up to 3 projects',
      'Basic analytics',
      'Community support',
      '1,000 API calls per month'
    ],
  },
  PRO: {
    name: 'Pro',
    price: 99,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'All Free features',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'No Unextep branding',
      'Unlimited API calls'
    ],
  },
};

export const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  
  if (!key) {
    throw new Error('Stripe secret key is missing. Please set STRIPE_SECRET_KEY environment variable.');
  }
  
  return new Stripe(key);
};

export async function createCheckoutSession(customerId, priceId, successUrl, cancelUrl) {
  try {
    const stripe = getStripe();
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createCustomer(email, name) {
  try {
    const stripe = getStripe();
    
    const customer = await stripe.customers.create({
      email,
      name,
    });
    
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
} 