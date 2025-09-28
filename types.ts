
export enum BatchStatus {
  COLLECTED = 'COLLECTED',
  TESTING = 'TESTING',
  PROCESSED = 'PROCESSED',
  RECALLED = 'RECALLED',
  SHIPPED = 'SHIPPED',
}

export interface HistoryEvent {
  actor: 'Farmer' | 'Laboratory' | 'Manufacturer' | 'Regulator' | 'Logistics';
  action: string;
  timestamp: string;
  hash: string;
  details?: Record<string, any>;
}

export interface Batch {
  id: string;
  farmerName: string;
  plantType: string;
  blockchainId: string;
  status: BatchStatus;
  location: {
    lat: number;
    lng: number;
    state: string;
  };
  history: HistoryEvent[];
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'danger' | 'warning' | 'info';
}

export interface User {
  uid: string;
  email: string;
  role: 'ayush' | 'farmer' | 'lab';
  displayName: string;
}
