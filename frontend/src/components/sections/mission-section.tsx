"use client"
import { useTranslations } from "next-intl";
import { MissionCard } from "@/components/ui/mission/mission-card";
import { missionIcons } from "@/data/icons";

/* Mission section for displaying the project's mission */
export function MissionSection() {
  const tMission = useTranslations("mission");

  return (
    <section aria-labelledby="mission-heading" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2
          id="mission-heading"
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 
            font-black text-center mb-12 sm:mb-16 text-white
            tracking-tight animate-fadeInUp"
        >
          {tMission("heading")}
        </h2>

        {/* Grid responsive con última card centrada en tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 
  justify-items-center
  [&>*:nth-child(3)]:md:col-span-2 
  [&>*:nth-child(3)]:lg:col-span-1">
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