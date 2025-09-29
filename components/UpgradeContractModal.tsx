import React, { useState } from 'react';
import { XIcon, SpinnerIcon, ShieldCheckIcon } from './icons/IconComponents';
import { GoogleGenAI } from '@google/genai';

interface UpgradeContractModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const UpgradeContractModal: React.FC<UpgradeContractModalProps> = ({ onClose, onSuccess }) => {
    const [upgradeReason, setUpgradeReason] = useState('');
    const [generatedPlan, setGeneratedPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGeneratePlan = async () => {
        if (!upgradeReason.trim()) {
            setError('Please provide a reason for the upgrade.');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setGeneratedPlan('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
Generate a high-level technical plan for a smart contract upgrade for the "AyurTrace" blockchain system.

The plan should follow this structure and include details relevant to the provided reason for the upgrade. Do not add any extra explanations or markdown formatting around the output.

**Smart Contract Upgrade Plan: AyurTrace v2.1**

**Reason for Upgrade:** {{upgradeReason}}

Here is the high-level technical plan for the upcoming smart contract upgrade.

**1. Key Steps:**
   - **Code Freeze:** Halt all development on the current contract.
   - **New Contract Development:** Implement the required changes in a new contract version (v2.1).
   - **Testing:**
     - Unit tests for all new and modified functions.
     - Integration tests on a private testnet.
     - Security audit by a third-party firm.
   - **Deployment:**
     - Deploy the new contract to the mainnet.
     - Execute a data migration script to transfer state from the old contract.
   - **Verification:**
     - Verify the new contract on Etherscan.
     - Announce the new contract address to all stakeholders.

**2. Potential Risks:**
   - **Data Migration Errors:** A bug in the migration script could lead to data loss. Mitigation: Extensive testing and dry runs.
   - **Replay Attacks:** Ensure nonces are handled correctly to prevent transaction replay. Mitigation: Follow standard security practices.
   - **Downtime:** The migration process may require a short period of downtime. Mitigation: Announce a maintenance window in advance.

**3. Testing Strategy:**
   - A comprehensive test suite will cover all contract functions.
   - The testnet deployment will simulate real-world usage patterns.
   - The third-party audit will focus on identifying potential security vulnerabilities.

This plan ensures a safe and efficient upgrade with minimal disruption to the network.

---
The reason for the upgrade is: "${upgradeReason}".
Please fill in the "{{upgradeReason}}" placeholder and customize the "Key Steps", "Potential Risks", and "Testing Strategy" sections to be specific to this reason.
`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setGeneratedPlan(response.text);

        } catch (e) {
            console.error(e);
            setError("Failed to generate upgrade plan. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExecuteUpgrade = () => {
        if (!generatedPlan) {
            setError("Please generate a plan before executing.");
            return;
        }
        // Simulate executing the upgrade
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-start justify-between pb-4 border-b">
                        <div className="flex items-center space-x-3">
                           <div className="p-2 bg-purple-100 rounded-full">
                               <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
                           </div>
                           <div>
                                <h3 className="text-xl font-semibold text-gray-900">Upgrade Smart Contract</h3>
                                <p className="text-sm text-gray-500">Generate a deployment plan and upgrade the network contract.</p>
                           </div>
                        </div>
                        <button onClick={onClose} className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600">
                            <XIcon />
                        </button>
                    </div>

                    <div className="py-6 space-y-4">
                        <div>
                            <label htmlFor="upgrade-reason" className="block text-sm font-medium text-gray-700">
                                Reason for Upgrade
                            </label>
                            <textarea
                                id="upgrade-reason"
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="e.g., Implement new GACP-CD guidelines and optimize gas fees for batch registration."
                                value={upgradeReason}
                                onChange={(e) => setUpgradeReason(e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleGeneratePlan}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                            >
                                {isLoading ? <><SpinnerIcon className="w-5 h-5 mr-2" /> Generating Plan...</> : 'Generate Upgrade Plan'}
                            </button>
                        </div>
                        
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}

                        {generatedPlan && (
                             <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Generated Upgrade Plan
                                </label>
                                <div className="mt-1 p-3 w-full bg-gray-50 rounded-md border border-gray-300 text-sm h-48 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap font-sans">{generatedPlan}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="pt-4 border-t flex justify-end space-x-3">
                         <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Cancel
                        </button>
                         <button
                            onClick={handleExecuteUpgrade}
                            disabled={!generatedPlan || isLoading}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                        >
                            Execute Upgrade
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};