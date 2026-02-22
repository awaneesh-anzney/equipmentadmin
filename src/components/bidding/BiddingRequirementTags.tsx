"use client";

import { Badge } from "@/components/ui/badge";
import { Requirement } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface BiddingRequirementTagsProps {
    requirements: Requirement[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export default function BiddingRequirementTags({ requirements, selectedId, onSelect }: BiddingRequirementTagsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Select Requirement</h3>
            <div className="flex flex-nowrap items-stretch overflow-x-auto pb-2 gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                {requirements.map((req) => (
                    <div
                        key={req.id}
                        onClick={() => onSelect(req.id)}
                        className={cn(
                            "cursor-pointer px-3 py-2 transition-all duration-300 flex flex-col gap-0.5 relative border-t-2 rounded-b-lg group",
                            selectedId === req.id
                                ? "border-primary bg-primary/[0.03] text-foreground shadow-[0_4px_12px_-4px_rgba(249,115,22,0.1)]"
                                : "border-transparent text-muted-foreground hover:bg-slate-50/80 hover:border-slate-300"
                        )}
                    >
                        <div className="flex items-center gap-1.5">
                            <span className={cn(
                                "text-[10px] font-extrabold transition-colors",
                                selectedId === req.id ? "text-primary" : "text-muted-foreground/30"
                            )}>
                                {req.id}
                            </span>
                            <span className={cn(
                                "text-[13.5px] font-bold whitespace-nowrap transition-colors",
                                selectedId === req.id ? "text-primary" : "text-foreground/80"
                            )}>
                                {req.projectName}
                            </span>
                        </div>
                        <span className={cn(
                            "text-[10.5px] font-medium ml-1 transition-opacity",
                            selectedId === req.id ? "text-primary/70 opacity-100" : "opacity-60"
                        )}>
                            {req.clientName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
