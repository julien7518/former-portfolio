import { getProjects } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import Projects from "@/components/Projects";
import { baseURL, person, work } from "@/app/resources";
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const title = work.title;
  const description = work.description;
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

export default function Work() {
  let allProjects = getProjects();

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects />
    </Column>
  );
}
