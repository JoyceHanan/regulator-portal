import React, { useMemo } from 'react';
import { Batch, BatchStatus } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendAnalysisChartProps {
  batches: Batch[];
}

export const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({ batches }) => {
  const chartData = useMemo(() => {
    const dataByDate: { [date: string]: { compliant: number, recalled: number, pending: number } } = {};

    batches.forEach(batch => {
      // Defensively check if history exists and is not empty
      if (batch.history && batch.history.length > 0) {
        const date = new Date(batch.history[0].timestamp).toISOString().split('T')[0];
        if (!dataByDate[date]) {
          dataByDate[date] = { compliant: 0, recalled: 0, pending: 0 };
        }
        if (batch.status === BatchStatus.RECALLED) {
          dataByDate[date].recalled++;
        } else if (batch.status === BatchStatus.PROCESSED || batch.status === BatchStatus.SHIPPED) {
          dataByDate[date].compliant++;
        } else {
          dataByDate[date].pending++;
        }
      }
    });

    return Object.keys(dataByDate)
      .map(date => ({
        date,
        ...dataByDate[date]
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  }, [batches]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Trend Analysis</h3>
      {chartData.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="compliant" name="Compliant" stroke="#10B981" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="pending" name="Pending" stroke="#F59E0B" />
                    <Line type="monotone" dataKey="recalled" name="Recalled" stroke="#EF4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-gray-500">
            Not enough data for trend analysis.
        </div>
      )}
    </div>
  );
};