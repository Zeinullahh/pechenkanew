"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxGlobe = () => {
  const { scrollY } = useScroll();
  // Equivalent to scrollY * -0.35
  const y = useTransform(scrollY, (value) => value * -0.35);

  return (
    <div className="parallax-globe fixed -top-12 left-0 w-full -z-10 pointer-events-none">
      <motion.img
        src="/globe_edge_optimized.svg"
        alt=""
        className="w-full h-auto scale-y-60 md:scale-y-85 lg:scale-y-100 globe-glow"
        style={{
          y,
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      />
    </div>
  );
};

export default ParallaxGlobe;
