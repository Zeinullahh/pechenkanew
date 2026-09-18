"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation"; // Updated import
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import GlowButton from "./GlowButton";
import LanguageSelector from "./LanguageSelector";
import CountrySelectModal from "./CountrySelectModal";
import EmailSecurityModal from "./EmailSecurityModal";
import GlassSurface from "./GlassSurface";
import { useLanguage } from "@/contexts/LanguageContext";

const SCROLL_THRESHOLD = 4;
const DESKTOP_WIDTH = 1130;

const Header = ({ onOpenModal, hideCta = false }) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const isPolicyPage = pathname?.startsWith("/policies");
  const [isCondensed, setIsCondensed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);
  const [emailSecurityOpen, setEmailSecurityOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState("pricing");
  const { t } = useLanguage();

  const sectionItems = useMemo(() => [
    { key: "pricing", label: t("header.sections.pricing", "Pricing") },
    { key: "compliance", label: t("header.sections.compliance", "Compliance") },
    { key: "resources", label: t("header.sections.resources", "Resources") },
    { key: "platform-overview", label: t("header.sections.platform", "Platform") },
    { key: "faq", label: t("header.sections.faq", "FAQ") },
  ], [t]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    if (pathname === "/") {
      // On home page, open the modal
      if (onOpenModal) {
        onOpenModal();
      }
    } else {
      // On other pages, try to scroll to contact form
      scrollToContact();
    }
  };

  const handleContactLink = (e) => {
    <Link
      href="/#contact-form"
      onClick={handleContactLink}
      className="text-sm font-semibold text-white/80 transition hover:text-white"
    >
      {t("header.cta.contact", "Contact")}
    </Link>
    if (pathname === "/") {
      e.preventDefault();
      if (onOpenModal) {
        onOpenModal();
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_WIDTH);
    };

    const handleScroll = () => {
      setIsCondensed(window.scrollY > SCROLL_THRESHOLD);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMainPage) return undefined;

    let animationFrame = null;
    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;
      let nextSection = sectionItems[0].key;

      sectionItems.forEach((item) => {
        const target = document.getElementById(item.key);
        if (target && target.getBoundingClientRect().top <= activationLine) {
          nextSection = item.key;
        }
      });

      setActiveSectionId(nextSection);
      animationFrame = null;
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isMainPage, sectionItems]);

  const toggleMobileMenu = () =>
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setOpenMobileDropdown(null);
      return next;
    });

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = 96;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSectionId(sectionId);
    setOpenDesktopDropdown(null);
    setOpenMobileDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const widthTarget = "100%";

  const condensedShift = isCondensed && isDesktop ? 24 : 0;

  const instructionsItems = [
    { key: "instructions-ai-soc", label: t("header.nav.instructionsAiSoc", "AI-CSD"), href: "/instructions/ai-soc" },
    { key: "instructions-supreme", label: t("header.nav.instructionsSupreme", "Supreme"), href: "/instructions/supreme" },
  ];

  const navItems = [
    { key: "mail", label: t("header.nav.mail", "Mail"), onClick: () => setEmailSecurityOpen(true) },
    ...(isMainPage ? [{
      key: "sections",
      label: t("header.nav.sections", "Sections"),
      children: sectionItems.map((item) => ({
        ...item,
        onClick: () => scrollToSection(item.key),
        isActive: item.key === activeSectionId,
      })),
    }] : []),
    { key: "instructions", label: t("header.nav.instructions", "Instructions"), children: instructionsItems },
  ];

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className="absolute inset-0 px-6 pt-24 pb-16 overflow-hidden"
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              exit={{ y: -80 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mx-auto flex w-full max-w-sm flex-col space-y-6 text-lg">
                {navItems.map((item) => {
                  if (item.children) {
                    const expanded = openMobileDropdown === item.key;
                    return (
                      <div key={item.key} className="border-b border-white/20 pb-2 text-white">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-2 text-left"
                          onClick={() => setOpenMobileDropdown(expanded ? null : item.key)}
                          aria-expanded={expanded}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={clsx("h-4 w-4 transition", expanded && "rotate-180")}
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M10.59 0.589966L6 5.16997L1.41 0.589966L0 1.99997L6 7.99997L12 1.99997L10.59 0.589966Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="mt-2 space-y-2 pl-2"
                            >
                              {item.children.map((child) => {
                                if (child.href) {
                                  return (
                                    <Link
                                      key={child.key}
                                      href={child.href}
                                      className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10"
                                      onClick={() => {
                                        setOpenMobileDropdown(null);
                                        setIsMobileMenuOpen(false);
                                      }}
                                    >
                                      {child.label}
                                    </Link>
                                  );
                                }

                                if (child.onClick) {
                                  return (
                                    <button
                                      key={child.key}
                                      type="button"
                                      className="block w-full rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/10"
                                      onClick={child.onClick}
                                      aria-current={child.isActive ? "true" : undefined}
                                    >
                                      {child.label}
                                    </button>
                                  );
                                }

                                return (
                                  <button
                                    key={child.key}
                                    type="button"
                                    className="block w-full rounded-lg px-3 py-2 text-left text-white/60 cursor-default"
                                    onClick={(event) => event.preventDefault()}
                                    aria-disabled
                                  >
                                    {child.label}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return item.href ? (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="nav-link border-b border-white/20 py-2 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.key}
                      type="button"
                      className="nav-link border-b border-white/20 py-2 text-white text-left bg-transparent appearance-none focus:outline-none"
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        else if (item.opensModal) onOpenModal?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 flex flex-col gap-4 w-full items-center">
                  <LanguageSelector align="left" allowedLocales={isPolicyPage ? ["en", "ru"] : undefined} />
                  {!hideCta && isMainPage && (
                    <GlowButton
                      onClick={() => {
                        onOpenModal?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t("header.cta.contact", "Contact")}
                    </GlowButton>
                  )}
                  {!hideCta && !isMainPage && !isPolicyPage && (
                    <GlowButton
                      onClick={() => {
                        onOpenModal?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {pathname === "/ai-soc" || pathname === "/ai-soc/"
                        ? t("header.cta.get", "Get")
                        : t("header.cta.contact", "Contact")}
                    </GlowButton>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 top-2 z-50 w-full px-3 sm:px-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          className="mx-auto w-full max-w-7xl"
          animate={{
            width: widthTarget,
          }}
          transition={{
            width: { duration: 0.3, ease: "easeOut" },
          }}
          style={{ minWidth: isDesktop || isCondensed ? undefined : "100%" }}
        >
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={isCondensed ? 999 : 22}
            backgroundOpacity={isCondensed ? 0.18 : 0}
            saturation={1.7}
            blur={24}
            displace={0.5}
            distortionScale={-140}
            redOffset={0}
            greenOffset={8}
            blueOffset={16}
            brightness={56}
            opacity={0.9}
            mixBlendMode="screen"
            className={clsx("header-glass-surface", isCondensed && "header-glass-surface--condensed")}
          >
            <motion.div
              className="flex items-center justify-between px-3 py-2 sm:px-7 sm:py-3 lg:px-9"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
            <motion.div
              className="flex shrink-0 items-center"
              animate={{ x: condensedShift }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link href="/" className="flex shrink-0 items-center">
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  width={100}
                  height={50}
                  priority
                  style={{ height: "auto", width: "clamp(78px, 24vw, 120px)", maxWidth: "120px" }}
                />
              </Link>
            </motion.div>

            <nav
              className={clsx(
                "relative items-center gap-8",
                isDesktop ? "flex" : "hidden"
              )}
            >
              {navItems.map((item) => {
                if (item.children) {
                  const expanded = openDesktopDropdown === item.key;
                  return (
                    <div
                      key={item.key}
                      className="relative"
                      onMouseEnter={() => setOpenDesktopDropdown(item.key)}
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                    >
                      <button
                        type="button"
                        className="nav-link inline-flex items-center gap-1 bg-transparent text-white appearance-none focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={expanded}
                        onClick={() => setOpenDesktopDropdown(expanded ? null : item.key)}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={clsx("h-4 w-4 transition", expanded && "rotate-180")}
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M10.59 0.589966L6 5.16997L1.41 0.589966L0 1.99997L6 7.99997L12 1.99997L10.59 0.589966Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute left-0 mt-2 w-max min-w-[11rem] overflow-hidden rounded-lg border border-white/15 bg-black/55 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                          >
                            {item.children.map((child) => {
                              if (child.href) {
                                return (
                                  <Link
                                    key={child.key}
                                    href={child.href}
                                    className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 whitespace-nowrap"
                                    onClick={() => setOpenDesktopDropdown(null)}
                                  >
                                    {child.label}
                                  </Link>
                                  );
                                }

                                if (child.onClick) {
                                  return (
                                    <button
                                      key={child.key}
                                      type="button"
                                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10 whitespace-nowrap"
                                      onClick={child.onClick}
                                      aria-current={child.isActive ? "true" : undefined}
                                    >
                                      {child.label}
                                    </button>
                                  );
                                }

                                return (
                                <span
                                  key={child.key}
                                  className="block rounded-lg px-3 py-2 text-sm text-white/60 whitespace-nowrap"
                                  aria-disabled
                                >
                                  {child.label}
                                </span>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return item.href ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="nav-link text-white bg-transparent appearance-none focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.key}
                    type="button"
                    className="nav-link text-white bg-transparent appearance-none focus:outline-none"
                    onClick={item.onClick || (item.opensModal ? onOpenModal : undefined)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-3"
                animate={{ x: -condensedShift }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className="flex-shrink-0"
                  style={
                    !isDesktop
                      ? { transform: "scale(0.85)", transformOrigin: "right center" }
                      : undefined
                  }
                >
                  <LanguageSelector align={isDesktop ? "right" : "center"} allowedLocales={isPolicyPage ? ["en", "ru"] : undefined} />
                </div>
                {isDesktop && isMainPage && !hideCta && (
                  <GlowButton onClick={handleContactClick}>
                    {t("header.cta.contact", "Contact")}
                  </GlowButton>
                )}
                {isDesktop && !isMainPage && !isPolicyPage && !hideCta && (
                  <GlowButton onClick={onOpenModal}>
                    {pathname === "/ai-soc" || pathname === "/ai-soc/"
                      ? t("header.cta.get", "Get")
                      : t("header.cta.contact", "Contact")}
                  </GlowButton>
                )}
              </motion.div>

              <motion.button
                className={clsx("p-2 text-white", isDesktop ? "hidden" : "inline-flex")}
                onClick={toggleMobileMenu}
                animate={{ x: -condensedShift }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>
            </motion.div>
          </GlassSurface>
        </motion.div>
      </motion.header>
      <CountrySelectModal isOpen={countrySelectOpen} onClose={() => setCountrySelectOpen(false)} />
      <EmailSecurityModal isOpen={emailSecurityOpen} onClose={() => setEmailSecurityOpen(false)} />
    </>
  );
};

export default Header;
