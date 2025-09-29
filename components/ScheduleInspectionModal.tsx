import React, { useState } from 'react';
import { Batch, Alert } from '../types';
import { XIcon, ClipboardListIcon, SpinnerIcon } from './icons/IconComponents';
import { GoogleGenAI } from '@google/genai';

interface ScheduleInspectionModalProps {
  batches: Batch[]; // Should be pre-filtered for inspection eligibility
  alerts: Alert[];
  onClose: () => void;
  onConfirm: (batchId: string, notes: string) => Promise<void>;
}

export const ScheduleInspectionModal: React.FC<ScheduleInspectionModalProps> = ({ batches, alerts, onClose, onConfirm }) => {
    const [selectedBatchId, setSelectedBatchId] = useState<string>(batches.length > 0 ? batches[0].id : '');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [error, setError] = useState('');

    const selectedBatch = batches.find(b => b.id === selectedBatchId);

    const handleSuggestNotes = async () => {
        if (!selectedBatch) {
            setError("Please select a batch first.");
            return;
        }
        
        setIsSuggesting(true);
        setError('');
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
You are an AI assistant for a regulator in the AyurTrace system, ensuring the integrity of the Ayurvedic supply chain. Your task is to generate concise and actionable inspection notes. The notes should be based on the provided batch data and recent system-wide alerts, highlighting potential risks or specific areas for verification.

**Batch Information:**
- ID: ${selectedBatch.id}
- Plant Type: ${selectedBatch.plantType}
- Farmer: ${selectedBatch.farmerName}
- Location: ${selectedBatch.location.state}
- Full History: ${JSON.stringify(selectedBatch.history, null, 2)}

**Recent System-Wide Alerts (Top 3):**
${JSON.stringify(alerts.slice(0, 3), null, 2)} 

Based on this data, provide a single, focused paragraph of inspection notes. For example: "Focus on verifying batch volume and concentration of active ingredients due to recent reports of unusually high harvest volume from this farmer. Cross-verify pesticide levels due to regional alerts."
`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setNotes(response.text);

        } catch (e) {
            console.error(e);
            setError("Failed to generate suggestion. Please try again.");
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBatchId) {
            setError('Please select a batch to inspect.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await onConfirm(selectedBatchId, notes);
        } catch (err) {
            setError('Failed to schedule inspection. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex items-start justify-between pb-4 border-b">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                   <ClipboardListIcon className="w-6 h-6 text-blue-600"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Schedule Inspection</h3>
                                    <p className="text-sm text-gray-500">Select a batch and provide notes for the inspection.</p>
                                </div>
                            </div>
                            <button type="button" onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                                <XIcon />
                            </button>
                        </div>

                        <div className="py-6 space-y-4">
                            <div>
                                <label htmlFor="batch-select" className="block text-sm font-medium text-gray-700">
                                    Select Batch (Status: TESTING)
                                </label>
                                {batches.length > 0 ? (
                                    <select
                                        id="batch-select"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={selectedBatchId}
                                        onChange={(e) => setSelectedBatchId(e.target.value)}
                                    >
                                        {batches.map(batch => (
                                            <option key={batch.id} value={batch.id}>
                                                {batch.id} - {batch.plantType} ({batch.farmerName})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="mt-2 text-sm text-gray-500">No batches are currently in the testing phase.</p>
                                )}
                            </div>

                             <div>
                                <label htmlFor="inspection-notes" className="block text-sm font-medium text-gray-700">
                                    Inspection Notes
                                </label>
                                <textarea
                                    id="inspection-notes"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g., Cross-verifying pesticide levels. Click 'Suggest Notes' for an AI-generated draft."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                                <div className="mt-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSuggestNotes}
                                        disabled={isSuggesting || !selectedBatchId}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                                    >
                                        {isSuggesting ? <><SpinnerIcon className="w-4 h-4 mr-1.5"/> Generating...</> : 'Suggest Notes with AI'}
                                    </button>
                                </div>
                            </div>
                             {error && <p className="text-sm text-center text-red-500">{error}</p>}
                        </div>
                        
                        <div className="pt-4 border-t flex justify-end space-x-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || batches.length === 0}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                            >
                                {isLoading ? <><SpinnerIcon className="w-5 h-5 mr-2" /> Scheduling...</> : 'Confirm Schedule'}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};