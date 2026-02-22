"use client";

import { useState } from "react";
import { mockWorkOrders, WorkOrder } from "@/data/mockData";
import WorkOrderCard from "./WorkOrderCard";
import WorkOrderDetailsModal from "./WorkOrderDetailsModal";

export default function WorkOrderListContainer() {
    const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (wo: WorkOrder) => {
        setSelectedOrder(wo);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-12">
            <div className="flex flex-col gap-6 mt-4">
                {mockWorkOrders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-dashed border-border py-20 flex flex-col items-center justify-center text-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                            <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-400 uppercase tracking-widest">No Active Work Orders</h3>
                        <p className="text-[13px] text-muted-foreground/60 italic font-medium">Bids will appear here once they are accepted.</p>
                    </div>
                ) : (
                    mockWorkOrders.map((wo) => (
                        <WorkOrderCard
                            key={wo.id}
                            workOrder={wo}
                            onView={handleView}
                        />
                    ))
                )}
            </div>

            <WorkOrderDetailsModal
                workOrder={selectedOrder}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
