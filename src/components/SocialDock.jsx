"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandX, IconBrandYoutube, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { IconShare2 } from "@tabler/icons-react";

const SOCIAL_LINKS = [
  {
    title: "X",
    href: "https://x.com/silence_eng",
    icon: <IconBrandX className="h-full w-full text-black" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/silence-ai",
    icon: <IconBrandLinkedin className="h-full w-full text-[#0077B5]" />,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@silence_codes",
    icon: <IconBrandYoutube className="h-full w-full text-[#FF0000]" />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/silence.eng/",
    icon: <IconBrandInstagram className="h-full w-full text-[#E4405F]" />,
  },
];

export default function SocialDock({ className }) {
  const items = useMemo(
    () =>
      SOCIAL_LINKS.map((item) => ({
        ...item,
        target: "_blank",
        rel: "noreferrer noopener",
      })),
    []
  );

  const [open, setOpen] = useState(false);

  // White pill styling for visibility on dark backgrounds
  const bg = "bg-white/95";
  const border = "border border-black/10";

  return (
    <div
      className={clsx(
        "fixed z-50 flex flex-col items-end gap-3 pointer-events-auto",
        "bottom-24 right-3 md:bottom-24 md:right-8",
        className
      )}
      aria-label="Social links"
    >
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-full shadow-xl text-black",
          bg,
          border,
          "hover:shadow-2xl transition"
        )}
        aria-expanded={open}
        aria-label={open ? "Скрыть соцсети" : "Показать соцсети"}
      >
        <IconShare2 className="h-6 w-6" />
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-col items-end gap-2"
          >
            {items.map((item, idx) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.target}
                rel={item.rel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 + 0.05 }}
                className={clsx(
                  "flex h-12 w-12 items-center justify-center rounded-full text-black shadow-lg",
                  bg,
                  border,
                  "backdrop-blur-xl hover:border-black/20 hover:shadow-2xl"
                )}
              >
                <span className="sr-only">{item.title}</span>
                <div className="h-6 w-6">{item.icon}</div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
