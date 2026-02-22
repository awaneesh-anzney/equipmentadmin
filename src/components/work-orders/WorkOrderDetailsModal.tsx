"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { WorkOrder } from "@/data/mockData";
import { X } from "lucide-react";

interface WorkOrderDetailsModalProps {
    workOrder: WorkOrder | null;
    open: boolean;
    onClose: () => void;
}

export default function WorkOrderDetailsModal({ workOrder, open, onClose }: WorkOrderDetailsModalProps) {
    if (!workOrder) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl flex flex-col gap-0 [&>button]:right-6 [&>button]:top-8 [&>button]:opacity-40 hover:[&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-none [&>button]:shadow-none [&>button]:h-6 [&>button]:w-6 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:h-5 [&>button>svg]:w-5 focus-visible:outline-none">
                <div className="bg-white p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                                {workOrder.id}
                            </div>
                            <h2 className="text-[20px] font-bold text-foreground">Work Order</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-8">
                        <InfoItem label="Vendor" value={workOrder.vendorName} />
                        <InfoItem label="Project" value={workOrder.projectName} />
                        <InfoItem label="Client" value={workOrder.clientName} />
                        <InfoItem label="Equipment" value={`${workOrder.vehicleCategory} × ${workOrder.quantity}`} />
                        <InfoItem label="Rate" value={`₹${workOrder.rate.toLocaleString()} ${workOrder.rateType}`} />
                        <InfoItem label="Validity" value={workOrder.validity} />
                        <InfoItem label="Penalty" value={workOrder.penaltyClause} />
                        <InfoItem label="Payment" value={workOrder.paymentCycle} />

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground/60">Status</span>
                            <Badge className="w-fit px-3 py-1 bg-amber-100 text-amber-700 font-bold border-none">
                                {workOrder.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground/60">{label}</span>
            <span className="text-[15px] font-bold text-foreground">{value}</span>
        </div>
    );
}
