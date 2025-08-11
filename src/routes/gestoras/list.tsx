import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { Gestora } from '../../types/domain';
import { useGestoraRepo } from '../../data/repo/gestoras';

const GestorasList: React.FC = () => {
  const repo = useGestoraRepo();
  const [data, setData] = useState<Gestora[]>([]);

  useEffect(() => {
    repo.list().then(setData);
  }, [repo]);

  const columns = [
    { header: 'Nome', accessor: 'nome' as const },
    { header: 'AUM (R$)', accessor: 'aumBRL' as const },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gestoras</h1>
        <Link to="/gestoras/new" className="text-blue-600 underline">Nova Gestora</Link>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default GestorasList;