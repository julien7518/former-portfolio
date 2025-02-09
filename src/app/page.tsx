import { generateMetadata } from "./HomeMetaData";
import Home from "@/components/Home";

export { /* @next-codemod-error `generateMetadata` export is re-exported. Check if this component uses `params` or `searchParams`*/
generateMetadata };

export default function Page() {
  return <Home />;
}