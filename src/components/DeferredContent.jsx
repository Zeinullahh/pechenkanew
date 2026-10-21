"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredContent({ children, className = "", id, minHeight = 320, renderOnServer = false }) {
  const containerRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (renderOnServer) return undefined;
    if (isNear) return undefined;
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsNear(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "700px 0px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, [isNear, renderOnServer]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={renderOnServer
        ? { contentVisibility: "auto", containIntrinsicSize: `auto ${minHeight}px` }
        : isNear ? undefined : { minHeight }}
    >
      {renderOnServer || isNear ? children : null}
    </div>
  );
}
