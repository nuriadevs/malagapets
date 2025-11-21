// src/components/common/form-contact.tsx
import { ContactAbout } from "@/components/ui/contact/contact-about";
import { ContactForm } from "@/components/ui/contact/contact-form";

/**
 * Component for the contact page form and information
 */
export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <ContactAbout />
                <ContactForm />
            </div>
        </div>
    );
}