import React from 'react';
import { ClipboardListIcon, FileTextIcon, ShieldCheckIcon } from './icons/IconComponents';

interface RegulatorActionsProps {
  onScheduleInspection: () => void;
  onIssueRule: () => void;
  onUpgradeContract: () => void;
}

export const RegulatorActions: React.FC<RegulatorActionsProps> = ({ onScheduleInspection, onIssueRule, onUpgradeContract }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">Regulator Co-Pilot</h3>
      <p className="text-sm text-gray-500 mb-4">AI-assisted actions and network controls.</p>
      <div className="space-y-3">
        <button
          onClick={onScheduleInspection}
          className="w-full flex items-center space-x-4 text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition group"
        >
          <div className="p-2 bg-blue-100 rounded-lg">
            <ClipboardListIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 group-hover:text-blue-700">Schedule Inspection</p>
            <p className="text-sm text-gray-500">Manually schedule an inspection for a batch in testing.</p>
          </div>
        </button>
        <button
          onClick={onIssueRule}
          className="w-full flex items-center space-x-4 text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition group"
        >
          <div className="p-2 bg-green-100 rounded-lg">
            <FileTextIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 group-hover:text-green-700">Issue New Rule</p>
            <p className="text-sm text-gray-500">Use AI to draft and deploy a new compliance rule.</p>
          </div>
        </button>
        <button
          onClick={onUpgradeContract}
          className="w-full flex items-center space-x-4 text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition group"
        >
          <div className="p-2 bg-purple-100 rounded-lg">
           <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 group-hover:text-purple-700">Upgrade Smart Contract</p>
            <p className="text-sm text-gray-500">Initiate a blockchain smart contract upgrade.</p>
          </div>
        </button>
      </div>
    </div>
  );
};