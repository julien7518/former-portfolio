"use client";
import { Grid } from "@/once-ui/components";
import TechButton from "@/components/TechButton";
import { useIsMobile } from "@/components/MobileContext";

export default function GridTechnologies({ technologies }){
  const isMobile = useIsMobile();

  return (
    <Grid columns={isMobile ? 3 : 5} fillWidth gap="l" marginBottom="40">
      {technologies.map((techs, index) => (
        techs.display && (<TechButton key={index} small={isMobile} techs={techs}/>)
      ))}
    </Grid>
  );
}