"use client";

import { Card } from "@/components/ui/card";
import { BillingRecord } from "@/data/mockData";

interface BillingStatsProps {
    records: BillingRecord[];
}

export default function BillingStats({ records }: BillingStatsProps) {
    const totalBilled = records.reduce((acc, curr) => acc + curr.grossAmount, 0);
    const totalDeductions = records.reduce((acc, curr) => acc + (curr.penaltyDeduction + curr.dieselDeduction), 0);
    const totalPaid = records.filter(r => r.status === 'PAID').length;

    const stats = [
        {
            label: "TOTAL BILLED",
            value: `₹${(totalBilled / 100000).toFixed(1)}L`,
            color: "text-foreground",
        },
        {
            label: "DEDUCTIONS",
            value: `₹${(totalDeductions / 1000).toFixed(0)}K`,
            color: "text-destructive",
        },
        {
            label: "NET PAYABLE",
            value: `₹${((totalBilled - totalDeductions) / 100000).toFixed(1)}L`,
            color: "text-foreground",
        },
        {
            label: "PAID",
            value: `${totalPaid}/${records.length}`,
            color: "text-emerald-600",
            isBadge: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={i} className="p-4 bg-white border border-border/60 shadow-none transition-all duration-300 hover:border-primary/40 hover:shadow-md group cursor-default">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1">{stat.label}</p>
                    <div className="flex items-center justify-between">
                        {stat.isBadge ? (
                            <span className={`text-2xl font-black ${stat.color} bg-emerald-500/10 px-3 py-0.5 rounded-md`}>
                                {stat.value}
                            </span>
                        ) : (
                            <h3 className={`text-2xl font-black ${stat.color} tracking-tight`}>
                                {stat.value}
                            </h3>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
