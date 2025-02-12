"use client";
import { useEffect, useState } from 'react';
import { MeshLambertMaterial } from 'three';
import lands from '@/app/resources/continents.json';

export default function ModernGlobe() {
  const [Globe, setGlobe] = useState<any>(null);
  const globeMeshMaterial = new MeshLambertMaterial({ color: '#bbbbbb' });

  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobe(() => mod.default);
    });
  }, []);

  if (!Globe) {
    return <></>;
  }

  return (
    <Globe
      width={300}
      height={290}
      globeMaterial={globeMeshMaterial}
      backgroundColor="#00000000"
      showAtmosphere={false}
      hexPolygonsData={lands.features}
      hexPolygonColor={() => '#eeeeee'}
      hexPolygonAltitude={0.05}
      hexPolygonResolution={3}
      hexPolygonMargin={0.24}
      showGraticules={true}
    />
  );
}
