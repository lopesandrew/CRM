import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Oportunidade } from '../../types/domain';
import { oportunidadeSchema } from '../../validation/schemas';
import { useOportunidadeRepo } from '../../data/repo/oportunidades';

const OportunidadesForm: React.FC = () => {
  const repo = useOportunidadeRepo();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Oportunidade>({
    resolver: zodResolver(oportunidadeSchema),
  });

  useEffect(() => {
    if (isEdit && id) {
      repo.get(id).then(o => {
        if (o) {
          (Object.keys(o) as (keyof Oportunidade)[]).forEach(key => {
            // @ts-ignore
            setValue(key, o[key]);
          });
        }
      });
    } else {
      const now = new Date().toISOString();
      setValue('id', crypto.randomUUID());
      setValue('gestoraId', '');
      setValue('produtos', []);
      setValue('createdAt', now);
      setValue('updatedAt', now);
    }
  }, [id, isEdit, repo, setValue]);

  const onSubmit = (data: Oportunidade) => {
    if (isEdit) {
      repo.update(data.id, data).then(() => navigate('/oportunidades'));
    } else {
      repo.create(data).then(() => navigate('/oportunidades'));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Editar Oportunidade' : 'Nova Oportunidade'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Título</label>
          <input type="text" {...register('titulo')} className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block mb-1">Estágio</label>
          <select {...register('estagio')} className="border rounded w-full p-2">
            <option value="lead">Lead</option>
            <option value="qualificado">Qualificado</option>
            <option value="em_abordagem">Em abordagem</option>
            <option value="em_analise">Em análise</option>
            <option value="bookbuilding">Bookbuilding</option>
            <option value="alocado">Alocado</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Valor Potencial (R$)</label>
          <input type="number" step="0.01" {...register('valorPotencialBRL', { valueAsNumber: true })} className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block mb-1">Probabilidade (%)</label>
          <input type="number" {...register('probabilidade', { valueAsNumber: true })} className="border rounded w-full p-2" />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/oportunidades')} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default OportunidadesForm;