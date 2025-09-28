
import React from 'react';
import { HistoryEvent } from '../types';
import { CheckCircleIcon, AlertTriangleIcon } from './icons/IconComponents';

interface TimelineProps {
  history: HistoryEvent[];
}

const getIcon = (actor: HistoryEvent['actor'], action: string) => {
  const isFailure = action.toLowerCase().includes('fail') || action.toLowerCase().includes('recall');
  if (isFailure) return <AlertTriangleIcon />;
  return <CheckCircleIcon />;
};

const getColor = (actor: HistoryEvent['actor'], action: string) => {
    const isFailure = action.toLowerCase().includes('fail') || action.toLowerCase().includes('recall');
    if (isFailure) return 'text-red-500';

    switch (actor) {
        case 'Farmer': return 'text-blue-500';
        case 'Laboratory': return 'text-yellow-600';
        case 'Manufacturer': return 'text-purple-500';
        case 'Regulator': return 'text-red-600';
        case 'Logistics': return 'text-indigo-500';
        default: return 'text-gray-500';
    }
}

export const Timeline: React.FC<TimelineProps> = ({ history }) => {
  return (
    <div className="space-y-8">
      {history.map((event, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getColor(event.actor, event.action)} bg-opacity-20 bg-current`}>
                {getIcon(event.actor, event.action)}
              </div>
            </div>
            {index < history.length - 1 && <div className="w-px h-full bg-gray-300"></div>}
          </div>
          <div className="pb-8">
            <p className="mb-1 text-sm font-semibold text-gray-800">{event.actor}: {event.action}</p>
            <p className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
            <p className="mt-1 text-xs font-mono text-gray-400">Hash: {event.hash}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
