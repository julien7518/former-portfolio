"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/components/MobileContext";
import { Heading, Flex, Text, Button, RevealFx, Column } from "@/once-ui/components";
import { baseURL, home, about, person } from "@/app/resources";
import ModernGlobe from "@/components/ModernGlobe";

export default function Home() {
  const isMobile = useIsMobile();
  const [isGlobeVisible, setIsGlobeVisible] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationComplete) {
      setIsGlobeVisible(true);
    }
  }, [animationComplete]);

  return (
    <Column center maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Flex direction="row" tabletDirection="column" mobileDirection="column" fillWidth paddingX={isMobile ? "l" : undefined} paddingY="m" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text align={isMobile ? "justify" : undefined} wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">{about.title}</Flex>
            </Button>
          </RevealFx>
        </Column>
        <Column style={{minWidth: "300px", minHeight: "290px"}} center>
            {isGlobeVisible && <ModernGlobe />}
        </Column>
      </Flex>
    </Column>
  );
}
