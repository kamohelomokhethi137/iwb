import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ExpenseChart = ({ darkMode }) => {
  // Sample expense data by category
  const data = [
    { name: 'Salaries', value: 4000 },
    { name: 'Office', value: 3000 },
    { name: 'Marketing', value: 2000 },
    { name: 'Software', value: 2780 },
    { name: 'Utilities', value: 1890 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;