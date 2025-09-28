import React, { useState } from 'react';
import { Batch } from '../types';
import { XIcon, AlertTriangleIcon } from './icons/IconComponents';

interface RecallReasonModalProps {
  batch: Batch;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const RecallReasonModal: React.FC<RecallReasonModalProps> = ({ batch, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if (!reason.trim()) {
            return;
        }
        setIsLoading(true);
        // Simulate async action
        setTimeout(() => {
            onConfirm(reason);
            setIsLoading(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-start justify-between pb-4 border-b">
                         <div className="flex items-center space-x-3">
                           <div className="p-2 bg-red-100 rounded-full">
                               <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                           </div>
                           <div>
                                <h3 className="text-xl font-semibold text-gray-900">Recall Batch: {batch.id}</h3>
                                <p className="text-sm text-gray-500">Please provide a reason for the recall.</p>
                           </div>
                        </div>
                        <button type="button" onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                            <XIcon />
                        </button>
                    </div>
                    <div className="py-6">
                         <label htmlFor="recall-reason-input" className="block text-sm font-medium text-gray-700">
                            Reason for Recall
                        </label>
                        <textarea
                            id="recall-reason-input"
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            placeholder="e.g., Lab results show pesticide levels above the permitted threshold."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className="pt-4 border-t flex justify-end space-x-3">
                         <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !reason.trim()}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Confirming...' : 'Confirm Recall'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
