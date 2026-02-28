"use client";

import { useState } from "react";
import { mockBilling, BillingRecord } from "@/data/mockData";
import BillingTable from "./BillingTable";
import BillingStats from "./BillingStats";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

export default function BillingManagementContainer() {
    const [vendorFilter, setVendorFilter] = useState("all");

    const filteredRecords = mockBilling.filter((r: BillingRecord) => {
        return vendorFilter === "all" || r.vendorName === vendorFilter;
    });

    const vendors = Array.from(new Set(mockBilling.map((r: BillingRecord) => r.vendorName)));

    return (
        <div className="flex flex-col gap-8">
            {/* Action Section */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-border/60 font-bold text-[12px] uppercase tracking-wide transition-all duration-200 hover:border-primary hover:bg-white"
                >
                    <Filter size={14} />
                    Report
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-border/60 font-bold text-[12px] uppercase tracking-wide transition-all duration-200 hover:border-primary hover:bg-white"
                >
                    <Download size={14} />
                    Export CSV
                </Button>
            </div>

            {/* Stats Section */}
            <BillingStats records={mockBilling} />

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="w-[200px]">
                    <Select onValueChange={setVendorFilter} defaultValue="all">
                        <SelectTrigger className="h-9 bg-white border-border/60 text-[13px] font-semibold transition-all hover:border-primary/50">
                            <SelectValue placeholder="All Vendors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Vendors</SelectItem>
                            {vendors.map((v) => (
                                <SelectItem key={v as string} value={v as string}>{v as string}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Table */}
            <BillingTable records={filteredRecords} />
        </div>
    );
}
