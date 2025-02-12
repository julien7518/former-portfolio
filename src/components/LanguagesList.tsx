"use client";
import { Flex, Column, Tag } from "@/once-ui/components";
import { person } from "@/app/resources";
import { useIsMobile } from "@/components/MobileContext";

export default function LanguagesList() {
  const isMobile = useIsMobile();

  return (
    <Column fillWidth>
      <Flex {...(isMobile ? { center : true } : {})} wrap gap="8">
        {person.languages.map((language, index) => (
          <Tag key={index} size="m">
            {language}
          </Tag>
        ))}
      </Flex>
    </Column>
  );
}