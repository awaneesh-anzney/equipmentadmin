"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    ClipboardList,
    Gavel,
    Wrench,
    Car,
    Activity,
    Wallet,
    LogOut,
    Truck,
    ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { label: "Requirements", icon: ClipboardList, href: "/requirements" },
    { label: "Bidding", icon: Gavel, href: "/bidding" },
    { label: "Work Orders", icon: Wrench, href: "/work-orders" },
    { label: "Vehicles", icon: Car, href: "/vehicles" },
    { label: "Operations", icon: Activity, href: "/operations" },
    { label: "Billing", icon: Wallet, href: "/billing" },
];

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={[
                "fixed inset-y-0 left-0 z-50 w-[280px] shrink-0",
                "dark bg-sidebar text-sidebar-foreground",
                "border-r border-sidebar-border",
                "flex flex-col overflow-hidden",
                "transition-transform duration-200 ease-in-out",
                "lg:relative lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
        >
            {/* ─── Brand area ─────────────────────────────── */}
            <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border px-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
                    <Truck size={16} className="text-primary-foreground" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-extrabold uppercase leading-none tracking-wide text-white">
                        Equipment Share
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase leading-none tracking-widest text-muted-foreground">
                        Fleet Management
                    </p>
                </div>
            </div>

            {/* ─── Navigation ─────────────────────────────── */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                "group flex items-center justify-between rounded-lg px-3 py-2.5",
                                "text-[14px] font-semibold transition-all duration-150",
                                active
                                    ? "bg-primary/15 text-primary"
                                    : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-sidebar-foreground",
                            ].join(" ")}
                        >
                            <span className="flex items-center gap-3">
                                <Icon
                                    size={18}
                                    strokeWidth={active ? 2.5 : 2}
                                    className={active ? "text-primary" : "text-sidebar-foreground/40 transition-colors group-hover:text-sidebar-foreground"}
                                />
                                {label}
                            </span>
                            {active && (
                                <ChevronRight size={13} className="shrink-0 text-primary/50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ─── User section ───────────────────────────── */}
            <div className="shrink-0 border-t border-sidebar-border bg-black/10 px-4 py-3">
                <div className="mb-3 flex items-center gap-3 px-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-accent text-[11px] font-black text-white">
                        RK
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold leading-none text-white">Rajesh Kumar</p>
                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground/50">admin@transport.com</p>
                    </div>
                </div>

                <button className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium text-sidebar-foreground/40 transition-all hover:bg-rose-500/10 hover:text-rose-400">
                    <LogOut size={13} className="transition-transform group-hover:-translate-x-0.5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
