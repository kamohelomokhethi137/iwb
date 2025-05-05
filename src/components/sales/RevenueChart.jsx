import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ darkMode }) => {
  const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 62000],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(99, 102, 241, 0.7)'
        ],
        borderColor: [
          '#6366F1',
          '#6366F1',
          '#6366F1',
          '#6366F1'
        ],
        borderWidth: 1,
        borderRadius: 6
      },
      {
        label: 'Target',
        data: [50000, 50000, 50000, 50000],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10B981',
        borderWidth: 1,
        borderDash: [5, 5],
        type: 'line',
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#E2E8F0' : '#64748B',
          font: {
            weight: '600'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        },
        backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
        titleColor: darkMode ? '#E2E8F0' : '#1E293B',
        bodyColor: darkMode ? '#E2E8F0' : '#1E293B',
        borderColor: darkMode ? '#334155' : '#E2E8F0',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(226, 232, 240, 0.1)' : 'rgba(100, 116, 139, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: darkMode ? '#94A3B8' : '#64748B'
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(226, 232, 240, 0.1)' : 'rgba(100, 116, 139, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: darkMode ? '#94A3B8' : '#64748B',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;