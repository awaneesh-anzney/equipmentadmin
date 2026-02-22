"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-muted/40 dark:bg-background">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} />

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                <Header onMobileMenuToggle={() => setIsSidebarOpen(p => !p)} />
                <main className="flex-1 overflow-y-auto px-7 py-6">
                    <div className="mx-auto w-full max-w-[1440px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
