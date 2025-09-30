import React, { useState, useEffect, useMemo } from 'react';
import { User, Batch, BatchStatus, HistoryEvent, Alert } from '../types';
import { getBatches, updateBatchStatus, getAlerts } from '../services/firebaseService';

import { LeafIcon } from './icons/IconComponents';
import { DashboardStats } from './DashboardStats';
import { ComplianceMap } from './ComplianceMap';
import { BatchTable } from './BatchTable';
import { AlertsPanel } from './AlertsPanel';
import { BatchDetailsModal } from './BatchDetailsModal';
import { RecallWorkflowModal } from './RecallWorkflowModal';
import { RegulatorActions } from './RegulatorActions';
import { ScheduleInspectionModal } from './ScheduleInspectionModal';
import { IssueRulesModal } from './IssueRulesModal';
import { UpgradeContractModal } from './UpgradeContractModal';


interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ModalType = 'details' | 'recall' | 'inspection' | 'rules' | 'contract' | null;

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [batchesData, alertsData] = await Promise.all([getBatches(), getAlerts()]);
        setBatches(batchesData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayToast = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleViewDetails = (batch: Batch) => {
    setSelectedBatch(batch);
    setActiveModal('details');
  };

  const handleInitiateRecall = (batch: Batch) => {
    setSelectedBatch(batch);
    setActiveModal('recall');
  };

  const handleConfirmRecall = async (batchId: string, reason: string, historyEvent: HistoryEvent) => {
      try {
        // Optimistic UI update
        const originalBatches = batches;
        setBatches(prevBatches =>
            prevBatches.map(b =>
                b.id === batchId ? { ...b, status: BatchStatus.RECALLED, history: [...b.history, historyEvent] } : b
            )
        );
        
        await updateBatchStatus(batchId, BatchStatus.RECALLED, historyEvent);
        
        // No need to set state again if API call is successful
        // The modal will be closed by its internal logic
      } catch (error) {
        console.error("Failed to recall batch:", error);
        // Revert UI on failure
        // setBatches(originalBatches);
        // In this mock setup, we don't revert. In a real app, you would.
      }
  };

  const handleScheduleInspection = async (batchId: string, notes: string) => {
    console.log(`Scheduling inspection for batch ${batchId} with notes: ${notes}`);
    
    const newAlert: Alert = {
        id: `ALERT-${Date.now()}`,
        title: 'Inspection Scheduled',
        description: `An inspection has been scheduled for batch ${batchId}.`,
        timestamp: new Date().toISOString(),
        type: 'info',
    };
    
    setAlerts(currentAlerts => [newAlert, ...currentAlerts]);

    // Simulate API call and toast message
    await new Promise(resolve => setTimeout(resolve, 500));
    displayToast(`Inspection scheduled for batch ${batchId}.`);
    setActiveModal(null);
  };
  
  const handleDismissAlert = (id: string) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  };

  const handleIssueRule = () => {
    const newAlert: Alert = {
        id: `ALERT-${Date.now()}`,
        title: 'New Rule Issued',
        description: 'A new compliance rule has been issued to all network participants.',
        timestamp: new Date().toISOString(),
        type: 'info',
    };
    setAlerts(currentAlerts => [newAlert, ...currentAlerts]);
    displayToast("New rule has been successfully issued to the network.");
    setActiveModal(null);
  };

  const handleUpgradeContract = () => {
    const newAlert: Alert = {
        id: `ALERT-${Date.now()}`,
        title: 'Smart Contract Upgrade',
        description: 'The network smart contract upgrade process has been initiated.',
        timestamp: new Date().toISOString(),
        type: 'info',
    };
    setAlerts(currentAlerts => [newAlert, ...currentAlerts]);
    displayToast("Smart contract upgrade process has been initiated.");
    setActiveModal(null);
  };

  const stats = useMemo(() => {
    const total = batches.length;
    const recalled = batches.filter(b => b.status === BatchStatus.RECALLED).length;
    const exportReady = batches.filter(b => b.status === BatchStatus.SHIPPED).length;
    const complianceRate = total > 0 ? (((total - recalled) / total) * 100).toFixed(1) + '%' : '100%';
    return {
      totalBatches: total,
      complianceRate,
      recalledBatches: recalled,
      exportReady,
    };
  }, [batches]);

  const inspectionEligibleBatches = useMemo(() => {
      return batches.filter(b => b.status === BatchStatus.TESTING);
  }, [batches]);

  const closeModal = () => {
    setSelectedBatch(null);
    setActiveModal(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <LeafIcon className="h-8 w-8 text-green-700" />
              <h1 className="text-2xl font-bold text-gray-800">AyurTrace Regulator Dashboard</h1>
            </div>
             <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.displayName}</span>
              <button onClick={onLogout} className="text-sm font-medium text-blue-600 hover:text-blue-800">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="text-center py-10">Loading dashboard...</div>
        ) : (
            <div className="space-y-8">
                <DashboardStats stats={stats} />
                <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow space-y-8">
                    <ComplianceMap batches={batches} />
                    <BatchTable 
                    batches={batches} 
                    stats={stats}
                    onViewDetails={handleViewDetails} 
                    onInitiateRecall={handleInitiateRecall} 
                    />
                </div>
                <div className="w-full lg:w-96 flex-shrink-0 space-y-8">
                    <AlertsPanel alerts={alerts} onDismissAlert={handleDismissAlert} />
                    <RegulatorActions
                        onScheduleInspection={() => setActiveModal('inspection')}
                        onIssueRule={() => setActiveModal('rules')}
                        onUpgradeContract={() => setActiveModal('contract')}
                    />
                </div>
                </div>
            </div>
        )}
      </main>

      {activeModal === 'details' && selectedBatch && (
        <BatchDetailsModal batch={selectedBatch} onClose={closeModal} />
      )}
      {activeModal === 'recall' && selectedBatch && (
        <RecallWorkflowModal batch={selectedBatch} onClose={closeModal} onConfirmRecall={handleConfirmRecall}/>
      )}
      {activeModal === 'inspection' && (
        <ScheduleInspectionModal
          batches={inspectionEligibleBatches}
          alerts={alerts}
          onClose={closeModal}
          onConfirm={handleScheduleInspection}
        />
      )}
      {activeModal === 'rules' && (
        <IssueRulesModal
            onClose={closeModal}
            onSuccess={handleIssueRule}
        />
      )}
      {activeModal === 'contract' && (
        <UpgradeContractModal
            onClose={closeModal}
            onSuccess={handleUpgradeContract}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          {showToast}
        </div>
      )}
    </div>
  );
};
