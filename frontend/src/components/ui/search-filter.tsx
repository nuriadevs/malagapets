// src/components/common/search-filter.tsx
"use client";

import { useState, useId } from "react";
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
    const tAccess = useTranslations("accessibility");
    const [internalQuery, setInternalQuery] = useState("");

    const inputId = useId();

    const query = externalValue !== undefined ? externalValue : internalQuery;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (externalValue === undefined) setInternalQuery(value);
        onSearch?.(value);
    };

    const handleClear = () => {
        if (externalValue === undefined) setInternalQuery("");
        onSearch?.("");
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">

                {/* Icono lupa */}
                <SearchIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
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
                    className="input input-search"
                />

                {/* Botón clear */}
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label={tAccess("button.clearAriaLabel")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

            </div>
        </div>
    );
}