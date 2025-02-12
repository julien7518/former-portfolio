import { Carousel, Column, Flex, Heading, SmartLink, Text, AvatarGroup } from "@/once-ui/components";
import { about, techsTableIndex } from "@/app/resources";

interface ProjectCardProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  link: string;
  techs: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  link,
  techs,
}) => {
  return (
    <Column fillWidth>
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        images={images.map((image) => ({
          src: image,
          alt: title,
        }))}
      />
      {images.length <= 1 && (
        <>
        <span style={{height: "15px"}}></span>
        </>
      )}
      <Column
        fillWidth
        paddingX="s"
        paddingTop="12"
      >
          <Flex flex={5} paddingBottom="12">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
          <Column gap={description ? "16" : "0"}>
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            <Flex gap="24" wrap>
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Learn more</Text>
                </SmartLink>
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
            {techs.length > 0 && (
              <AvatarGroup
                avatars={
                  techs.map((tech) => (
                    (about.technologies.techs)[techsTableIndex[tech]] ? {src: (about.technologies.techs)[techsTableIndex[tech]].icon} : {}
                  ))
                }
                limit={3}
                size="m"
              />
            )}
          </Column>
      </Column>
    </Column>
  );
};
