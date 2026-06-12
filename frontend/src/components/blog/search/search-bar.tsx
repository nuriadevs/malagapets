"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"
import SearchInput from "@/components/ui/blog/search-input"
import type { SearchBarProps } from "@/types/blog-search"


export default function SearchBar({ basePath = "/blog" }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("search")
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value === "") {
      router.push(`${basePath}/search`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`${basePath}/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push(`${basePath}/search`)
    }
  }

  const handleClear = () => {
    setQuery("")
    router.push(`${basePath}/search`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label={t("form.ariaLabel")}
      className="flex justify-center"
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
  )
}
