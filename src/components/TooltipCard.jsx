"use client";

import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

const VIEWPORT_PADDING = 16;

const TooltipCard = ({ className = "", children }) => {
  const tooltipRef = useRef(null);
  const [horizontalOffset, setHorizontalOffset] = useState(0);

  useLayoutEffect(() => {
    const updatePosition = () => {
      const element = tooltipRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      let offset = 0;

      if (rect.left < VIEWPORT_PADDING) {
        offset = VIEWPORT_PADDING - rect.left;
      } else if (rect.right > viewportWidth - VIEWPORT_PADDING) {
        offset = (viewportWidth - VIEWPORT_PADDING) - rect.right;
      }

      setHorizontalOffset(offset);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, []);

  return (
    <div
      ref={tooltipRef}
      className={clsx(
        "absolute left-1/2 bottom-full mb-2 transform-gpu",
        className
      )}
      style={{
        transform: `translateX(calc(-50% + ${horizontalOffset}px))`,
      }}
    >
      {children}
    </div>
  );
};

export default TooltipCard;
