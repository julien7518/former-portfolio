import type { Metadata, ResolvingMetadata } from "next";
import { baseURL, contact } from "@/app/resources";
import Contact from "./Contact";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    const title = contact.title;
    const description = contact.description;
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

export default function ContactLayout() {
  return <Contact />
}