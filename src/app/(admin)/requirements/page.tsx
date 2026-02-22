"use client";

import RequirementsHeader from "@/components/requirements/RequirementsHeader";
import RequirementsList from "@/components/requirements/RequirementsList";

export default function RequirementsPage() {
    return (
        <div className="flex flex-col gap-6 pb-10">
            <RequirementsHeader />
            <RequirementsList />
        </div>
    );
}