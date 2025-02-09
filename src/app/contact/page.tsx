import { Button, Flex, IconButton } from "@/once-ui/components";
import { social } from "@/app/resources/content";

export default function Contact() {
  return (
    <Flex
      paddingTop="20"
      paddingBottom="8"
      gap="8"
      wrap
      horizontal="center"
      fitWidth
    >
      {social.map(
        (item) =>
          item.link && (
            <>
              <Button
                className="s-flex-hide"
                key={item.name}
                href={item.link}
                prefixIcon={item.icon}
                label={item.name}
                size="s"
                variant="secondary"
              />
              <IconButton
                className="s-flex-show"
                size="l"
                key={`${item.name}-icon`}
                href={item.link}
                icon={item.icon}
                variant="secondary"
              />
            </>
          )
      )}
    </Flex>
  );
}
