"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Truck } from "lucide-react";
import RequirementDetailsModal from "./RequirementDetailsModal";
import { Requirement } from "@/data/mockData";

const STATUS_CONFIG: Record<Requirement["status"], { label: string; className: string }> = {
    AWARDED: {
        label: "AWARDED",
        className: "bg-chart-2/15 text-chart-2 border-chart-2/20",
    },
    LIVE: {
        label: "LIVE",
        className: "bg-primary/15 text-primary border-primary/20",
    },
    DRAFT: {
        label: "DRAFT",
        className: "bg-muted text-muted-foreground border-border",
    },
    CLOSED: {
        label: "CLOSED",
        className: "bg-muted text-muted-foreground border-border",
    },
};

export default function RequirementCard({ requirement }: { requirement: Requirement }) {
    const {
        id,
        status,
        projectName,
        clientName,
        siteLocation,
        items,
        startDate,
        endDate,
        paymentCycle,
        dieselBy,
        dutyHours,
        bidsCount
    } = requirement;

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <>
            <Card className="group relative overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 shadow-sm hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 dark:bg-card">
                <div className="flex flex-col p-4">
                    {/* ID and Status */}
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-muted text-muted-foreground font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md hover:bg-muted">
                                {id}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border-none ${STATUS_CONFIG[status]?.className || ""}`}
                            >
                                {STATUS_CONFIG[status]?.label || status}
                            </Badge>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mb-2 pr-24">
                        <h3 className="text-[18px] font-bold text-foreground mb-1 transition-colors leading-tight">
                            {projectName}
                        </h3>
                        <p className="text-[14px] text-muted-foreground font-medium">
                            {clientName} — {siteLocation}
                        </p>
                    </div>

                    {/* Equipment Tags */}
                    <div className="mb-4 flex flex-wrap gap-2.5">
                        {items.map((eq, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 rounded-md bg-transparent border border-border px-3 py-1"
                            >
                                <Truck className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-[13px] font-bold text-foreground">{eq.vehicleCategory}</span>
                                    <span className="text-[12.5px] font-semibold text-muted-foreground">
                                        x{eq.quantityRequired} <span className="text-[11px] font-medium opacity-80">({eq.capacity})</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Details Row */}
                    <div className="mt-auto pt-2 border-t border-border/50">
                        <div className="grid grid-cols-2 gap-y-4 md:grid-cols-5 items-end">
                            {/* Duration */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">Duration</span>
                                <span className="text-[13.5px] font-semibold text-foreground">
                                    {startDate} → {endDate}
                                </span>
                            </div>

                            {/* Payment */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">Payment</span>
                                <span className="text-[13.5px] font-semibold text-foreground">{paymentCycle}</span>
                            </div>

                            {/* Diesel */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">Diesel</span>
                                <span className="text-[13.5px] font-semibold text-foreground">{dieselBy}</span>
                            </div>

                            {/* Duty */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">Duty</span>
                                <span className="text-[13.5px] font-semibold text-foreground">{dutyHours}</span>
                            </div>

                            {/* Bids */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">Bids</span>
                                <span className="text-[15px] font-extrabold text-primary">{bidsCount} received</span>
                            </div>
                        </div>
                    </div>

                    {/* Absolute Top Right Actions */}
                    <div className="absolute top-4 right-4 flex gap-1.5">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDetailsOpen(true)}
                            className="h-9 gap-2 bg-slate-50 text-foreground hover:bg-white font-bold transition-all rounded-md px-4 border border-slate-200 hover:border-primary/40 shadow-sm text-[12.5px]"
                        >
                            <Eye className="h-4 w-4" />
                            Details
                        </Button>
                        {status === "DRAFT" && (
                            <Button size="sm" className="h-7 rounded-md bg-chart-2 hover:bg-chart-2/90 text-white border-none px-3 text-[11px] font-bold shadow-sm">
                                Publish
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <RequirementDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                requirement={requirement}
            />
        </>
    );
}
