import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LeadsChart = ({ darkMode }) => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'New Leads',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2
      },
      {
        label: 'Qualified Leads',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2
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
        mode: 'index',
        intersect: false,
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
          color: darkMode ? '#94A3B8' : '#64748B'
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default LeadsChart;