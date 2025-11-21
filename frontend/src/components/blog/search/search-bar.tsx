"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchBarProps } from "@/types/blog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SearchInput from "@/components/ui/blog/search-input";


export default function SearchBar({
  basePath = "/blog"
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("search");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Si el input está vacío (usuario presionó la X), redirigir a la página de búsqueda sin query
    if (newQuery === "") {
      router.push(`${basePath}/search`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`${basePath}/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`${basePath}/search`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push(`${basePath}/search`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex justify-center"
      role="search"
      aria-label={t("form.ariaLabel")}
    >
      <SearchInput
        q={query}
        handleChange={handleSearch}
        handleClear={handleClear}
        placeholder={t("form.placeholder")}
        ariaLabel={t("form.inputAriaLabel")}
        clearAriaLabel={t("form.clearAriaLabel")}
      />
    </form>
  );
}