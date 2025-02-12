"use client";
import dynamic from 'next/dynamic';
import { MeshLambertMaterial } from 'three';
import lands from '@/app/resources/continents.json';
import { Spinner } from '@/once-ui/components';

const Globe = dynamic(() => import("react-globe.gl"), { 
  ssr: false,
  loading: () => <Spinner/>
});

export default function ModernGlobe() {
  const globeMeshMaterial = new MeshLambertMaterial({ color: '#bbbbbb' });

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
      waitForGlobeReady={false}
    />
  );
}
