"use client"
import { useTranslations } from "next-intl";


/** Section for displaying information about the project */
export function AboutSection() {

  const tabout = useTranslations("about");

  return (
    <section aria-labelledby="about-heading" className="relative pt-10 sm:pt-16 lg:pt-24 xl:pt-24 pb-2 sm:pb-4 lg:pb-6 xl:pb-8 bg-gradient-to-b">
      {/* Project History */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:gap-8 items-center">
          <div className="space-y-4 lg:space-y-6 xl:space-y-8">
            <h1 id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground  flex justify-center text-center"
            >
              {tabout("title")}
            </h1>
            <div className="space-y-6">
              {/* Access each element of the array individually */}
              {[0, 1, 2].map((index) => (
                <p
                  key={index}
                  className="text-base md:text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground tracking-wide"
                >
                  {tabout(`paragraphs.${index}`)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
