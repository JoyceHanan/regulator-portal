import React, { useState } from 'react';
import { XIcon, SpinnerIcon } from './icons/IconComponents';
import { draftRule } from '../services/geminiService';

interface IssueRulesModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const IssueRulesModal: React.FC<IssueRulesModalProps> = ({ onClose, onSuccess }) => {
    const [ruleTopic, setRuleTopic] = useState('');
    const [draftedRule, setDraftedRule] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDraftRule = async () => {
        if (!ruleTopic.trim()) {
            setError('Please enter a topic for the rule.');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setDraftedRule('');

        try {
            const ruleText = await draftRule(ruleTopic);
            setDraftedRule(ruleText);
        } catch (e) {
            console.error(e);
            setError("Failed to draft rule. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleIssueRule = () => {
        if (!draftedRule) {
            setError("Please draft a rule before issuing.");
            return;
        }
        // Simulate issuing the rule
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-start justify-between pb-4 border-b">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Issue New Regulatory Rule</h3>
                            <p className="text-sm text-gray-500">Draft and then issue a new rule to the supply chain.</p>
                        </div>
                        <button onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                            <XIcon />
                        </button>
                    </div>

                    <div className="py-6 space-y-4">
                        <div>
                            <label htmlFor="rule-topic" className="block text-sm font-medium text-gray-700">
                                Rule Topic or Intent
                            </label>
                            <textarea
                                id="rule-topic"
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="e.g., Mandate QR code scanning at all logistic checkpoints for Ashwagandha batches."
                                value={ruleTopic}
                                onChange={(e) => setRuleTopic(e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleDraftRule}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                            >
                                {isLoading ? <><SpinnerIcon className="w-5 h-5 mr-2" /> Drafting...</> : 'Draft Rule'}
                            </button>
                        </div>
                        
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}

                        {draftedRule && (
                             <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Drafted Rule
                                </label>
                                <div className="mt-1 p-3 w-full bg-gray-50 rounded-md border border-gray-300 text-sm h-48 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap font-sans">{draftedRule}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="pt-4 border-t flex justify-end space-x-3">
                         <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Cancel
                        </button>
                         <button
                            onClick={handleIssueRule}
                            disabled={!draftedRule || isLoading}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                        >
                            Issue Rule
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
