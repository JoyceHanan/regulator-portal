import { Batch, Alert, BatchStatus, HistoryEvent } from '../types';
import { MOCK_BATCHES, MOCK_ALERTS } from '../constants';

// Simulate an API call with a delay
const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 500); // 500ms delay
  });
};

export const getBatches = async (): Promise<Batch[]> => {
  return simulateApiCall(MOCK_BATCHES);
};

export const getAlerts = async (): Promise<Alert[]> => {
    return simulateApiCall(MOCK_ALERTS);
};

export const updateBatchStatus = async (batchId: string, newStatus: BatchStatus, historyEvent: HistoryEvent): Promise<Batch> => {
    console.log(`Updating batch ${batchId} to ${newStatus}`);
    const batchToUpdate = MOCK_BATCHES.find(b => b.id === batchId);
    if (batchToUpdate) {
        // In a real app, this would be a backend update.
        // Here, we return a new object to simulate the updated record.
        const updatedBatch = {
            ...batchToUpdate,
            status: newStatus,
            history: [...batchToUpdate.history, historyEvent]
        };
        return simulateApiCall(updatedBatch);
    }
    throw new Error("Batch not found");
};
