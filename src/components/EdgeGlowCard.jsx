"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import BorderGlow from "./BorderGlow";

const EdgeGlowCard = ({
  children,
  outerClassName = "",
  innerClassName = "",
  innerStyle = {},
  glowColor = "rgba(255,0,183,0.85)",
  secondaryGlowColor,
  mode = "follow",
  spotlight: _spotlight,
  topColor,
  rightColor,
  bottomColor,
  leftColor,
  style,
  animateOnView = true,
  glow = true,
  glass = true,
  borderRadius = 26,
  edgeSensitivity = 22,
  glowRadius = 52,
  glowIntensity = 1.2,
  coneSpread = 38,
  ...rest
}) => {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animateOnView);
  const [canGlow, setCanGlow] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanGlow(finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!animateOnView) {
      return undefined;
    }

    const node = wrapperRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10%",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [animateOnView]);

  const appearClasses = animateOnView ? clsx("card-appear", isVisible && "card-appear--visible") : "";
  const glowEnabled = glow && canGlow;

  const innerContent = (
    <div
      className={clsx("relative z-10 h-full w-full rounded-[inherit]", glass && "glass-readable", innerClassName)}
      style={innerStyle}
    >
      {children}
    </div>
  );

  if (glowEnabled) {
    return (
      <div
        {...rest}
        ref={wrapperRef}
        className={clsx(appearClasses, outerClassName)}
        style={style}
      >
        <BorderGlow
          borderRadius={borderRadius}
          backgroundColor="transparent"
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          glowColor="290 85 72"
          edgeSensitivity={edgeSensitivity}
          glowRadius={glowRadius}
          glowIntensity={glowIntensity}
          coneSpread={coneSpread}
          fillOpacity={0}
          className="overflow-visible"
        >
          {innerContent}
        </BorderGlow>
      </div>
    );
  }

  return (
    <div
      {...rest}
      ref={wrapperRef}
      className={clsx(appearClasses, outerClassName)}
      style={style}
    >
      {innerContent}
    </div>
  );
};

export default EdgeGlowCard;
