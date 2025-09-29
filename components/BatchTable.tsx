import React, { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Batch, BatchStatus } from '../types';
import { STATUS_COLORS } from '../constants';
import { AlertTriangleIcon, FileDownIcon } from './icons/IconComponents';

interface Stats {
  totalBatches: number;
  complianceRate: string;
  recalledBatches: number;
  exportReady: number;
}
interface BatchTableProps {
  batches: Batch[];
  stats: Stats;
  onViewDetails: (batch: Batch) => void;
  onInitiateRecall: (batch: Batch) => void;
}

export const BatchTable: React.FC<BatchTableProps> = ({ batches, stats, onViewDetails, onInitiateRecall }) => {
  const [filter, setFilter] = useState('');

  const filteredBatches = useMemo(() => {
    return batches.filter(batch =>
      batch.id.toLowerCase().includes(filter.toLowerCase()) ||
      batch.farmerName.toLowerCase().includes(filter.toLowerCase()) ||
      batch.plantType.toLowerCase().includes(filter.toLowerCase())
    );
  }, [batches, filter]);

  const handleExportPdf = () => {
    const doc = new jsPDF();
    
    // Main Title
    doc.setFontSize(22);
    doc.text("AYUSH Compliance Report", 14, 22);
    
    // Date
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US')}`, 14, 30);

    // Compliance Summary
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Compliance Summary", 14, 45);
    
    doc.setFontSize(10);
    doc.setTextColor(50);
    const summaryText = `Total Batches: ${stats.totalBatches}    Compliance Rate: ${stats.complianceRate}    Export Ready: ${stats.exportReady}    Recalled: ${stats.recalledBatches}`;
    doc.text(summaryText, 14, 52);

    const mainTableColumn = ["Batch ID", "Farmer Name", "Plant Type", "Status", "Location"];
    const mainTableRows: (string | number)[][] = [];

    filteredBatches.forEach(batch => {
        const batchData = [
            batch.id,
            batch.farmerName,
            batch.plantType,
            batch.status,
            batch.location.state,
        ];
        mainTableRows.push(batchData);
    });

    (doc as any).autoTable({
        startY: 62,
        head: [mainTableColumn],
        body: mainTableRows,
        theme: 'striped',
        headStyles: { fillColor: [29, 78, 216] } // Blue
    });

    // Audit Trail
    const recalledBatches = filteredBatches.filter(b => b.status === BatchStatus.RECALLED);
    if (recalledBatches.length > 0) {
        const finalY = (doc as any).lastAutoTable.finalY || 80;
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Audit Trail for Recalled Batches", 14, finalY + 15);

        const auditTableColumn = ["Batch ID", "Actor", "Action", "Timestamp", "Reason"];
        const auditTableRows: (string | number)[][] = [];

        recalledBatches.forEach(batch => {
            const recallEvent = batch.history.find(e => e.action === 'Batch Recalled');
            if (recallEvent) {
                auditTableRows.push([
                    batch.id,
                    recallEvent.actor,
                    recallEvent.action,
                    new Date(recallEvent.timestamp).toLocaleString(),
                    recallEvent.details?.reason || 'N/A'
                ]);
            }
        });
        
        (doc as any).autoTable({
            startY: finalY + 20,
            head: [auditTableColumn],
            body: auditTableRows,
            theme: 'grid',
            headStyles: { fillColor: [220, 38, 38] } // Red
        });
    }


    const date = new Date().toISOString().split('T')[0];
    doc.save(`AYUSH_Compliance_Report_${date}.pdf`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Supply Chain Batches</h3>
        <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search batches..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-56 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleExportPdf}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              <FileDownIcon className="w-5 h-5 mr-2 text-gray-500" />
              Export PDF
            </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBatches.map((batch) => (
              <tr key={batch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{batch.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.farmerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.plantType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.location.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[batch.status]}`}>
                    {batch.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => onViewDetails(batch)} className="text-blue-600 hover:text-blue-900">View</button>
                  {batch.status !== BatchStatus.RECALLED && (
                    <button onClick={() => onInitiateRecall(batch)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                        <AlertTriangleIcon className="w-4 h-4 mr-1"/>
                        Recall
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};