"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const MobileContext = createContext<boolean | undefined>(undefined);

export function MobileProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
}

export function useIsMobile() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error("useIsMobile must be used within a MobileProvider");
  }
  return context;
}