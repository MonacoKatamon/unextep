# Unextep - Launch Your SaaS in Minutes

![Unextep Logo](public/images/logo.png)

Unextep is a complete toolkit for indie hackers and solo developers to launch their SaaS products quickly and efficiently. It comes with built-in authentication, payments, and deployment features, so you can focus on building your product rather than worrying about infrastructure.

## Features

- **Authentication System** - User registration, login, and profile management powered by Supabase Auth
- **Payment Processing** - Stripe integration for subscriptions and one-time payments
- **Beautiful Dashboard** - Responsive admin dashboard for users
- **One-Click Deploy** - Easy deployment to Vercel
- **Setup Wizard** - Guided setup process for connecting services
- **Chat Assistant** - AI-powered assistant to help with common questions
- **Customizable** - Easily customize the appearance and branding

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **Payments**: Stripe
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- Vercel account (for deployment)

### Installation

1. Clone the repository

```bash
git clone https://github.com/unextep/starter.git my-saas-app
cd my-saas-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRO_PRICE_ID=your_stripe_price_id
```

4. Run the development server

```bash
npm run dev
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL migrations found in the `supabase/migrations` directory
3. Set up Row Level Security policies according to the SQL scripts

### Stripe Setup

1. Create a Stripe account
2. Set up products and prices in the Stripe Dashboard
3. Configure the webhook endpoint to point to `/api/stripe/webhook`
4. Add the following events to your webhook:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Deployment

### Deploy to Vercel

The easiest way to deploy Unextep is using the Vercel Deploy Button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Funextep%2Fstarter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,STRIPE_PRO_PRICE_ID)

This will clone the repository and deploy it to Vercel. You'll need to set up the environment variables during the deployment process.

### Manual Deployment

Alternatively, you can deploy the app manually:

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy!

## Customization

### Changing the Appearance

1. Edit the Tailwind configuration in `tailwind.config.js` to change colors and other theme settings
2. Update the logo and favicon in the `public/images` directory
3. Modify the components in the `components` directory to change the layout and design

### Adding Custom Features

1. Create new components in the `components` directory
2. Add new API routes in the `app/api` directory
3. Modify the database schema in the `supabase/migrations` directory

## License

This project is licensed under the MIT License

## Support

If you need help with Unextep, please reach out to us at support@unextep.com or join our Discord community.

---

Built with ❤️ by the Unextep team 