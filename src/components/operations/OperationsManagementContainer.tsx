"use client";

import { useState } from "react";
import { mockOperations, mockRequirements } from "@/data/mockData";
import OperationsTable from "./OperationsTable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

export default function OperationsManagementContainer() {
    const [projectFilter, setProjectFilter] = useState("all");

    const filteredOperations = mockOperations.filter(op => {
        return projectFilter === "all" || op.projectName === projectFilter;
    });

    const projects = Array.from(new Set(mockRequirements.map(r => r.projectName)));

    return (
        <div className="flex flex-col gap-8">
            {/* Action Section */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-border/60 font-bold text-[12px] uppercase tracking-wide transition-all duration-200 hover:border-primary hover:bg-white"
                >
                    <Calendar size={14} />
                    History
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-border/60 font-bold text-[12px] uppercase tracking-wide transition-all duration-200 hover:border-primary hover:bg-white"
                >
                    <Download size={14} />
                    Export Log
                </Button>
            </div>

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="w-[220px]">
                    <Select onValueChange={setProjectFilter} defaultValue="all">
                        <SelectTrigger className="h-9 bg-white border-border/60 text-[13px] font-semibold transition-all hover:border-primary/50">
                            <SelectValue placeholder="All Projects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Projects</SelectItem>
                            {projects.map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Table */}
            <OperationsTable operations={filteredOperations} />
        </div>
    );
}
