"use client";

import { cn } from "@/lib/utils";

interface BiddingEquipmentFiltersProps {
    filters: { category: string; count: number }[];
    selectedCategory: string;
    onSelect: (category: string) => void;
}

export default function BiddingEquipmentFilters({ filters, selectedCategory, onSelect }: BiddingEquipmentFiltersProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Filter by Equipment</h3>
            <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <button
                    onClick={() => onSelect("all")}
                    className={cn(
                        "px-5 py-2 rounded-lg text-[12.5px] font-bold transition-all duration-300 border-b-2",
                        selectedCategory === "all"
                            ? "border-primary bg-primary/[0.04] text-primary shadow-sm"
                            : "border-transparent bg-white text-muted-foreground hover:bg-slate-50 hover:border-slate-300"
                    )}
                >
                    <span className="flex items-center gap-2">
                        All
                        <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full",
                            selectedCategory === "all" ? "bg-primary text-white" : "bg-slate-100"
                        )}>
                            {filters.reduce((acc, f) => acc + f.count, 0)}
                        </span>
                    </span>
                </button>
                {filters.map((f) => (
                    <button
                        key={f.category}
                        onClick={() => onSelect(f.category)}
                        className={cn(
                            "px-5 py-2 rounded-lg text-[12.5px] font-bold transition-all duration-300 border-b-2",
                            selectedCategory === f.category
                                ? "border-primary bg-primary/[0.04] text-primary shadow-sm"
                                : "border-transparent bg-white text-muted-foreground hover:bg-slate-50 hover:border-slate-300"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            {f.category}
                            <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                                selectedCategory === f.category ? "bg-primary text-white" : "bg-slate-100"
                            )}>
                                {f.count}
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
