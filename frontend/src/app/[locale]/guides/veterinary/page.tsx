import { Main } from "@/components/layouts/main"
import { VetsGuideSection } from "@/components/sections/guides/vet-guide-section"

/**
 * Component for the Vets Cards page
 */
export default function VetsGuidePage() {

    return (
        <Main ariaLabelKey="main.vetsCardsContent">
            <VetsGuideSection />
        </Main>
    );
}
