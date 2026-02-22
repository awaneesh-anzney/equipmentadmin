"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BillingRecord } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BillingTableProps {
    records: BillingRecord[];
}

export default function BillingTable({ records }: BillingTableProps) {
    return (
        <Card
            className="rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            style={{ borderTop: "4px solid var(--primary)" }}
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none bg-slate-50/40">
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">ID</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vendor</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Project</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Month</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-right">Gross (₹)</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-right">Deductions</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-right">Net (₹)</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Status</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id} className="group border-b border-border/40 hover:bg-primary/[0.05] transition-all duration-200">
                                <TableCell className="px-5 py-4 w-[100px] whitespace-nowrap">
                                    <span className="text-[11.5px] font-medium text-muted-foreground/80 font-mono tracking-tight uppercase">{record.id}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 min-w-[180px] whitespace-nowrap">
                                    <span className="text-[13.5px] font-bold text-foreground tracking-tight">{record.vendorName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 min-w-[180px] whitespace-nowrap">
                                    <span className="text-[13px] font-medium text-muted-foreground">{record.projectName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center w-[120px] whitespace-nowrap">
                                    <span className="text-[12.5px] font-medium text-muted-foreground">{record.month}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-right w-[120px] whitespace-nowrap">
                                    <span className="text-[13.5px] font-bold text-foreground tabular-nums">₹{record.grossAmount.toLocaleString()}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-right w-[120px] whitespace-nowrap">
                                    <span className="text-[13px] font-bold text-destructive tabular-nums">-₹{(record.penaltyDeduction + record.dieselDeduction)}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-right w-[120px] whitespace-nowrap">
                                    <span className="text-[13.5px] font-bold text-foreground tabular-nums">₹{record.netAmount.toLocaleString()}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center w-[130px] whitespace-nowrap">
                                    <Badge
                                        className={`
                                            px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase border-none rounded shadow-none whitespace-nowrap
                                            ${record.status === 'PAID' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                                                record.status === 'APPROVED' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                                                    record.status === 'VERIFIED' ? 'bg-[#E3F2FD] text-[#1565C0]' :
                                                        'bg-[#FFF3E0] text-[#EF6C00]'}
                                        `}
                                    >
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-right w-[120px] whitespace-nowrap">
                                    {record.status === 'VERIFIED' ? (
                                        <Button className="h-7 px-4 bg-emerald-500 hover:bg-emerald-600 text-[10px] font-bold text-white rounded-md shadow-sm transition-all duration-200 uppercase">
                                            Approve
                                        </Button>
                                    ) : record.status === 'GENERATED' ? (
                                        <Button className="h-7 px-4 bg-blue-500 hover:bg-blue-600 text-[10px] font-bold text-white rounded-md shadow-sm transition-all duration-200 uppercase">
                                            Verify
                                        </Button>
                                    ) : (
                                        <span className="text-muted-foreground/30 text-[11px]">—</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
