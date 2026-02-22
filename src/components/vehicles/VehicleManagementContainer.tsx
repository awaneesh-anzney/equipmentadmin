"use client";

import { useState } from "react";
import { mockVehicles } from "@/data/mockData";
import VehicleStats from "./VehicleStats";
import VehicleTable from "./VehicleTable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function VehicleManagementContainer() {
    const [vendorFilter, setVendorFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredVehicles = mockVehicles.filter(v => {
        const matchVendor = vendorFilter === "all" || v.vendorName === vendorFilter;
        const matchStatus = statusFilter === "all" || v.status === statusFilter;
        return matchVendor && matchStatus;
    });

    const vendors = Array.from(new Set(mockVehicles.map(v => v.vendorName)));

    return (
        <div className="flex flex-col gap-8">
            {/* Top Action Buttons */}
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="h-9 gap-2 border-border/60 font-bold text-[12px] uppercase tracking-wide">
                    <Download size={14} />
                    Export Data
                </Button>
                <Button size="sm" className="h-9 gap-2 font-bold text-[12px] uppercase tracking-wide">
                    <Plus size={14} />
                    Register Vehicle
                </Button>
            </div>

            {/* Top Stats */}
            <VehicleStats vehicles={mockVehicles} />

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="w-[180px]">
                    <Select onValueChange={setVendorFilter} defaultValue="all">
                        <SelectTrigger className="h-9 bg-white border-border/60 text-[13px] font-semibold transition-all hover:border-primary/50">
                            <SelectValue placeholder="All Vendors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Vendors</SelectItem>
                            {vendors.map(v => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[160px]">
                    <Select onValueChange={setStatusFilter} defaultValue="all">
                        <SelectTrigger className="h-9 bg-white border-border/60 text-[13px] font-semibold transition-all hover:border-primary/50">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="BREAKDOWN">Breakdown</SelectItem>
                            <SelectItem value="STANDBY">Standby</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Table */}
            <VehicleTable vehicles={filteredVehicles} />
        </div>
    );
}
