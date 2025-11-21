// src/components/common/search-filter.tsx
"use client";

import { useState, useId } from "react"; // ✅ useId nativo de React
import { useTranslations } from "next-intl";
import { SearchFilterProps } from "@/types/components";
import { search } from "@/data/icons";

export function SearchFilter({
    placeholder,
    ariaLabel,
    onSearch,
    value: externalValue,
    className = "",
}: SearchFilterProps) {

    const [SearchIcon, X] = search;
    const tAccess = useTranslations("search.form");
    const [internalQuery, setInternalQuery] = useState("");
    
    // ✅ ID estable que no cambia en cada render
    const inputId = useId();
    
    const query = externalValue !== undefined ? externalValue : internalQuery;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        if (externalValue === undefined) {
            setInternalQuery(value);
        }
        
        onSearch?.(value);
    };

    const handleClear = () => {
        if (externalValue === undefined) {
            setInternalQuery("");
        }
        onSearch?.("");
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <SearchIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    id={inputId}
                    name="search"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    autoComplete="off"
                    className="w-full pl-12 pr-12 py-3 bg-surface-elevated border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent transition-all"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        aria-label={tAccess("clearAriaLabel")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}