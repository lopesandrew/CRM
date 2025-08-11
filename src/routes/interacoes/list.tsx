import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { Interacao } from '../../types/domain';
import { useInteracaoRepo } from '../../data/repo/interacoes';
import { formatDate } from '../../utils/format';

const InteracoesList: React.FC = () => {
  const repo = useInteracaoRepo();
  const [data, setData] = useState<Interacao[]>([]);
  useEffect(() => {
    repo.list().then(setData);
  }, [repo]);
  const columns = [
    { header: 'Título', accessor: 'titulo' as const },
    { header: 'Tipo', accessor: 'tipo' as const },
    { header: 'Data', accessor: 'data' as const },
  ];
  const display = data.map(item => ({ ...item, data: formatDate(item.data) }));
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Interações</h1>
        <Link to="/interacoes/new" className="text-blue-600 underline">Nova Interação</Link>
      </div>
      <DataTable data={display} columns={columns} />
    </div>
  );
};
export default InteracoesList;