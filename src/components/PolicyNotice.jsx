"use client";

import { GB } from "country-flag-icons/react/3x2";

const PolicyNotice = ({ message = "The policies are available only in English" }) => (
  <div className="mx-auto mb-6 flex w-full max-w-2xl items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white sm:text-base backdrop-blur-xl">
    <span className="h-4 w-6 overflow-hidden rounded-[4px] border border-white/20">
      <GB className="h-full w-full" />
    </span>
    <span className="leading-tight">{message}</span>
  </div>
);

export default PolicyNotice;
