// src/components/common/type-filter.tsx
import {TypeFilterProps} from "@/types/common";


export function TypeFilter({
    options,
    selected,
    onChange,
    label,
    className = "",
}: TypeFilterProps) {
    return (
        <div className={`${className}`}>
            <label className="block text-white/80 text-sm font-medium mb-2">
                {label}
            </label>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selected === option.value
                                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                            }`}
                        aria-pressed={selected === option.value}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}