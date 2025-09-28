import React, { useState, useEffect, useMemo } from 'react';
import { User, Batch, BatchStatus, HistoryEvent } from '../types';
import { getBatches, updateBatchStatus } from '../services/firebaseService';
import { LeafIcon } from './icons/IconComponents';
import { DashboardStats } from './DashboardStats';
import { ComplianceMap } from './ComplianceMap';
import { BatchTable } from './BatchTable';
import { AlertsPanel } from './AlertsPanel';
import { RegulatorActions } from './RegulatorActions';
import { BatchDetailsModal } from './BatchDetailsModal';
import { RecallWorkflowModal } from './RecallWorkflowModal';
import { ScheduleInspectionModal } from './ScheduleInspectionModal';
import { IssueRulesModal } from './IssueRulesModal';
import { UpgradeContractModal } from './UpgradeContractModal';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
    const [isRecallModalOpen, setIsRecallModalOpen] = useState(false);
    const [batchToRecall, setBatchToRecall] = useState<Batch | null>(null);

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isIssueRuleModalOpen, setIsIssueRuleModalOpen] = useState(false);
    const [isUpgradeContractModalOpen, setIsUpgradeContractModalOpen] = useState(false);

    useEffect(() => {
        const loadBatches = async () => {
            setLoading(true);
            try {
                const data = await getBatches();
                setBatches(data);
            } catch (error) {
                console.error("Failed to fetch batches:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBatches();
    }, []);

    const handleViewDetails = (batch: Batch) => {
        setSelectedBatch(batch);
    };

    const handleCloseDetails = () => {
        setSelectedBatch(null);
    };

    const handleOpenRecallModal = (batch: Batch) => {
        setBatchToRecall(batch);
        setIsRecallModalOpen(true);
    };

    const handleConfirmRecall = async (batchId: string, reason: string, historyEvent: HistoryEvent) => {
        try {
            const updatedBatch = await updateBatchStatus(batchId, BatchStatus.RECALLED, historyEvent);
            setBatches(prevBatches =>
                prevBatches.map(b => (b.id === batchId ? updatedBatch : b))
            );
        } catch (error) {
            console.error("Failed to recall batch:", error);
            // In a real app, you would show an error toast here.
        }
    };

    const handleScheduleInspection = async (batchId: string, notes: string) => {
        // Simulate API call
        console.log(`Inspection scheduled for ${batchId} with notes: ${notes}`);
        await new Promise(res => setTimeout(res, 1000));
        setIsScheduleModalOpen(false);
        // In a real app, you might add a history event or show a success toast.
    };
    
    const handleSuccess = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log("Action successful.");
        modalSetter(false);
        // In a real app, you would show a success toast here.
    }

    const stats = useMemo(() => {
        const totalBatches = batches.length;
        const recalledBatches = batches.filter(b => b.status === BatchStatus.RECALLED).length;
        const compliantBatches = batches.filter(b => b.status === BatchStatus.SHIPPED || b.status === BatchStatus.PROCESSED).length;
        const complianceRate = totalBatches > 0 ? `${((totalBatches - recalledBatches) / totalBatches * 100).toFixed(1)}%` : '100%';
        const exportReady = batches.filter(b => b.status === BatchStatus.SHIPPED).length;

        return { totalBatches, complianceRate, recalledBatches, exportReady };
    }, [batches]);

    const inspectionEligibleBatches = useMemo(() => {
        return batches.filter(b => b.status === BatchStatus.TESTING);
    }, [batches]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <LeafIcon className="h-8 w-8 text-green-700" />
                        <h1 className="text-2xl font-bold text-gray-800">AyurTrace Regulator Portal</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {user.displayName}</span>
                        <button onClick={onLogout} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 space-y-8">
                    <DashboardStats stats={stats} />
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-8">
                            <ComplianceMap batches={batches} />
                            <BatchTable batches={batches} onViewDetails={handleViewDetails} onRecall={handleOpenRecallModal} />
                        </div>
                        <div className="w-full lg:w-96 flex-shrink-0 space-y-8">
                            <AlertsPanel />
                            <RegulatorActions
                                onScheduleInspection={() => setIsScheduleModalOpen(true)}
                                onIssueRule={() => setIsIssueRuleModalOpen(true)}
                                onUpgradeContract={() => setIsUpgradeContractModalOpen(true)}
                            />
                        </div>
                    </div>

                </div>
            </main>

            {selectedBatch && <BatchDetailsModal batch={selectedBatch} onClose={handleCloseDetails} />}
            {isRecallModalOpen && batchToRecall && (
                <RecallWorkflowModal
                    batch={batchToRecall}
                    onClose={() => setIsRecallModalOpen(false)}
                    onConfirmRecall={handleConfirmRecall}
                />
            )}
            {isScheduleModalOpen && (
                <ScheduleInspectionModal
                    batches={inspectionEligibleBatches}
                    onClose={() => setIsScheduleModalOpen(false)}
                    onConfirm={handleScheduleInspection}
                />
            )}
            {isIssueRuleModalOpen && (
                <IssueRulesModal
                    onClose={() => setIsIssueRuleModalOpen(false)}
                    onSuccess={() => handleSuccess(setIsIssueRuleModalOpen)}
                />
            )}
            {isUpgradeContractModalOpen && (
                <UpgradeContractModal
                    onClose={() => setIsUpgradeContractModalOpen(false)}
                    onSuccess={() => handleSuccess(setIsUpgradeContractModalOpen)}
                />
            )}

        </div>
    );
};