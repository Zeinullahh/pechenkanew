"use client";

import { useState } from "react";
import Header from "@/components/Header";
import AiSocGetModal from "@/components/AiSocGetModal";

export default function SiteHeader() {
  const [isGetModalOpen, setIsGetModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsGetModalOpen(true)} />
      <AiSocGetModal isOpen={isGetModalOpen} onClose={() => setIsGetModalOpen(false)} />
    </>
  );
}
