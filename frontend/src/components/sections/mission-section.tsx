import { getTranslations } from "next-intl/server";
import { MissionCard } from "@/components/shared/card-variants/mission/mission-card";
import { missionIcons } from "@/data/icons";

export async function MissionSection() {
    const tMission = await getTranslations("mission");

    return (
        <section
            aria-labelledby="mission-heading"
            className="relative z-10 py-16 sm:py-20 lg:py-24"
        >
            <div className="container-app">
                <h2
                    id="mission-heading"
                    className="
        text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
        font-black text-center mb-12 sm:mb-16
        text-title tracking-tight
        motion-safe:animate-fadeInUp
      "
                >
                    {tMission("heading")}
                </h2>

                <div className="
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
      justify-items-center
      [&>*:nth-child(3)]:md:col-span-2
      [&>*:nth-child(3)]:lg:col-span-1
    ">
                    {missionIcons.map((Icon, index) => (
                        <MissionCard
                            key={index}
                            icon={Icon}
                            title={tMission(`cards.${index}.title`)}
                            description={tMission(`cards.${index}.description`)}
                            delay={index * 150}
                            className="w-full max-w-sm"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}