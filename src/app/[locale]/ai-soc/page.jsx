"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AiSocRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  useEffect(() => {
    router.replace(`/${locale}`);
  }, [router, locale]);

  return (
    <div className="min-h-screen bg-[#01091C] text-white flex items-center justify-center">
      <p className="text-white/60">Redirecting...</p>
    </div>
  );
}
