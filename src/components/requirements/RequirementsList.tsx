"use client";

import RequirementCard from "./RequirementCard";
import { mockRequirements } from "@/data/mockData";

export default function RequirementsList() {
    return (
        <div className="flex flex-col gap-4">
            {mockRequirements.map((req) => (
                <RequirementCard key={req.id} requirement={req} />
            ))}
        </div>
    );
}
