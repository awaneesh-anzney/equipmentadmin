"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Package,
    Gavel,
    Star
} from "lucide-react";
import { Requirement, mockBids } from "@/data/mockData";

interface RequirementDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requirement: Requirement | null;
}

export default function RequirementDetailsModal({ isOpen, onClose, requirement }: RequirementDetailsModalProps) {
    if (!requirement) return null;

    const requirementBids = mockBids.filter((b) => b.requirementId === requirement.id);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col p-8 border-none bg-white shadow-2xl rounded-xl gap-6 overflow-y-auto [&>button]:right-4 [&>button]:top-4 [&>button]:opacity-40 hover:[&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-none [&>button]:shadow-none [&>button]:h-6 [&>button]:w-6 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:h-4 [&>button>svg]:w-4 focus-visible:outline-none">
                <DialogHeader className="p-0 border-none shrink-0 mb-2">
                    <DialogTitle className="text-xl font-bold tracking-tight text-foreground">Requirement Details</DialogTitle>
                </DialogHeader>

                {/* Header Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[14px] font-bold text-foreground">{requirement.id}</span>
                        <h2 className="text-[18px] font-bold text-foreground">{requirement.projectName}</h2>
                        <Badge variant="outline" className={`ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border-none ${requirement.status === 'AWARDED' ? 'bg-blue-500/15 text-blue-600' :
                            requirement.status === 'LIVE' ? 'bg-primary/15 text-primary' :
                                'bg-muted text-muted-foreground'
                            }`}>
                            {requirement.status}
                        </Badge>
                    </div>

                    {/* Grid Info */}
                    <div className="grid grid-cols-3 gap-y-6 gap-x-8">
                        <InfoItem label="CLIENT" value={requirement.clientName} />
                        <InfoItem label="LOCATION" value={requirement.siteLocation} />
                        <InfoItem label="MATERIAL" value={requirement.materialType} />

                        <InfoItem label="DURATION" value={`${requirement.startDate} → ${requirement.endDate}`} />
                        <InfoItem label="REPORTING" value={requirement.reportingTime} />
                        <InfoItem label="DUTY" value={requirement.dutyHours} />

                        <InfoItem label="DIESEL BY" value={requirement.dieselBy} />
                        <InfoItem label="PAYMENT" value={requirement.paymentCycle} />
                        <InfoItem label="PENALTY" value={requirement.penaltyRule || "-"} />
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Equipment Table */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Package className="h-[18px] w-[18px] text-primary" strokeWidth={2.5} />
                            <h3 className="text-[14px] font-bold text-foreground">Equipment Required <span className="font-medium text-muted-foreground">({requirement.items.length} types)</span></h3>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Category</TableHead>
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Capacity</TableHead>
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Required</TableHead>
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Allocated</TableHead>
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Rate Type</TableHead>
                                    <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requirement.items.map((eq, i) => (
                                    <TableRow key={i} className="border-none hover:bg-muted/30 transition-colors">
                                        <TableCell className="px-0 py-3 text-[13.5px] font-bold text-foreground">{eq.vehicleCategory}</TableCell>
                                        <TableCell className="px-0 py-3 text-[13.5px] text-muted-foreground">{eq.capacity}</TableCell>
                                        <TableCell className="px-0 py-3 text-[13.5px] text-foreground">{eq.quantityRequired}</TableCell>
                                        <TableCell className="px-0 py-3 text-[13.5px] text-foreground">{eq.quantityAllocated}</TableCell>
                                        <TableCell className="px-0 py-3 text-[13.5px] text-muted-foreground">{eq.rateType}</TableCell>
                                        <TableCell className="px-0 py-3">
                                            {eq.quantityAllocated >= eq.quantityRequired ? (
                                                <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 border-none rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-none">FULFILLED</Badge>
                                            ) : eq.quantityAllocated > 0 ? (
                                                <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 border-none rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-none">PARTIAL</Badge>
                                            ) : (
                                                <Badge className="bg-muted text-muted-foreground hover:bg-muted border-none rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-none">OPEN</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Bids Table */}
                    {requirementBids.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Gavel className="h-[18px] w-[18px] text-primary" strokeWidth={2.5} />
                                <h3 className="text-[14px] font-bold text-foreground">Bids Received</h3>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Vendor</TableHead>
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Equipment</TableHead>
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Qty</TableHead>
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Rate</TableHead>
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Rating</TableHead>
                                        <TableHead className="h-8 px-0 text-[10.5px] font-semibold text-muted-foreground tracking-widest uppercase">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requirementBids.map((bid) => (
                                        <BidRow
                                            key={bid.id}
                                            vendor={bid.vendorName}
                                            equipment={bid.vehicleCategory}
                                            qty={bid.vehiclesOffering}
                                            rate={`₹${bid.rate.toLocaleString()}`}
                                            rating={bid.rating}
                                            status={bid.status}
                                            statusColor={
                                                bid.status === "ACCEPTED" ? "bg-emerald-500/15 text-emerald-600" :
                                                    bid.status === "PARTIAL" ? "bg-blue-500/15 text-blue-600" :
                                                        "bg-muted text-muted-foreground"
                                            }
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase leading-none mb-0.5">{label}</span>
            <span className="text-[13.5px] text-foreground font-medium truncate">{value}</span>
        </div>
    );
}

function BidRow({ vendor, equipment, qty, rate, rating, status, statusColor }: any) {
    return (
        <TableRow className="border-none hover:bg-muted/30 transition-colors">
            <TableCell className="px-0 py-3 text-[13.5px] font-bold text-foreground">{vendor}</TableCell>
            <TableCell className="px-0 py-3 text-[13.5px] text-muted-foreground">{equipment}</TableCell>
            <TableCell className="px-0 py-3 text-[13.5px] text-foreground">{qty}</TableCell>
            <TableCell className="px-0 py-3 text-[13.5px] text-foreground">{rate}</TableCell>
            <TableCell className="px-0 py-3">
                <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-[13px] font-medium text-foreground">{rating}</span>
                </div>
            </TableCell>
            <TableCell className="px-0 py-3">
                <Badge className={`${statusColor} hover:${statusColor} border-none rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-none`}>{status}</Badge>
            </TableCell>
        </TableRow>
    );
}
