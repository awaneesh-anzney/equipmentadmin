import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, CheckCircle2 } from "lucide-react";
import { WorkOrder } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WorkOrderCardProps {
    workOrder: WorkOrder;
    onView: (wo: WorkOrder) => void;
}

export default function WorkOrderCard({ workOrder, onView }: WorkOrderCardProps) {
    const isPending = workOrder.status === 'PENDING';

    const handleActivate = () => {
        toast.success(`Work Order ${workOrder.id} activated!`, {
            description: "The vendor has been notified to deploy vehicles.",
        });
    };

    return (
        <Card className="bg-white rounded-xl border border-border/50 shadow-sm transition-all duration-300 p-6 flex flex-col gap-6 group relative overflow-hidden hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
            {/* Top Row: ID & Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {workOrder.id}
                    </div>
                    <Badge
                        className={cn(
                            "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none rounded",
                            workOrder.status === 'ACTIVE' ? "bg-amber-100 text-amber-700" :
                                workOrder.status === 'PENDING' ? "bg-slate-100 text-slate-500" :
                                    "bg-slate-100 text-slate-400"
                        )}
                    >
                        {workOrder.status}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 bg-slate-50 hover:bg-white text-slate-600 border border-slate-200 hover:border-primary/40 shadow-sm rounded-lg text-[12px] font-bold gap-2 px-3 transition-all"
                        onClick={() => onView(workOrder)}
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                    {isPending && (
                        <Button
                            size="sm"
                            onClick={handleActivate}
                            className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-lg text-[12px] font-bold gap-2 px-3 shadow-sm shadow-emerald-500/20"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Activate
                        </Button>
                    )}
                </div>
            </div>

            {/* Project Title */}
            <div className="flex flex-col gap-1">
                <h3 className="text-[15.5px] font-bold text-foreground group-hover:text-primary transition-colors">
                    {workOrder.projectName} — <span className="text-muted-foreground/60 font-medium">{workOrder.clientName}</span>
                </h3>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/50">Vendor</span>
                    <span className="text-[13px] font-bold text-foreground/80">{workOrder.vendorName}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/50">Equipment</span>
                    <span className="text-[13px] font-bold text-foreground/80">{workOrder.vehicleCategory} × {workOrder.quantity}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/50">Rate</span>
                    <span className="text-[13.5px] font-bold text-foreground/80 tabular-nums">₹{workOrder.rate.toLocaleString()}/{workOrder.rateType.split(' ')[1]}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/50">Validity</span>
                    <span className="text-[13px] font-bold text-foreground/80">{workOrder.validity}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/50">Payment</span>
                    <span className="text-[13px] font-bold text-foreground/80">{workOrder.paymentCycle}</span>
                </div>
            </div>
        </Card>
    );
}
