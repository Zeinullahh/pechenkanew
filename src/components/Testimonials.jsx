"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import EdgeGlowCard from "./EdgeGlowCard";

const Testimonials = () => {
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const cards = useMemo(
    () => [
      { type: "image", i: 1 },
      { type: "image", i: 2 },
      { type: "image", i: 3 },
      { type: "video", i: 1 },
      { type: "video", i: 2 },
    ],
    []
  );

  const featured = cards[0];
  const rowA = cards.slice(1, 4); // image 2,3 + video1 (we'll render compact nicely)
  const rowB = cards.slice(4); // video2

  const [ref, inView] = useInViewOnce({
    rootMargin: "-15% 0px -20% 0px",
    threshold: 0.15,
  });

  return (
    <section ref={ref} className="relative w-full py-14 sm:py-16">
      {/* Cinematic background (FIRST THEME) but with your palette */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FF00B7]/20 blur-3xl t-aurora1" />
        <div className="absolute right-[-90px] top-[-60px] h-80 w-80 rounded-full bg-[rgba(32,140,255,0.35)] blur-3xl t-aurora2" />
        <div className="absolute left-1/2 top-[58%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[#FF00B7]/10 blur-3xl t-aurora3" />

        <div className="absolute inset-0 opacity-[0.12] mix-blend-screen">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:52px_52px]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,rgba(1,9,28,0.35)_48%,rgba(1,9,28,0.92)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] t-noise" />
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-0">
        {/* HEADER: keep your font sizing and text */}
        <div
          className={[
            "space-y-3 text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            <span className="t-titleGlow">Testimonials</span>
          </h2>
        </div>

        {/* FEATURED (FIRST THEME) but using SECOND info/content */}
        <div
          className={[
            "relative mx-auto mt-10 max-w-3xl transition-all duration-700 delay-150",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <FeaturedCard
            item={featured}
            palette={defaultGlowPalette}
          />
        </div>

        {/* MARQUEE ROWS (FIRST THEME) */}
        <div
          className={[
            "mt-10 space-y-4 transition-all duration-700 delay-300",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          ].join(" ")}
        >
          <MarqueeRow
            items={[...rowA, ...cards.slice(0, 1)]} // keep it rich + seamless
            palette={defaultGlowPalette}
          />
          <MarqueeRow
            items={[...cards.slice(2), ...rowB, ...cards.slice(1, 2)]}
            palette={defaultGlowPalette}
            reverse
          />
        </div>
      </div>

      <style jsx>{`
        .t-titleGlow {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 0, 183, 0.92) 35%,
            rgba(32, 140, 255, 0.92) 70%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 28px rgba(255, 0, 183, 0.18),
            0 0 30px rgba(32, 140, 255, 0.12);
        }

        .t-aurora1 {
          animation: float1 10s ease-in-out infinite;
        }
        .t-aurora2 {
          animation: float2 12s ease-in-out infinite;
        }
        .t-aurora3 {
          animation: float3 14s ease-in-out infinite;
        }
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(32px, 18px);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-26px, 24px);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -18px);
          }
        }

        .t-noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        @media (prefers-reduced-motion: reduce) {
          .t-aurora1,
          .t-aurora2,
          .t-aurora3 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

function useInViewOnce(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, options]);

  return [ref, inView];
}

function FeaturedCard({ item, palette }) {
  // BIG featured uses the same content as your cards (no new text)
  const isVideo = item.type === "video";
  const i = item.i ?? 1;

  return (
    <EdgeGlowCard
      mode="static"
      spotlight
      {...palette}
      outerClassName="group relative z-10 rounded-[34px] p-[2px] edge-glow-card--default"
      innerClassName="glass-card rounded-[30px]"
    >
      <div
        className="relative rounded-[28px] border border-white/12 p-7 sm:p-8 t-feature"
        style={{
          boxShadow: "0 18px 45px rgba(5,12,32,0.55)",
          background:
            "rgba(8, 8, 14, 0.55)",
        }}
      >
        {/* cinematic shine */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <div className="t-shine absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {!isVideo ? (
          <FeaturedImageContent i={i} />
        ) : (
          <FeaturedVideoContent />
        )}

        <style jsx>{`
          .t-feature {
            transition: transform 600ms ease, filter 600ms ease;
          }
          .group:hover .t-feature {
            transform: translateY(-4px) scale(1.01);
            filter: drop-shadow(0 22px 34px rgba(255, 0, 183, 0.12))
              drop-shadow(0 18px 30px rgba(32, 140, 255, 0.1));
          }

          .t-shine {
            animation: shine 3.8s ease-in-out infinite;
          }
          @keyframes shine {
            0% {
              transform: translateX(-35%) rotate(12deg);
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            45% {
              transform: translateX(175%) rotate(12deg);
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .t-shine {
              animation: none !important;
            }
            .t-feature {
              transform: none !important;
              filter: none !important;
            }
          }
        `}</style>
      </div>
    </EdgeGlowCard>
  );
}

function FeaturedImageContent({ i }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative z-10 text-center">
      {/* avatar ring */}
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full p-[2px] t-ring">
        <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-black/30">
          {imgOk ? (
            <img
              src={`/testimonials/client${i}.jpg`}
              alt={`Client ${i}`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-white/85 text-base font-semibold">
              C{i}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <span className="text-blue-400 text-lg leading-none">★★★★★</span>
        <span className="ml-2 text-white/80 text-sm">4.{8 + (i % 2)}</span>
      </div>

      <p className="mt-4 text-white/65 text-base sm:text-lg">
        "Excellent results and reliable team — delivered on time."
      </p>

      <style jsx>{`
        .t-ring {
          background: linear-gradient(
            90deg,
            rgba(255, 0, 183, 0.95),
            rgba(32, 140, 255, 0.55)
          );
          box-shadow: 0 0 34px rgba(255, 0, 183, 0.2),
            0 0 34px rgba(32, 140, 255, 0.14);
        }
      `}</style>
    </div>
  );
}

function FeaturedVideoContent() {
  return (
    <div className="relative z-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative h-56 sm:h-64 rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -left-16 -top-14 h-52 w-52 rounded-full bg-[#FF00B7]/20 blur-2xl" />
            <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[rgba(32,140,255,0.22)] blur-2xl" />
          </div>

          <div className="relative grid place-items-center">
            <div className="t-pulseRing absolute h-20 w-20 rounded-full" />
            <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 8.5v7l7-3.5-7-3.5z" fill="rgba(255,255,255,0.92)" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            🎥 Video Testimonial
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center">
          <span className="text-blue-400 text-lg leading-none">★★★★★</span>
          <span className="ml-2 text-white/80 text-sm">4.9</span>
        </div>

        <p className="mt-4 text-white/65 text-base sm:text-lg text-center">
          "Excellent results and reliable team — delivered on time."
        </p>
      </div>

      <style jsx>{`
        .t-pulseRing {
          background: radial-gradient(
            circle,
            rgba(255, 0, 183, 0.25),
            rgba(32, 140, 255, 0.18),
            transparent 65%
          );
          animation: ring 1.6s ease-in-out infinite;
        }
        @keyframes ring {
          0% {
            transform: scale(0.92);
            opacity: 0.7;
          }
          60% {
            transform: scale(1.25);
            opacity: 0.15;
          }
          100% {
            transform: scale(0.92);
            opacity: 0.7;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-pulseRing {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function MarqueeRow({ items, palette, reverse = false }) {
  const list = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`t-marquee flex w-max gap-6 py-2 ${reverse ? "t-reverse" : ""}`}
        style={{ ["--duration"]: "40s" }}
      >
        {list.map((it, idx) => (
          <div key={`${it.type}-${it.i}-${idx}`} className="shrink-0">
            <CompactCard item={it} palette={palette} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#000000] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#000000] to-transparent" />

      <style jsx>{`
        .t-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        .t-reverse {
          animation-direction: reverse;
        }
        .t-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-marquee {
            animation: none !important;
            transform: none !important;
            flex-wrap: wrap;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function CompactCard({ item, palette }) {
  const isVideo = item.type === "video";
  const i = item.i ?? 1;
  const [imgOk, setImgOk] = useState(true);

  return (
    <EdgeGlowCard
      mode="static"
      spotlight
      {...palette}
      outerClassName="group relative z-10 rounded-[30px] p-[2px] edge-glow-card--default flex-shrink-0"
      innerClassName="glass-card rounded-[26px]"
    >
      <div
        className="relative w-80 rounded-[22px] border border-white/12 p-6"
        style={{
          boxShadow: "0 18px 45px rgba(5,12,32,0.55)",
          background:
            "rgba(8, 8, 14, 0.55)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
          <div className="t-shine absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {!isVideo ? (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full p-[2px] t-ring">
              <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-black/30">
                {imgOk ? (
                  <img
                    src={`/testimonials/client${i}.jpg`}
                    alt={`Client ${i}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-white/85 text-sm font-semibold">
                    C{i}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center relative z-10">
              <span className="text-blue-400">★★★★★</span>
              <span className="ml-2 text-white/80">4.{8 + (i % 2)}</span>
            </div>

            <p className="mt-3 text-white/65 relative z-10">
              "Excellent results and reliable team — delivered on time."
            </p>
          </>
        ) : (
          <>
            <div
              className="w-full h-44 bg-black/40 rounded flex items-center justify-center text-white relative z-10 overflow-hidden"
              aria-label="Video testimonial placeholder"
            >
              <div className="pointer-events-none absolute inset-0 opacity-80">
                <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-[#FF00B7]/20 blur-2xl" />
                <div className="absolute -right-14 -bottom-12 h-44 w-44 rounded-full bg-[rgba(32,140,255,0.22)] blur-2xl" />
              </div>

              <div className="relative grid place-items-center">
                <div className="t-pulseRing absolute h-16 w-16 rounded-full" />
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 8.5v7l7-3.5-7-3.5z"
                      fill="rgba(255,255,255,0.92)"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                🎥 Video Testimonial
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center relative z-10">
              <span className="text-blue-400">★★★★★</span>
              <span className="ml-2 text-white/80">4.9</span>
            </div>

            <p className="mt-3 text-white/65 relative z-10 text-center">
              "Excellent results and reliable team — delivered on time."
            </p>
          </>
        )}

        <style jsx>{`
          .group:hover {
            transform: translateY(-6px) scale(1.02);
            filter: drop-shadow(0 18px 28px rgba(255, 0, 183, 0.1))
              drop-shadow(0 16px 26px rgba(32, 140, 255, 0.08));
            transition: transform 500ms ease, filter 500ms ease;
          }

          .t-ring {
            background: linear-gradient(
              90deg,
              rgba(255, 0, 183, 0.95),
              rgba(32, 140, 255, 0.55)
            );
            box-shadow: 0 0 26px rgba(255, 0, 183, 0.2),
              0 0 26px rgba(32, 140, 255, 0.14);
          }

          .t-shine {
            animation: shine 3.8s ease-in-out infinite;
          }
          @keyframes shine {
            0% {
              transform: translateX(-35%) rotate(12deg);
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            45% {
              transform: translateX(175%) rotate(12deg);
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }

          .t-pulseRing {
            background: radial-gradient(
              circle,
              rgba(255, 0, 183, 0.25),
              rgba(32, 140, 255, 0.18),
              transparent 65%
            );
            animation: ring 1.6s ease-in-out infinite;
          }
          @keyframes ring {
            0% {
              transform: scale(0.92);
              opacity: 0.7;
            }
            60% {
              transform: scale(1.25);
              opacity: 0.15;
            }
            100% {
              transform: scale(0.92);
              opacity: 0.7;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .t-shine,
            .t-pulseRing {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </EdgeGlowCard>
  );
}

export default Testimonials;
