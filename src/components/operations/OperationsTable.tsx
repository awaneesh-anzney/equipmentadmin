"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DailyOperation } from "@/data/mockData";
import { Card } from "@/components/ui/card";

interface OperationsTableProps {
    operations: DailyOperation[];
}

export default function OperationsTable({ operations }: OperationsTableProps) {
    return (
        <Card
            className="rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            style={{ borderTop: "4px solid var(--primary)" }}
        >

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none bg-slate-50/40">
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vehicle #</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vendor</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Project</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Date</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Status</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Trips</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Extra</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {operations.map((op) => (
                            <TableRow key={op.id} className="group border-b border-border/40 hover:bg-primary/[0.05] transition-all duration-200">
                                <TableCell className="px-5 py-4 w-[160px] whitespace-nowrap">
                                    <span className="text-[13.5px] font-semibold text-foreground font-mono tracking-tight">{op.vehicleNumber}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 min-w-[180px] whitespace-nowrap">
                                    <span className="text-[13px] font-medium text-foreground">{op.vendorName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 min-w-[200px] whitespace-nowrap">
                                    <span className="text-[13px] font-medium text-primary">{op.projectName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center w-[130px] whitespace-nowrap">
                                    <span className="text-[12.5px] font-medium text-foreground/80 tabular-nums">
                                        {op.date}
                                    </span>
                                </TableCell>
                                <TableCell className="px-5 py-4 w-[140px] whitespace-nowrap">
                                    <Badge
                                        className={`
                                            px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase border-none rounded shadow-none whitespace-nowrap
                                            ${op.status === 'PRESENT' ? 'bg-emerald-500/15 text-emerald-700' :
                                                op.status === 'ABSENT' ? 'bg-rose-500/15 text-rose-700' :
                                                    op.status === 'BREAKDOWN' ? 'bg-rose-500/15 text-rose-700' :
                                                        op.status === 'STANDBY' ? 'bg-amber-500/15 text-amber-700' :
                                                            'bg-slate-200 text-slate-500'}
                                        `}
                                    >
                                        {op.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center w-[100px] whitespace-nowrap">
                                    <span className="text-[13.5px] font-semibold text-foreground tabular-nums">
                                        {op.trips}
                                    </span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center w-[100px] whitespace-nowrap">
                                    {op.extraTrips > 0 ? (
                                        <span className="text-[13px] font-semibold text-emerald-600">+{op.extraTrips}</span>
                                    ) : (
                                        <span className="text-muted-foreground/30 text-[11px]">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="px-5 py-4 min-w-[220px] max-w-[350px] whitespace-nowrap">
                                    <span className="text-[12.5px] font-medium text-foreground/70 leading-snug truncate block">
                                        {op.remarks || "—"}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
