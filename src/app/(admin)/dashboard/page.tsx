import StatsRow from "@/components/dashboard/StatsRow";
import RevenueTrendChart from "@/components/dashboard/RevenueTrendChart";
import FleetStatusChart from "@/components/dashboard/FleetStatusChart";
import QuickStats from "@/components/dashboard/QuickStats";
import BidActivityChart from "@/components/dashboard/BidActivityChart";
import RecentRequirementsTable from "@/components/dashboard/RecentRequirementsTable";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-5 pb-10">
            {/* Stats Row — 4 equal cards */}
            <StatsRow />

            {/* Charts Row — Fleet LEFT (1 col), Revenue RIGHT (2 col) */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="xl:col-span-1 min-h-[310px]"><FleetStatusChart /></div>
                <div className="xl:col-span-2 min-h-[310px]"><RevenueTrendChart /></div>
            </div>

            {/* Bottom Row — Quick+Bids LEFT (1 col), Table RIGHT (2 col) */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 items-stretch">
                <div className="xl:col-span-1 flex flex-col gap-4">
                    <QuickStats />
                    <BidActivityChart />
                </div>
                <div className="xl:col-span-2"><RecentRequirementsTable /></div>
            </div>
        </div>
    );
}
