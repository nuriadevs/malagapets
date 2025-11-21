// src/app/[locale]/contact/page.tsx
import { Main } from "@/components/layouts/main";
import { ContactSection } from "@/components/sections/contact/contact-section";

/**
 * Component for the Contact page
 */
export default function Contact() {

    return (
        <Main ariaLabelKey="main.contactContent">
            <ContactSection />
        </Main>
    );
}
