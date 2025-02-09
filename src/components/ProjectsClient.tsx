"use client";
import { Column, Grid, Text, Flex } from "@/once-ui/components";
import { ProjectCard } from "./ProjectCard";
import { useIsMobile } from "./MobileContext";

export default function ProjectsClient({ projects }) {
  const isMobile = useIsMobile()

  const containerProps = isMobile ? {} : { columns: 2 };
  const Container = isMobile ? Column : Grid;

  return (
    <>
    {isMobile && (
      <Flex padding="20" center={true}>
        <Text marginBottom="s" variant="display-strong-xl">
          Projects
        </Text>
      </Flex>
    )}
    {/* @ts-ignore : Container is not imported but created just above */}
    <Container fillWidth gap="xl" marginBottom="40" paddingX="l" {...containerProps}>
      {projects.map((post) => (
        <ProjectCard
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          link={post.metadata.link || ""}
        />
      ))}
    </Container>
    </>
  );
}
