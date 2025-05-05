import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const RevenueChart = ({ darkMode }) => {
  // Sample revenue data
  const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: darkMode ? '#D1D5DB' : '#4B5563' }} 
        />
        <YAxis 
          tick={{ fill: darkMode ? '#D1D5DB' : '#4B5563' }} 
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: darkMode ? '#374151' : '#FFFFFF',
            borderColor: darkMode ? '#4B5563' : '#E5E7EB',
            color: darkMode ? '#F3F4F6' : '#111827'
          }}
        />
        <Legend 
          wrapperStyle={{
            color: darkMode ? '#F3F4F6' : '#111827'
          }}
        />
        <Bar 
          dataKey="revenue" 
          fill="#2563EB" 
          radius={[4, 4, 0, 0]}
          name="Revenue"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;