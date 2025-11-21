import { Main } from "@/components/layouts/main"
import { ParksGuideSection } from "@/components/sections/guides/parks-guide-section"

/**
 * Component for the Parks Cards page
 */
export default function ParksGuidePage() {

    return (
        <Main ariaLabelKey="main.parksCardsContent">
            <ParksGuideSection />
        </Main>
    );
}
