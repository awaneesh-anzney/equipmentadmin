import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateRequirementModal from "./CreateRequirementModal";
import { useState } from "react";

export default function RequirementsHeader() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="flex justify-end mb-4">
            <Button
                onClick={() => setIsCreateOpen(true)}
                className="h-11 shrink-0 gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                <Plus className="h-5 w-5" />
                Create Requirement
            </Button>

            <CreateRequirementModal
                isOpen={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            />
        </div>
    );
}
