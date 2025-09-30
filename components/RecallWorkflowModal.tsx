import React, { useState } from 'react';
import { Batch, BatchStatus, HistoryEvent } from '../types';
import { XIcon, AlertTriangleIcon, CheckCircleIcon, SpinnerIcon } from './icons/IconComponents';
import { generateRecallCommunication } from '../services/geminiService';

interface RecallWorkflowModalProps {
  batch: Batch;
  onClose: () => void;
  onConfirmRecall: (batchId: string, reason: string, historyEvent: HistoryEvent) => void;
}

const WorkflowStep: React.FC<{ title: string; status: 'pending' | 'active' | 'complete'; isLast?: boolean; children?: React.ReactNode }> = ({ title, status, isLast = false, children }) => {
    const getIcon = () => {
        if (status === 'complete') return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
        if (status === 'active') return <SpinnerIcon className="w-5 h-5 text-blue-500" />;
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
    };

    return (
        <div className="flex">
            <div className="flex flex-col items-center mr-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${status === 'active' ? 'bg-blue-100' : status === 'complete' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {getIcon()}
                </div>
                {!isLast && <div className="w-px h-full bg-gray-300"></div>}
            </div>
            <div className="pb-8 flex-1">
                <p className={`mb-1 font-semibold ${status === 'pending' ? 'text-gray-500' : 'text-gray-800'}`}>{title}</p>
                {status !== 'pending' && <div className="mt-2 text-sm">{children}</div>}
            </div>
        </div>
    );
};


export const RecallWorkflowModal: React.FC<RecallWorkflowModalProps> = ({ batch, onClose, onConfirmRecall }) => {
    const [step, setStep] = useState(1);
    const [reason, setReason] = useState('');
    const [communication, setCommunication] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const generateCommunication = async () => {
        if (!reason.trim()) {
            setError("Please provide a reason before generating communication.");
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const communicationText = await generateRecallCommunication(batch, reason);
            setCommunication(communicationText);
            setStep(2);

        } catch (e) {
            console.error(e);
            setError("Failed to generate communication. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const confirmRecall = () => {
        const historyEvent: HistoryEvent = {
            actor: 'Regulator',
            action: 'Batch Recalled',
            timestamp: new Date().toISOString(),
            hash: `0x${Math.random().toString(16).slice(2, 10)}...`,
            details: { reason }
        };
        onConfirmRecall(batch.id, reason, historyEvent);
        setStep(3);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-start justify-between pb-4 border-b">
                         <div className="flex items-center space-x-3">
                           <div className="p-2 bg-red-100 rounded-full">
                               <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                           </div>
                           <div>
                                <h3 className="text-xl font-semibold text-gray-900">Initiate Recall: {batch.id}</h3>
                                <p className="text-sm text-gray-500">Follow the steps to execute a network-wide recall.</p>
                           </div>
                        </div>
                        <button onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                            <XIcon />
                        </button>
                    </div>

                    <div className="py-6">
                        <WorkflowStep title="Step 1: Justification" status={step === 1 ? 'active' : 'complete'}>
                            <label htmlFor="recall-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Recall</label>
                            <textarea
                                id="recall-reason"
                                rows={3}
                                className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                placeholder="e.g., Lab results show pesticide levels above the permitted threshold."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                disabled={step > 1}
                            />
                            {step === 1 && (
                                <div className="mt-3 text-right">
                                    <button onClick={generateCommunication} disabled={isLoading || !reason.trim()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
                                        {isLoading ? <><SpinnerIcon className="w-5 h-5 mr-2"/> Generating...</> : "Generate Communication Plan"}
                                    </button>
                                </div>
                            )}
                        </WorkflowStep>

                         <WorkflowStep title="Step 2: Stakeholder Communication" status={step === 2 ? 'active' : step > 2 ? 'complete' : 'pending'}>
                            {communication && (
                                <>
                                    <label className="block text-sm font-medium text-gray-700">Generated Communication Draft:</label>
                                    <div className="mt-1 p-3 w-full bg-gray-50 rounded-md border border-gray-300 text-sm h-32 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap font-sans">{communication}</pre>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <button onClick={confirmRecall} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-600">
                                            Execute Recall
                                        </button>
                                    </div>
                                </>
                            )}
                        </WorkflowStep>
                        
                         <WorkflowStep title="Step 3: Blockchain Update" status={step === 3 ? 'complete' : 'pending'} isLast={true}>
                             {step === 3 && (
                                 <>
                                    <p className="text-green-700">The recall has been recorded on the blockchain. Batch <span className="font-mono">{batch.id}</span> is now marked as <span className="font-bold">{BatchStatus.RECALLED}</span>.</p>
                                    <div className="mt-4 text-right">
                                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                            Close
                                        </button>
                                    </div>
                                 </>
                             )}
                        </WorkflowStep>
                    </div>
                     {error && <p className="text-sm text-center text-red-500 mb-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};
