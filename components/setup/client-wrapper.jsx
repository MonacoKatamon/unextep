'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams();
  const initialPlan = searchParams?.get('plan') || 'free';
  return children({ initialPlan });
}

export default function ClientWrapper({ children }) {
  return (
    <Suspense fallback={<div>Loading parameters...</div>}>
      <SearchParamsWrapper>
        {(props) => children(props)}
      </SearchParamsWrapper>
    </Suspense>
  );
} 