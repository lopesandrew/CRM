import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Dados de exemplo para o gráfico AUM. Em uma implementação real, estes valores
// serão provenientes das entidades gestoras e seu histórico.
const sampleData = [
  { name: 'Jan', value: 0 },
  { name: 'Fev', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Abr', value: 0 },
  { name: 'Mai', value: 0 },
  { name: 'Jun', value: 0 },
  { name: 'Jul', value: 0 },
  { name: 'Ago', value: 0 },
  { name: 'Set', value: 0 },
  { name: 'Out', value: 0 },
  { name: 'Nov', value: 0 },
  { name: 'Dez', value: 0 },
];

const Charts: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={sampleData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default Charts;