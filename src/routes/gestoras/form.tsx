import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Gestora } from '../../types/domain';
import { gestoraSchema } from '../../validation/schemas';
import { useGestoraRepo } from '../../data/repo/gestoras';

const GestorasForm: React.FC = () => {
  const repo = useGestoraRepo();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Gestora>({
    resolver: zodResolver(gestoraSchema),
  });

  React.useEffect(() => {
    if (isEdit && id) {
      repo.get(id).then((gestora) => {
        if (gestora) {
          (Object.keys(gestora) as (keyof Gestora)[]).forEach(key => {
            // @ts-ignore
            setValue(key, gestora[key]);
          });
        }
      });
    } else {
      // valores padrão
      const now = new Date().toISOString();
      setValue('id', crypto.randomUUID());
      setValue('aumHistorico', []);
      setValue('produtosInteresse', { cra: false, cri: false, debentures: false, fidc: false, outros: [] });
      setValue('tags', []);
      setValue('createdAt', now);
      setValue('updatedAt', now);
    }
  }, [id, isEdit, repo, setValue]);

  const onSubmit = (data: Gestora) => {
    if (isEdit) {
      repo.update(data.id, data).then(() => navigate('/gestoras'));
    } else {
      repo.create(data).then(() => navigate('/gestoras'));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Editar Gestora' : 'Nova Gestora'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input type="text" {...register('nome')} className="border rounded w-full p-2" />
          {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message?.toString()}</p>}
        </div>
        <div>
          <label className="block mb-1">AUM (R$)</label>
          <input type="number" step="0.01" {...register('aumBRL', { valueAsNumber: true })} className="border rounded w-full p-2" />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/gestoras')} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default GestorasForm;