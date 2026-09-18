"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  backgroundColors,
  itemClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const contentRefs = useRef([]);

  const defaultBackgroundColors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
  ];

  const colors = backgroundColors || defaultBackgroundColors;

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closestIndex = -1;
      let smallestDistance = Infinity;

      contentRefs.current.forEach((elem, index) => {
        if (elem) {
          const { top, height } = elem.getBoundingClientRect();
          const elemCenterY = top + height / 2;
          const distance = Math.abs(elemCenterY - centerY);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== -1 && closestIndex !== activeCard) {
        setActiveCard(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to set initial active card

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeCard]);

  return (
    <motion.div
      style={{
        background: colors[activeCard % colors.length],
      }}
      className="w-full"
      ref={ref}
    >
      <div className="relative mx-auto max-w-7xl grid grid-cols-12 gap-6 md:gap-10 px-4 py-12 sm:px-8 lg:px-10 lg:py-16 items-start">
        <div className="col-span-12 lg:col-span-5">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              ref={(el) => (contentRefs.current[index] = el)}
              className={cn("my-16 md:my-24 lg:my-40 last:mb-[30rem]", itemClassName)}
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.2 }}
                className="text-base md:text-lg mt-6 md:mt-10 max-w-lg text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "sticky top-0 h-screen col-span-7 hidden lg:flex items-start justify-center w-full pt-20",
          )}
        >
          <div className={cn(
            "w-full mx-auto overflow-hidden rounded-[28px]",
            contentClassName
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
