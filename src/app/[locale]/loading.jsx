"use client";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  // Show loader immediately; no artificial delay so it reflects actual loading state.
  return <LoadingSpinner isLoading />;
}
