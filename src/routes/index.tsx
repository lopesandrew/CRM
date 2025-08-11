import React from 'react';
import Charts from '../components/Charts';

const Dashboard: React.FC = () => {
  // Exibe cartões de métricas simples. Os valores reais serão calculados nas futuras integrações.
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-medium">Gestoras Ativas</h2>
          <p className="text-3xl">0</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-medium">AUM Total (R$)</h2>
          <p className="text-3xl">0</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-medium">Oportunidades</h2>
          <p className="text-3xl">0</p>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-lg font-medium mb-2">AUM (últimos 12 meses)</h2>
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;