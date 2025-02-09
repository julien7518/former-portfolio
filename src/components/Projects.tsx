import { getProjects } from "@/app/utils/utils";
import ProjectsClient from "./ProjectsClient";

interface RangeProps {
  range?: [number, number?];
}

export default function Projects({ range }: RangeProps) {
  const allProjects = getProjects();

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return <ProjectsClient projects={displayedProjects} />;
}