"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, MoreVertical, MapPin, Clock, Check, XCircle } from "lucide-react";
import { Bid } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface BiddingComparisonTableProps {
    bids: Bid[];
    subtitle?: string;
}

export default function BiddingComparisonTable({ bids, subtitle }: BiddingComparisonTableProps) {
    return (
        <div className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
            {/* Top accent line - Orange as seen in screenshot */}
            <div className="h-1 bg-primary w-full" />

            <div className="p-5 border-b border-border/40 bg-white flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-[17.5px] font-bold text-foreground">Live Bid Comparison</h3>
                    {subtitle && <p className="text-[12.5px] text-muted-foreground/80 font-medium italic">{subtitle}</p>}
                </div>
                {bids.length > 0 && (
                    <Badge variant="outline" className="text-[11px] font-bold bg-slate-50 border-slate-200 text-slate-500 rounded-lg">
                        {bids.length} BIDS RECEIVED
                    </Badge>
                )}
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none bg-slate-50/40">
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vendor</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Equipment</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Qty</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Rate (₹)</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-center">Age</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Rating</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Distance</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Join</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Status</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bids.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="py-20 text-center border-none">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                                            <Star className="h-6 w-6 text-slate-200" />
                                        </div>
                                        <h3 className="text-[15px] font-bold text-slate-400 uppercase tracking-widest">No matching bids</h3>
                                        <p className="text-[12px] text-muted-foreground/60 italic font-medium">Try changing your filters or requirement</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            bids.map((bid) => (
                                <TableRow key={bid.id} className="group border-b border-border/40 hover:bg-primary/[0.03] transition-all duration-200">
                                    <TableCell className="px-5 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[14.5px] font-bold text-foreground group-hover:text-primary transition-colors">{bid.vendorName}</span>
                                            <span className="text-[11.5px] text-muted-foreground/70 font-medium italic">{bid.remarks || "No remarks"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        <span className="text-[13.5px] font-semibold text-foreground">{bid.vehicleCategory}</span>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center text-[14px] font-bold text-foreground">
                                        {bid.vehiclesOffering}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-[15px] font-bold text-foreground tabular-nums">
                                        ₹{bid.rate.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center text-[13px] text-muted-foreground font-bold">
                                        {bid.vehicleAge}
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/5 w-fit border border-amber-500/10">
                                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                            <span className="text-[13.5px] font-bold text-amber-700">{bid.rating}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-[13.5px] font-bold text-muted-foreground">
                                        {bid.distance}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-[13.5px] font-bold text-muted-foreground">
                                        {bid.joiningDays}d
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        <Badge
                                            className={`
                                                px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border-none rounded shadow-sm
                                                ${bid.status === 'ACCEPTED' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                                                    bid.status === 'PARTIAL' ? 'bg-[#E3F2FD] text-[#1565C0]' :
                                                        bid.status === 'REJECTED' ? 'bg-[#FFEBEE] text-[#C62828]' :
                                                            'bg-[#FFF3E0] text-[#EF6C00]'}
                                            `}
                                        >
                                            {bid.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {bid.status === 'ACTIVE' ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10 px-3 rounded-lg text-[11px] font-bold"
                                                    >
                                                        ACCEPT
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-rose-500 hover:bg-rose-50 rounded-full"
                                                    >
                                                        <XCircle className="h-5 w-5" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/30 hover:text-foreground">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
