import React from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryChart = ({ darkMode, data }) => {
  const chartData = {
    labels: data?.map(item => item.category) || [],
    datasets: [
      {
        label: 'Category Distribution',
        data: data?.map(item => item.count) || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#CBD5E1' : '#64748B',
        },
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default CategoryChart;