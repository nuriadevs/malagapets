"use client"

import { Button } from "@/components/ui/button"
import { searchIcon } from "@/data/icons"
import type { SearchInputProps } from "@/types/blog-search"


export default function SearchInput({
  q = "",
  handleChange,
  handleClear,
  placeholder,
  ariaLabel,
  clearAriaLabel,
}: SearchInputProps) {
  const [Search, X] = searchIcon

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-text pointer-events-none z-10"
        strokeWidth={2}
        aria-hidden="true"
      />

      <input
        type="search"
        value={q}
        onChange={handleChange}
        placeholder={placeholder ?? "Buscar artículos..."}
        name="q"
        id="search-input"
        autoComplete="off"
        aria-label={ariaLabel ?? "Buscar"}
        className="
          w-full h-14 pl-12 pr-16 rounded-xl
          border-2 border-border bg-background/50
          backdrop-blur-sm shadow-sm
          transition-all duration-300 ease-in-out
          focus:ring-4 focus:ring-ring/20 focus:border-primary
          focus:outline-none focus:bg-background
          hover:border-primary/60 hover:shadow-md
          text-foreground placeholder:text-muted-foreground/60
          [&::-webkit-search-cancel-button]:hidden
        "
      />

      {q && (
        <Button
          type="button"
          onClick={handleClear}
          variant="ghost"
          size="sm"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            h-10 w-10 p-0 rounded-full shrink-0
            hover:bg-primary/10 hover:text-primary
            transition-colors duration-200
          "
          aria-label={clearAriaLabel ?? "Limpiar búsqueda"}
        >
          <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
