"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BillingRecord } from "@/data/mockData";
import { X } from "lucide-react";

interface BillingDetailsModalProps {
    record: BillingRecord | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function BillingDetailsModal({ record, open, onOpenChange }: BillingDetailsModalProps) {
    if (!record) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[450px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl flex flex-col gap-0 [&>button]:right-6 [&>button]:top-8 [&>button]:opacity-40 hover:[&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-none [&>button]:shadow-none [&>button]:h-6 [&>button]:w-6 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:h-5 [&>button>svg]:w-5 focus-visible:outline-none bg-white dark:bg-card">
                <div className="p-8 relative">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border px-3 py-1.5 rounded text-[11px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest">
                                {record.id}
                            </div>
                            <DialogTitle className="text-[20px] font-bold text-slate-900 dark:text-foreground tracking-tight">
                                Bill Details
                            </DialogTitle>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-y-7 gap-x-8">
                        {/* Vendor Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Vendor</p>
                            <p className="text-[15px] font-bold text-slate-800 dark:text-foreground leading-tight">
                                {record.vendorName}
                            </p>
                        </div>

                        {/* Project Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Project</p>
                            <p className="text-[15px] font-bold text-slate-800 dark:text-foreground leading-tight">
                                {record.projectName}
                            </p>
                        </div>

                        {/* Client Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Client</p>
                            <p className="text-[14px] font-bold text-slate-800 dark:text-foreground leading-tight">
                                {record.clientName}
                            </p>
                        </div>

                        {/* Month Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Month</p>
                            <p className="text-[14px] font-bold text-slate-800 dark:text-foreground leading-tight">
                                {record.month}
                            </p>
                        </div>

                        {/* Total Trips Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Total Trips</p>
                            <p className="text-[16px] font-bold text-slate-800 dark:text-foreground tabular-nums">
                                {record.totalTrips || "—"}
                            </p>
                        </div>

                        {/* Rate Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Rate</p>
                            <p className="text-[16px] font-bold text-slate-800 dark:text-foreground tabular-nums">
                                {record.rate.toLocaleString()} SAR
                            </p>
                        </div>

                        {/* Gross Amount Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Gross Amount</p>
                            <p className="text-[16px] font-bold text-slate-800 dark:text-foreground tabular-nums">
                                {record.grossAmount.toLocaleString()} SAR
                            </p>
                        </div>

                        {/* Penalty Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Penalty</p>
                            <p className="text-[16px] font-bold text-rose-500 tabular-nums">
                                -{(record.penaltyDeduction + (record.dieselDeduction || 0)).toLocaleString()} SAR
                            </p>
                        </div>

                        {/* Extra Shift Bonus Section */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Extra Shift Bonus</p>
                            <p className="text-[16px] font-bold text-emerald-500 tabular-nums">
                                +{(record.extraShiftBonus || 0).toLocaleString()} SAR
                            </p>
                        </div>

                        {/* Net Payable Section - Prominent */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Net Payable</p>
                            <p className="text-[28px] font-black text-slate-900 dark:text-foreground tracking-tighter tabular-nums leading-none">
                                {record.netAmount.toLocaleString()} SAR
                            </p>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="mt-10">
                        <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">Status</p>
                        <Badge
                            className={`
                                px-4 py-1.5 text-[10px] font-black tracking-widest uppercase border-none rounded-lg shadow-none
                                ${record.status === 'PAID' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-500' :
                                    record.status === 'APPROVED' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-500' :
                                        record.status === 'VERIFIED' ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-500' :
                                            'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-500'}
                            `}
                        >
                            {record.status}
                        </Badge>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
