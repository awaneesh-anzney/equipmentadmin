"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { mockRequirements, Requirement } from "@/data/mockData";

// Colors from globals.css tokens only
const STATUS_STYLE: Record<Requirement["status"], string> = {
    AWARDED: "bg-chart-2/15 text-chart-2",
    LIVE: "bg-primary/10 text-primary",
    DRAFT: "bg-muted text-muted-foreground",
    CLOSED: "bg-muted text-muted-foreground",
};

export default function RecentRequirementsTable() {
    const [hIdx, setHIdx] = useState<number | null>(null);
    const data = mockRequirements.slice(0, 5); // take max 5

    return (
        <div
            className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card"
            style={{ borderTop: "3px solid var(--primary)" }}
        >
            {/* Card Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-1">Latest</p>
                    <p className="text-[15px] font-bold leading-none text-foreground">Recent Requirements</p>
                </div>
                <span className="cursor-pointer text-[11px] font-semibold text-primary hover:underline underline-offset-2">
                    View all →
                </span>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-muted/30">
                            <th className="whitespace-nowrap px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
                            <th className="px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Project</th>
                            <th className="px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                            <th className="px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Equipment</th>
                            <th className="px-5 py-2.5 text-center text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                            <th className="px-5 py-2.5 text-center text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Bids</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {data.map((req, i) => {
                            const isH = hIdx === i;
                            const mainEquipment = req.items[0];
                            const remainingEquipmentCount = req.items.length - 1;

                            return (
                                <tr
                                    key={i}
                                    className="cursor-pointer transition-colors duration-150"
                                    style={{
                                        backgroundColor: isH
                                            ? "color-mix(in oklch, var(--primary) 5%, transparent)"
                                            : undefined,
                                    }}
                                    onMouseEnter={() => setHIdx(i)}
                                    onMouseLeave={() => setHIdx(null)}
                                >
                                    {/* ID — static */}
                                    <td className="px-5 py-3.5">
                                        <span className="font-mono text-[11.5px] font-semibold text-muted-foreground">
                                            {req.id}
                                        </span>
                                    </td>

                                    {/* Project — static */}
                                    <td className="px-5 py-3.5">
                                        <p className="text-[13px] font-medium leading-none text-foreground">
                                            {req.projectName}
                                        </p>
                                    </td>

                                    {/* Client — static */}
                                    <td className="px-5 py-3.5">
                                        <p className="text-[12.5px] text-muted-foreground">
                                            {req.clientName}
                                        </p>
                                    </td>

                                    {/* Equipment — static */}
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-wrap gap-1.5">
                                            {mainEquipment && (
                                                <Badge variant="outline" className="h-5 border-border bg-transparent px-2 text-[10px] font-medium">
                                                    {mainEquipment.vehicleCategory} x{mainEquipment.quantityRequired}
                                                </Badge>
                                            )}
                                            {remainingEquipmentCount > 0 && (
                                                <Badge variant="outline" className="h-5 border-primary/20 bg-primary/5 px-1.5 text-[10px] font-medium text-primary">
                                                    +{remainingEquipmentCount}
                                                </Badge>
                                            )}
                                        </div>
                                    </td>

                                    {/* Status — static */}
                                    <td className="px-5 py-3.5 text-center">
                                        <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${STATUS_STYLE[req.status]}`}>
                                            {req.status}
                                        </span>
                                    </td>

                                    {/* Bids — ONLY this column changes color on hover */}
                                    <td className="px-5 py-3.5 text-center">
                                        <span className={`text-[14px] font-bold tabular-nums transition-colors duration-150 ${isH ? "text-primary" : "text-foreground"}`}>
                                            {req.bidsCount}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
