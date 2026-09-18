"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import GlowButton from "./GlowButton";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const SCROLL_THRESHOLD = 10;
const DESKTOP_WIDTH = 1130;

const SlncEnvHeader = ({ onOpenAdminModal }) => {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSystemsOpen, setIsSystemsOpen] = useState(false);
  const { t } = useLanguage();

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

  const toggleMobileMenu = () =>
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setIsSystemsOpen(false);
      return next;
    });

  const widthTarget = "100%";
  const condensedShift = isCondensed && isDesktop ? 24 : 0;


  const systemsItems = [
    { key: "ai-soc", label: t("header.nav.systemsAiSoc", "AI-CSD"), href: "/ai-soc" },
  ];

  const navItems = [
    { key: "home", label: t("header.nav.home", "Home"), href: "/" },
    { key: "systems", label: t("header.nav.systems", "Systems"), children: systemsItems },
  ];

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className="absolute inset-0 px-6 pt-24 pb-16"
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              exit={{ y: -80 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mx-auto flex max-w-sm flex-col space-y-6 text-lg">
                {navItems.map((item) => {
                  if (item.children) {
                    const expanded = isSystemsOpen;
                    return (
                      <div key={item.key} className="border-b border-white/20 pb-2 text-white">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-2 text-left"
                          onClick={() => setIsSystemsOpen((prev) => !prev)}
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
                              {item.children.map((child) => (
                                <Link
                                  key={child.key}
                                  href={child.href}
                                  className={clsx(
                                    "block rounded-lg px-3 py-2",
                                    child.isMuted
                                      ? "cursor-default text-white/50"
                                      : "text-white/90 hover:bg-white/10"
                                  )}
                                  onClick={() => {
                                    if (child.isMuted) return;
                                    setIsSystemsOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  aria-disabled={child.isMuted ? true : undefined}
                                  tabIndex={child.isMuted ? -1 : undefined}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="nav-link border-b border-white/20 py-2 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-4 flex flex-col gap-4">
                  <LanguageSelector align="left" />
                  <GlowButton
                    onClick={() => {
                      onOpenAdminModal?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    {t("header.cta.get", "Get")}
                  </GlowButton>
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
          className="mx-auto w-full max-w-7xl rounded-full border border-transparent transition-colors"
          animate={{
            width: widthTarget,
            borderRadius: 9999,
            backgroundColor: isCondensed ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
            borderColor: isCondensed ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0)",
            backdropFilter: isCondensed ? "blur(16px)" : "blur(0px)",
          }}
          transition={{
            width: { duration: 0.3, ease: "easeOut" },
            borderRadius: { duration: 0.3, ease: "easeOut" },
            backgroundColor: { duration: 0.3, ease: "easeOut" },
            borderColor: { duration: 0.3, ease: "easeOut" },
            backdropFilter: { duration: 0.3, ease: "easeOut" },
          }}
          style={{ minWidth: isDesktop || isCondensed ? undefined : "100%" }}
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
                  return (
                    <div
                      key={item.key}
                      className="relative"
                      onMouseEnter={() => setIsSystemsOpen(true)}
                      onMouseLeave={() => setIsSystemsOpen(false)}
                    >
                      <button
                        type="button"
                        className="nav-link inline-flex items-center gap-1 text-white bg-transparent appearance-none focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={isSystemsOpen}
                        onClick={() => setIsSystemsOpen((prev) => !prev)}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={clsx("h-4 w-4 transition", isSystemsOpen && "rotate-180")}
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
                        {isSystemsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute left-0 mt-2 w-max min-w-[8rem] overflow-hidden rounded-xl border border-white/10 bg-black/85 p-2 shadow-2xl backdrop-blur-xl"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.key}
                                href={child.href}
                                className={clsx(
                                  "block rounded-lg px-3 py-2 text-sm whitespace-nowrap",
                                  child.isMuted
                                    ? "cursor-default text-white/50"
                                    : "text-white hover:bg-white/10"
                                )}
                                onClick={(event) => {
                                  if (child.isMuted) {
                                    event.preventDefault();
                                  }
                                }}
                                aria-disabled={child.isMuted ? true : undefined}
                                tabIndex={child.isMuted ? -1 : undefined}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="nav-link text-white bg-transparent appearance-none focus:outline-none"
                  >
                    {item.label}
                  </Link>
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
                      ? { transform: "scale(0.9)", transformOrigin: "right center" }
                      : undefined
                  }
                >
                  <LanguageSelector align={isDesktop ? "right" : "left"} />
                </div>
                {isDesktop && (
                  <GlowButton onClick={onOpenAdminModal}>
                    {t("header.cta.get", "Get")}
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
        </motion.div>
      </motion.header>
    </>
  );
};

export default SlncEnvHeader;
