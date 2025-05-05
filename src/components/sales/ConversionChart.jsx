import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ConversionChart = ({ darkMode }) => {
  const data = {
    labels: ['New Leads', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won'],
    datasets: [
      {
        data: [100, 80, 60, 40, 20],
        backgroundColor: [
          '#6366F1',
          '#8B5CF6',
          '#EC4899',
          '#F97316',
          '#10B981'
        ],
        borderColor: darkMode ? '#1E293B' : '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: darkMode ? '#E2E8F0' : '#64748B',
          font: {
            weight: '600'
          },
          padding: 20,
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
        titleColor: darkMode ? '#E2E8F0' : '#1E293B',
        bodyColor: darkMode ? '#E2E8F0' : '#1E293B',
        borderColor: darkMode ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>20%</div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>Conversion Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ConversionChart;