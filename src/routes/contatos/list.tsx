import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { Contato } from '../../types/domain';
import { useContatoRepo } from '../../data/repo/contatos';

const ContatosList: React.FC = () => {
  const repo = useContatoRepo();
  const [data, setData] = useState<Contato[]>([]);
  useEffect(() => {
    repo.list().then(setData);
  }, [repo]);
  const columns = [
    { header: 'Nome', accessor: 'nome' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Telefone', accessor: 'telefone' as const },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Contatos</h1>
        <Link to="/contatos/new" className="text-blue-600 underline">Novo Contato</Link>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default ContatosList;