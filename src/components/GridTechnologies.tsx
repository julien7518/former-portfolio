"use client";
import { Grid } from "@/once-ui/components";
import TechButton from "./TechButton";
import { useIsMobile } from "./MobileContext";

export default function GridTechnologies({ technologies }){
    const isMobile = useIsMobile();

    return (
        <Grid columns={isMobile ? 3 : 5} fillWidth gap="l" marginBottom="40">
        {technologies.map((techs, index) => (
          techs.display && (
            <TechButton key={index} small={true} techs={techs}/>
        )
        ))}
      </Grid>
    );
}