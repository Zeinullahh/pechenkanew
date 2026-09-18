"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import PolicySidebar from "@/components/PolicySidebar";
import BackToTopButton from "@/components/BackToTopButton";
import Modal from "@/components/Modal";

export default function PolicyLayout({ title, subtitle, children, sections }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <h2 className="text-2xl text-gray-400 mb-8">{subtitle}</h2>}
          <div className="space-y-8">{children}</div>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
