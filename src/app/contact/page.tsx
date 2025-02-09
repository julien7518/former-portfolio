import { Flex, Icon, Input, Textarea, Button } from "@/once-ui/components";
import { contact } from "../resources";
import { baseURL } from "../resources";
import MobileTitle from "@/components/MobileTitle";

export async function generateMetadata() {
  const title = contact.title;
  const description = contact.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [
        {
          url: ogImage,
          alt: title,
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
      <MobileTitle page={contact} />
      <Input
        id="email"
        defaultValue=""
        label="Your email"
        hasPrefix={<Icon name="outlineEmail" size="s"/>}
      />
      <Input
        id="subject"
        defaultValue=""
        hasPrefix={<Icon name="subject" size="s"/>}
        label="Subject"
      />
      <Textarea
        id="message"
        defaultValue=""
        label="Message"
        resize="vertical"
        lines={10}
      />
      <Flex margin="12">
        <Button
          variant="primary"
          size="l"
          label="Send"
        />
      </Flex>
    </Flex>
  );
}