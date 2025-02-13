import { Column, Flex, Heading, Text } from "@/once-ui/components"
import { baseURL, person, about, social } from "@/app/resources";
import TableOfContents from "@/components/TableOfContents";
import GridTechnologies from "@/components/GridTechnologies";
import LanguagesList from "@/components/LanguagesList";
import styles from "@/components/TableOfContents.module.scss";
import React from "react";
import type { Metadata , ResolvingMetadata} from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const title = about.title;
  const description = about.description;
  const previousOGImages = (await parent).openGraph?.images || []
  const previousTwitterImage = (await parent).twitter?.images || []
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [{ url: ogImage, alt: title }, ...previousOGImages],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage, ...previousTwitterImage],
    },
  };
}

export default function About() {
  const structure = about.work.display ? 
  [
    about.intro.title,
    about.work.title,
    about.technologies.title,
    about.studies.title,
  ] : 
  [
    about.intro.title,
    about.technologies.title,
    about.studies.title,
  ];

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
      
      <Column
        left="0"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        position="fixed"
        paddingLeft="24"
        gap="32"
        hide="s"
      >
        <TableOfContents structure={structure} />
      </Column>
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
              marginBottom="8"
            >
              {person.role}
            </Text>
            <LanguagesList />
          </Column>

          <Column
            textVariant="body-default-l"
            fillWidth
            gap="m"
            marginBottom="l"
          >
            {about.intro.description}
          </Column>

          {about.work.display && (
            <> 
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                  >
                    <Flex
                      fillWidth
                      horizontal="space-between"
                      vertical="end"
                      marginBottom="4"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.JSX.Element, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        )
                      )}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
          <>
            <Heading
              as="h2"
              id={about.technologies.title}
              variant="display-strong-s"
              marginBottom="m"
            >
              {about.technologies.title}
            </Heading>
            <GridTechnologies technologies={about.technologies.techs}/>
          </>
          <>
            <Heading
              as="h2"
              id={about.studies.title}
              variant="display-strong-s"
              marginBottom="m"
            >
              {about.studies.title}
            </Heading>
            <Column fillWidth gap="l" marginBottom="40">
              {about.studies.institutions.map((institution, index) => (
                <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                  <Text id={institution.name} variant="heading-strong-l">
                    {institution.name}
                  </Text>
                  <Text
                    variant="body-default-s"
                    onBackground="neutral-weak"
                    marginBottom="xs"
                  >
                    {institution.location}
                  </Text>
                  <Text
                    variant="heading-default-xs"
                    onBackground="neutral-weak"
                  >
                    {institution.description}
                  </Text>
                </Column>
              ))}
            </Column>
          </>
        </Column>
      </Flex>
    </Column>
  );
}
