import { Card, SmartLink, Column, SmartImage, Text } from "@/once-ui/components";

export default function TechButton({ techs, small=false }){
    return (
        <Card
            radius="m"
            direction="column"
            center
            aspectRatio={1}
            >
            <SmartLink href={techs.link}>
                <Column center>
                <SmartImage
                    src={techs.icon}
                    alt={techs.name}
                    aspectRatio="1/1"
                    width={small ? 3.5 : 4}
                />
                {!small && (
                    <Text onBackground="neutral-medium" padding="8">{techs.name}</Text>
                )}
                </Column>
            </SmartLink>
        </Card>
    );
}