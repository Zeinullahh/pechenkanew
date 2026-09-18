"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LocalizedPrivacyRedirect({ params }) {
  const router = useRouter();

  useEffect(() => {
    params.then(({ locale }) =>
      router.replace(`/${locale}/policies/ai-soc1/privacy/`)
    );
  }, [params, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
