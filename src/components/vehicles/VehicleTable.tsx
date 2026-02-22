"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "@/data/mockData";
import { Card } from "@/components/ui/card";

interface VehicleTableProps {
    vehicles: Vehicle[];
}

export default function VehicleTable({ vehicles }: VehicleTableProps) {
    return (
        <Card
            className="rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            style={{ borderTop: "4px solid var(--primary)" }}
        >
            <div className="p-5 border-b border-border/40 bg-white flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-[17.5px] font-bold text-foreground">Fleet Inventory</h3>
                    <p className="text-[12.5px] text-muted-foreground/80 font-medium italic">Detailed equipment tracking</p>
                </div>
                {vehicles.length > 0 && (
                    <Badge variant="outline" className="text-[11px] font-bold bg-slate-50 border-slate-200 text-slate-500 rounded-lg">
                        {vehicles.length} VEHICLES REGISTERED
                    </Badge>
                )}
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none bg-slate-50/40">
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vehicle #</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Vendor</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Driver</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Category</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Project</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Fitness</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Insurance</TableHead>
                            <TableHead className="px-5 py-3 text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id} className="group border-b border-border/40 hover:bg-primary/[0.05] transition-all duration-200">
                                <TableCell className="px-5 py-4">
                                    <span className="text-[13.5px] font-black text-foreground font-mono tracking-tight">{vehicle.vehicleNumber}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[13.5px] font-bold text-foreground/80">{vehicle.vendorName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[13.5px] font-semibold text-muted-foreground">{vehicle.driverName}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[13px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{vehicle.category} ({vehicle.capacity})</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[13px] font-semibold text-primary">{vehicle.assignedProject || "—"}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[12.5px] font-bold text-slate-500">{vehicle.fitnessExpiry}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <span className="text-[12.5px] font-bold text-slate-500">{vehicle.insuranceExpiry}</span>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Badge
                                        className={`
                                            px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border-none rounded
                                            ${vehicle.status === 'ACTIVE' ? 'bg-emerald-500/15 text-emerald-700' :
                                                vehicle.status === 'BREAKDOWN' ? 'bg-rose-500/15 text-rose-700' :
                                                    vehicle.status === 'STANDBY' ? 'bg-amber-500/15 text-amber-700' :
                                                        vehicle.status === 'PENDING' ? 'bg-sky-500/15 text-sky-700' :
                                                            'bg-slate-200 text-slate-500'}
                                        `}
                                    >
                                        {vehicle.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
