import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { Oportunidade } from '../../types/domain';
import { useOportunidadeRepo } from '../../data/repo/oportunidades';
import { formatCurrency } from '../../utils/format';

const OportunidadesList: React.FC = () => {
  const repo = useOportunidadeRepo();
  const [data, setData] = useState<Oportunidade[]>([]);
  useEffect(() => {
    repo.list().then(setData);
  }, [repo]);
  const columns = [
    { header: 'Título', accessor: 'titulo' as const },
    { header: 'Estágio', accessor: 'estagio' as const },
    { header: 'Valor', accessor: 'valorPotencialBRL' as const },
  ];
  const display = data.map(item => ({ ...item, valorPotencialBRL: formatCurrency(item.valorPotencialBRL) }));
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Oportunidades</h1>
        <Link to="/oportunidades/new" className="text-blue-600 underline">Nova Oportunidade</Link>
      </div>
      <DataTable data={display} columns={columns} />
    </div>
  );
};

export default OportunidadesList;