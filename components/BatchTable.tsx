import React from 'react';
import { Batch, BatchStatus } from '../types';
import { STATUS_COLORS } from '../constants';

interface BatchTableProps {
  batches: Batch[];
  onViewDetails: (batch: Batch) => void;
  onRecall: (batch: Batch) => void;
}

export const BatchTable: React.FC<BatchTableProps> = ({ batches, onViewDetails, onRecall }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
       <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Batch Monitoring</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.plantType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.farmerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.location.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[batch.status]}`}>
                    {batch.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onViewDetails(batch)} className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                  {batch.status !== BatchStatus.RECALLED && (
                     <button onClick={() => onRecall(batch)} className="text-red-600 hover:text-red-900 ml-4">
                        Recall
                     </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
