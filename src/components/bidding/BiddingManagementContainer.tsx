"use client";

import { useState, useMemo } from "react";
import { mockRequirements, mockBids, Requirement, Bid } from "@/data/mockData";
import BiddingRequirementTags from "./BiddingRequirementTags";
import BiddingEquipmentFilters from "./BiddingEquipmentFilters";
import BiddingComparisonTable from "./BiddingComparisonTable";

export default function BiddingManagementContainer() {
    const [selectedReqId, setSelectedReqId] = useState(mockRequirements[0].id);
    const [selectedEquipment, setSelectedEquipment] = useState("all");

    // Get current requirement info
    const currentReq = useMemo(() =>
        mockRequirements.find(r => r.id === selectedReqId),
        [selectedReqId]);

    // Filter bids for the selected requirement
    const bidsForReq = useMemo(() =>
        mockBids.filter(b => b.requirementId === selectedReqId),
        [selectedReqId]);

    // Calculate equipment filter options
    const equipmentFilters = useMemo(() => {
        const counts: Record<string, number> = {};
        bidsForReq.forEach(bid => {
            counts[bid.vehicleCategory] = (counts[bid.vehicleCategory] || 0) + 1;
        });
        return Object.entries(counts).map(([category, count]) => ({ category, count }));
    }, [bidsForReq]);

    // Filter bids by equipment if a specific one is selected
    const filteredBids = useMemo(() => {
        if (selectedEquipment === "all") return bidsForReq;
        return bidsForReq.filter(b => b.vehicleCategory === selectedEquipment);
    }, [bidsForReq, selectedEquipment]);

    // Reset equipment filter when requirement changes
    const handleReqSelect = (id: string) => {
        setSelectedReqId(id);
        setSelectedEquipment("all");
    };

    return (
        <div className="flex flex-col gap-10 max-w-[1600px] mx-auto pb-12">
            {/* Requirement Selection Tags */}
            <BiddingRequirementTags
                requirements={mockRequirements}
                selectedId={selectedReqId}
                onSelect={handleReqSelect}
            />

            {/* Equipment Category Filters */}
            <BiddingEquipmentFilters
                filters={equipmentFilters}
                selectedCategory={selectedEquipment}
                onSelect={setSelectedEquipment}
            />

            {/* Main Comparison Table */}
            <BiddingComparisonTable
                bids={filteredBids}
                subtitle={currentReq ? `${currentReq.clientName} — ${currentReq.siteLocation}` : undefined}
            />
        </div>
    );
}
