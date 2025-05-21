'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const SetupWizard = dynamic(() => import('@/components/setup/setup-wizard'), {
  loading: () => <div>Loading wizard...</div>
});

function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams();
  const initialPlan = searchParams?.get('plan') || 'free';
  return children({ initialPlan });
}

export default function SetupPageClient() {
  return (
    <Suspense fallback={<div>Loading setup...</div>}>
      <SearchParamsWrapper>
        {(props) => <SetupWizard {...props} />}
      </SearchParamsWrapper>
    </Suspense>
  );
} 