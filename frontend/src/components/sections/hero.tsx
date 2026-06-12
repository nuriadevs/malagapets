import { getTranslations } from "next-intl/server";
import { ContentLayout } from "@/components/common/content-layout-section";
import { MissionSection } from "@/components/sections/mission-section";
import Image from "next/image";

export async function HeroSection() {
    const t = await getTranslations("homepage");

    return (
        <section
            aria-labelledby="hero-title"
            className="relative w-full min-h-screen"
        >
            <Image
                src="/images/background.webp"
                alt=""
                aria-hidden="true"
                fill
                priority
                quality={85}
                className="object-cover object-center"
                style={{ zIndex: -2 }}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
            />

            <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: -1 }}
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            linear-gradient(
                                to bottom,
                                oklch(0.1 0.04 191 / 0.55) 0%,
                                oklch(0.1 0.04 191 / 0.35) 40%,
                                oklch(0.1 0.04 191 / 0.45) 100%
                            )
                        `,
                    }}
                />

            </div>

            <div className="relative z-10">
                <ContentLayout
                    mainTitle={
                        <h1
                            id="hero-title"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-title drop-shadow-2xl motion-safe:animate-fadeInUp leading-tight tracking-tight"
                        >
                            {t("title")}
                        </h1>
                    }
                    subtitle={
                        <p className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-title drop-shadow-lg motion-safe:animate-fadeInUp motion-safe:[animation-delay:200ms]">
                            {t("subtitle.part1")}
                            <span className="text-hero-highlight font-bold drop-shadow-md hover:text-hero-highlight/80 transition-colors duration-300">
                                {t("subtitle.highlight")}
                            </span>
                            {t("subtitle.part2")}
                        </p>
                    }
                />
            </div>

            <MissionSection />
        </section>
    );
}