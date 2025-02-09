import { notFound } from "next/navigation";
import { getProjects } from "@/app/utils/utils";
import { Button, Column, Flex, Heading, SmartImage, Text, Grid, Scroller, SmartLink } from "@/once-ui/components";
import { baseURL, person, about, techsTableIndex } from "@/app/resources";
import ScrollToHash from "@/components/ScrollToHash";
import { CustomMDX } from "@/components/mdx";
import TechButton from "@/components/TechButton";

interface WorkParams {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(date) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return fullDate;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getProjects();
  return posts.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(props: WorkParams) {
  const params = await props.params;

  const {
    slug
  } = params;

  let project = getProjects().find((project) => project.slug === slug);

  if (!project) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
  } = project.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    images,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/work/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Project(props: WorkParams) {
  const params = await props.params;
  let project = getProjects().find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            dateModified: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: project.metadata.image
              ? `https://${baseURL}${project.metadata.image}`
              : `https://${baseURL}/og?title=${project.metadata.title}`,
            url: `https://${baseURL}/work/${project.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{project.metadata.title}</Heading>
      </Column>
      {project.metadata.images.length > 0 && (
        <Flex
          fillWidth
          paddingLeft="40"
          paddingRight="40"
        >
          <SmartImage
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt="image"
            src={project.metadata.images[0]}
          />
        </Flex>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" vertical="center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(project.metadata.publishedAt)}
          </Text>
          {project.metadata.link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={project.metadata.link}
            >
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          )}
        </Flex>
        <CustomMDX source={project.content} />
        <Heading marginBottom="12" marginTop="12" as="h2">Technologies used</Heading>
        <Grid columns={6} fillWidth gap="l" marginBottom="40">
          {project.metadata.techs.map((tech, index) => (
            <TechButton key={index} small={true} techs={(about.technologies.techs)[techsTableIndex[tech]]}/>
          ))}
        </Grid>
        {project.metadata.images.length > 1 && (
          <>
          <Heading marginBottom="12" marginTop="12" as="h2">Gallery</Heading>
          <Scroller
            direction="row"
            maxHeight={12}
            fillWidth
            gap="16"
          >
            {project.metadata.images.map((img, index) => (
              <SmartImage
                key={index}
                src={img}
                radius="l"
                minWidth={24}
                minHeight={12}
              />
            ))}
          </Scroller>
          </>
        )}
      </Column>
      <ScrollToHash />
    </Column>
  );
}
