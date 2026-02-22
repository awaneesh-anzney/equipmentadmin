"use client";

import { Card } from "@/components/ui/card";
import { Vehicle } from "@/data/mockData";

interface VehicleStatsProps {
    vehicles: Vehicle[];
}

export default function VehicleStats({ vehicles }: VehicleStatsProps) {
    const active = vehicles.filter(v => v.status === 'ACTIVE').length;
    const breakdown = vehicles.filter(v => v.status === 'BREAKDOWN').length;
    const standby = vehicles.filter(v => v.status === 'STANDBY').length;
    const pending = vehicles.filter(v => v.status === 'PENDING').length;
    const total = vehicles.length;

    const stats = [
        { label: "ACTIVE", value: active, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "BREAKDOWN", value: breakdown, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "STANDBY", value: standby, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "PENDING", value: pending, color: "text-sky-600", bg: "bg-sky-50" },
        { label: "TOTAL", value: total, color: "text-slate-900", bg: "bg-slate-50" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="p-4 border border-border/50 shadow-sm flex flex-col gap-1 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 cursor-default">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{stat.label}</span>
                    <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                </Card>
            ))}
        </div>
    );
}
