import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  Icon: React.ElementType;
  colorClass: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, Icon, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};