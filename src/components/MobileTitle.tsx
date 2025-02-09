"use client";
import { Flex, Text } from "@/once-ui/components";
import { useIsMobile } from "./MobileContext";

export default function MobileTitle({ page }) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Flex padding="20" center={true}>
                <Text marginBottom="s" variant="display-strong-xl">
                    {page.title}
                </Text>
            </Flex>
        );
    }
}