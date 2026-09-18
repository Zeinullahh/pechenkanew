"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import RequestDemoModal from "@/components/RequestDemoModal";
import BackToTopButton from "@/components/BackToTopButton";
import { FloatingText } from "@/components/FloatingText";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import ServicesBlock from "./ServicesBlock";
import PricingSection from "./PricingSection";
import CaseStudies from "./CaseStudies";
import HowWeWork from "./HowWeWork";
import TechnologyStack from "./TechnologyStack";


export default function DeveloperServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-[#01091C] px-4 pb-24 sm:px-6 lg:px-8">
        <Header onOpenModal={openModal} />

        <div className="relative z-10 mt-32 flex w-full max-w-7xl flex-col gap-16">
          <HeroSection onOpenModal={openModal} />
          <WhyChooseUs />
          <ServicesBlock />
          <PricingSection />
          <CaseStudies />
          <HowWeWork />
          <TechnologyStack />
          <div className="w-full mt-16">
            <FloatingText />
          </div>
        </div>
      </main>
      <BackToTopButton />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
