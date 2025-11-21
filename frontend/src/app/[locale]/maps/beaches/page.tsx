// src/app/[locale]/maps/beaches/page.tsx
import { BeachesMapSection } from "@/components/sections/maps/beaches-map-section";
import { Main } from "@/components/layouts/main"


/**
 * Component for the Beaches page (using modular map structure)
 */
export default function BeachesPage() {

    return (
        <Main ariaLabelKey="main.beachesMaps">
            <BeachesMapSection />
        </Main>
    );
}
