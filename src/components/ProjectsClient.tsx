"use client";
import { Column, Grid } from "@/once-ui/components";
import { ProjectCard } from "@/components/ProjectCard";
import { useIsMobile } from "@/components/MobileContext";
import MobileTitle from "@/components/MobileTitle";
import { work } from "@/app/resources";

export default function ProjectsClient({ projects }) {
  const isMobile = useIsMobile()

  const containerProps = isMobile ? {} : { columns: 2 };
  const Container = isMobile ? Column : Grid;

  return (
    <>
    <MobileTitle page={work} />
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
