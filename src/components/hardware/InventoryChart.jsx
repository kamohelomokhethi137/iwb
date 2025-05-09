import React from 'react';
import { Line } from 'react-chartjs-2';

const InventoryChart = ({ darkMode, data }) => {
  const chartData = {
    labels: data?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Inventory Levels',
        data: data?.map(item => item.level) || [],
        borderColor: darkMode ? '#60A5FA' : '#3B82F6',
        backgroundColor: darkMode ? '#60A5FA' : '#3B82F6',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: darkMode ? '#4A5568' : '#E2E8F0',
        },
      },
      y: {
        grid: {
          color: darkMode ? '#4A5568' : '#E2E8F0',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#CBD5E1' : '#64748B',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default InventoryChart;