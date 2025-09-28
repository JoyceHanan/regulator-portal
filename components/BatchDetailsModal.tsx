
import React from 'react';
import { Batch, BatchStatus } from '../types';
import { Timeline } from './Timeline';
import { STATUS_COLORS } from '../constants';
import { XIcon } from './icons/IconComponents';

interface BatchDetailsModalProps {
  batch: Batch | null;
  onClose: () => void;
}

export const BatchDetailsModal: React.FC<BatchDetailsModalProps> = ({ batch, onClose }) => {
  if (!batch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between pb-4 border-b">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">Batch Details: {batch.id}</h3>
                <p className="text-sm text-gray-500">Blockchain ID: {batch.blockchainId}</p>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                <XIcon />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <div><span className="font-semibold">Farmer:</span> {batch.farmerName}</div>
            <div><span className="font-semibold">Plant:</span> {batch.plantType}</div>
            <div><span className="font-semibold">Location:</span> {batch.location.state}</div>
            <div>
                <span className="font-semibold">Status:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[batch.status]}`}>
                    {batch.status}
                </span>
            </div>
          </div>
          
          <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Blockchain History</h4>
              <div className="h-64 overflow-y-auto pr-2">
                <Timeline history={batch.history} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
