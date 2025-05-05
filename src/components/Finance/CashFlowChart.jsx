import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CashFlowChart = ({ darkMode }) => {
  // Sample cash flow data
  const data = [
    { name: 'Jan', inflow: 4000, outflow: 2400 },
    { name: 'Feb', inflow: 3000, outflow: 1398 },
    { name: 'Mar', inflow: 5000, outflow: 3800 },
    { name: 'Apr', inflow: 2780, outflow: 3908 },
    { name: 'May', inflow: 1890, outflow: 4800 },
    { name: 'Jun', inflow: 2390, outflow: 3800 },
    { name: 'Jul', inflow: 3490, outflow: 4300 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <Line
          type="monotone"
          dataKey="inflow"
          stroke="#10B981"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Cash Inflow"
        />
        <Line
          type="monotone"
          dataKey="outflow"
          stroke="#EF4444"
          strokeWidth={2}
          name="Cash Outflow"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;