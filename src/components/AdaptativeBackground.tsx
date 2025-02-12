"use client";
import { Background } from "@/once-ui/components";
import { useIsMobile } from "@/components/MobileContext";

export default function AdaptativeBackground() {
  const isMobile = useIsMobile();

  return (
    <Background
      position="absolute"
      mask={{
        cursor: !isMobile,
        x: 0,
        y: 0
      }}
      dots={{
        color: 'accent-on-background-strong',
        display: true,
        opacity: 100,
        size: '64'
      }}
      grid={{
        color: 'neutral-alpha-strong',
        display: true,
        height: 'var(--static-space-32)',
        opacity: 100,
        width: 'var(--static-space-32)'
      }}
      lines={{
        display: true,
        opacity: 100,
        size: '24'
      }}
    />
  );
}