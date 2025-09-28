import React from 'react';
import { KpiCard } from './KpiCard';
import { ShieldCheckIcon, ServerIcon, FileDownIcon, AlertTriangleIcon } from './icons/IconComponents';

interface Stats {
  totalBatches: number;
  complianceRate: string;
  recalledBatches: number;
  exportReady: number;
}
interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Total Batches"
        value={String(stats.totalBatches)}
        Icon={ServerIcon}
        colorClass="bg-indigo-100 text-indigo-600"
      />
      <KpiCard
        title="Compliance Rate"
        value={stats.complianceRate}
        Icon={ShieldCheckIcon}
        colorClass="bg-green-100 text-green-600"
      />
      <KpiCard
        title="Export Ready"
        value={`${stats.exportReady} Batches`}
        Icon={FileDownIcon}
        colorClass="bg-blue-100 text-blue-600"
      />
      <KpiCard
        title="Recalled Batches"
        value={String(stats.recalledBatches)}
        Icon={AlertTriangleIcon}
        colorClass="bg-red-100 text-red-600"
      />
    </div>
  );
};