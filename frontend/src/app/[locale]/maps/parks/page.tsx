import { ParksMapSection } from "@/components/sections/maps/parks-map-section";
import { Main } from "@/components/layouts/main"


/**
 * Component for the Parks page (using modular map structure)
 */
export default function ParksPage() {

  return (
    <Main ariaLabelKey="main.parksMaps">
      <ParksMapSection />
    </Main>
  );
}
