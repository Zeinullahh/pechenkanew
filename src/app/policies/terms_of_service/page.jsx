"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TermsOfServiceRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/policies/ai-soc1/terms_of_service/');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
