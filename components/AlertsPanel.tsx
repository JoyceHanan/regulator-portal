
import React, { useState, useEffect } from 'react';
import { Alert } from '../types';
import { getAlerts } from '../services/firebaseService';
import { AlertTriangleIcon, InfoIcon, XIcon } from './icons/IconComponents';

export const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
      setLoading(false);
    };
    fetchAlerts();
  }, []);
  
  const dismissAlert = (id: string) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
  }

  const getIcon = (type: Alert['type']) => {
      switch(type) {
          case 'danger': return <div className="text-red-500"><AlertTriangleIcon /></div>;
          case 'warning': return <div className="text-yellow-500"><AlertTriangleIcon /></div>;
          case 'info': return <div className="text-blue-500"><InfoIcon /></div>;
      }
  }

  return (
    <div className="w-full lg:w-80 bg-white p-4 rounded-lg shadow flex-shrink-0">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Notifications</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Loading alerts...</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.length === 0 && <p className="text-sm text-gray-500">No new notifications.</p>}
          {alerts.map(alert => (
            <div key={alert.id} className="relative p-3 bg-gray-50 rounded-md border-l-4 border-current" style={{color: alert.type === 'danger' ? '#EF4444' : alert.type === 'warning' ? '#F59E0B' : '#3B82F6'}}>
              <div className="flex items-start">
                  <div className="flex-shrink-0">{getIcon(alert.type)}</div>
                  <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <button onClick={() => dismissAlert(alert.id)} className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600">
                    <XIcon/>
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};