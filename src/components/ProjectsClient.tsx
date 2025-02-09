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
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          href={`work/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          link={project.metadata.link || ""}
          techs={project.metadata.techs}
        />
      ))}
    </Container>
    </>
  );
}
