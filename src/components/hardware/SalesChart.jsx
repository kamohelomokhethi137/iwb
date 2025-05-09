import React from 'react';
import { Bar } from 'react-chartjs-2';

const SalesChart = ({ darkMode, data }) => {
  const chartData = {
    labels: data?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Sales Trends',
        data: data?.map(item => item.sales) || [],
        backgroundColor: darkMode ? '#60A5FA' : '#3B82F6',
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

  return <Bar data={chartData} options={chartOptions} />;
};

export default SalesChart;