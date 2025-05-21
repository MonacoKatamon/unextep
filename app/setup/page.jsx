import dynamic from 'next/dynamic';

// Prevent any server-side rendering of the setup page
const SetupPageClient = dynamic(
  () => import('@/components/setup/setup-page-client'),
  {
    ssr: false,
    loading: () => <div>Loading setup...</div>
  }
);

export const metadata = {
  title: 'Setup - Unextep',
  description: 'Set up your Unextep SaaS application in minutes',
};

export default function SetupPage() {
  return <SetupPageClient />;
} 