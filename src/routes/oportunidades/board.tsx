import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOportunidadeRepo } from '../../data/repo/oportunidades';
import { Oportunidade, OportunidadeEstagio } from '../../types/domain';

const stages: OportunidadeEstagio[] = ['lead','qualificado','em_abordagem','em_analise','bookbuilding','alocado','perdido'];

const Board: React.FC = () => {
  const repo = useOportunidadeRepo();
  const [items, setItems] = useState<Oportunidade[]>([]);
  useEffect(() => {
    repo.list().then(setItems);
  }, [repo]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pipeline de Oportunidades</h1>
        <Link to="/oportunidades/new" className="text-blue-600 underline">Nova Oportunidade</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {stages.map(stage => (
          <div key={stage} className="border rounded p-2 bg-gray-50 dark:bg-gray-800">
            <h2 className="font-medium capitalize mb-2">{stage.replace('_', ' ')}</h2>
            <div className="space-y-2">
              {items.filter(item => item.estagio === stage).map(item => (
                <div key={item.id} className="p-2 bg-white dark:bg-gray-900 rounded shadow text-sm">
                  {item.titulo}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;