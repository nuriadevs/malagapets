"use client";

import { Button } from "@/components/ui/button";
import { SearchInputProps } from "@/types/blog";
import { searchIcon } from "@/data/icons";

export default function SearchInput({ 
  q = "",
  handleChange, 
  handleClear,
  placeholder,
  ariaLabel,
  clearAriaLabel
}: SearchInputProps) {

  const [Search, X] = searchIcon;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-600 pointer-events-none z-10"
        strokeWidth={2}
        aria-hidden="true"
      />
      
      <input
        type="text"
        value={q}
        onChange={handleChange}
        placeholder={placeholder || "Search posts, tags, or authors..."}
        name="q"
        id="q"
        autoComplete="off"
        aria-label={ariaLabel || "Search"}
        className="
          w-full h-14 pl-12 pr-16 rounded-xl
          border-2 border-cyan-600/40 bg-background/50
          backdrop-blur-sm shadow-sm
          transition-all duration-300 ease-out
          focus:ring-4 focus:ring-cyan-600/20 focus:border-cyan-600
          focus:outline-none focus:bg-background
          hover:border-cyan-600/60 hover:shadow-md
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
            hover:bg-cyan-600/10 hover:text-cyan-600
            transition-colors duration-200
          "
          aria-label={clearAriaLabel || "Clear search"}
        >
          <X 
            className="w-5 h-5" 
            strokeWidth={2}
            aria-hidden="true" 
          />
        </Button>
      )}
    </div>
  );
}