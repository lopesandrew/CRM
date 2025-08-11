import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Gestora } from '../../types/domain';
import { useGestoraRepo } from '../../data/repo/gestoras';
import { formatCurrency } from '../../utils/format';

const GestoraDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const repo = useGestoraRepo();
  const [gestora, setGestora] = useState<Gestora | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      repo.get(id).then(g => setGestora(g || null));
    }
  }, [id, repo]);

  if (!gestora) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{gestora.nome}</h1>
      <p><strong>AUM:</strong> {gestora.aumBRL ? formatCurrency(gestora.aumBRL) : 'N/A'}</p>
      <p><strong>Tags:</strong> {gestora.tags?.join(', ')}</p>
      <p><strong>Observações:</strong> {gestora.observacoes || '-'}</p>
      <div className="flex space-x-2">
        <Link to={`/gestoras/${gestora.id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded">Editar</Link>
        <button
          onClick={() => {
            repo.delete(gestora.id).then(() => navigate('/gestoras'));
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default GestoraDetail;