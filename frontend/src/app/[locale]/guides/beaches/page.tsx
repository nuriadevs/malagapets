import { Main } from "@/components/layouts/main"
import { BeachesGuideSection } from "@/components/sections/guides/beaches-guide-section"

/**
 * Component for the Beaches Cards page.
 */
export default function BeachesGuidePage() {

    return (
        <Main ariaLabelKey="main.beachesCardsContent">
            <BeachesGuideSection />
        </Main>
    );
}
