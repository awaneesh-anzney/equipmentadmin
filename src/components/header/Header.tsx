"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
    onMobileMenuToggle: () => void;
}

const PAGE_META: Record<string, { title: string; subtitle?: string; date?: boolean }> = {
    "/dashboard": { title: "Dashboard", date: true },
    "/requirements": { title: "Requirements", date: false },
    "/bidding": { title: "Bidding", date: false },
    "/work-orders": { title: "Work Orders", subtitle: "Active contracts with vendors", date: false },
    "/vehicles": { title: "Vehicles", date: false },
    "/operations": { title: "Operations", date: false },
    "/billing": { title: "Billing", date: false },
};

function getFormattedDate() {
    return new Date().toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
    const pathname = usePathname();
    const meta = PAGE_META[pathname] ?? { title: "Admin", date: false };

    return (
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-white px-6 dark:bg-card">
            {/* Mobile toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground lg:hidden"
                onClick={onMobileMenuToggle}
            >
                <Menu size={18} />
            </Button>

            {/* Dynamic page title — same style as screenshot */}
            <div className="flex min-w-0 flex-col">
                <h1 className="text-[18px] font-bold leading-none text-foreground">
                    {meta.title}
                </h1>
                {meta.subtitle && (
                    <p className="mt-0.5 text-[12px] font-medium leading-none text-muted-foreground">
                        {meta.subtitle}
                    </p>
                )}
                {meta.date && (
                    <p className="mt-0.5 text-[12px] font-medium leading-none text-muted-foreground">
                        {getFormattedDate()}
                    </p>
                )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="relative hidden sm:block">
                <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50"
                />
                <Input
                    placeholder="Search..."
                    className="h-9 w-52 rounded-lg border border-border/50 bg-muted/30 pl-8 text-[13px] transition-all duration-300 hover:border-primary/40 hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-0.5">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <Bell size={16} strokeWidth={2} />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive ring-2 ring-background" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <Settings size={16} strokeWidth={2} />
                </Button>
            </div>
        </header>
    );
}
