import { VetsMapSection } from "@/components/sections/maps/vets-map-section";
import { Main } from "@/components/layouts/main"


/**
 * Component for the Vets page (using modular map structure)
 */
export default function VetsPage() {

    return (
        <Main ariaLabelKey="main.vetsMaps">
            <VetsMapSection />
        </Main>
    );
}
