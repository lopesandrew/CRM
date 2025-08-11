import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Interacao } from '../../types/domain';
import { interacaoSchema } from '../../validation/schemas';
import { useInteracaoRepo } from '../../data/repo/interacoes';
import MarkdownEditor from '../../components/MarkdownEditor';

const InteracoesForm: React.FC = () => {
  const repo = useInteracaoRepo();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Interacao>({
    resolver: zodResolver(interacaoSchema),
  });
  const descricao = watch('descricao') ?? '';
  useEffect(() => {
    if (isEdit && id) {
      repo.get(id).then((i) => {
        if (i) {
          (Object.keys(i) as (keyof Interacao)[]).forEach(key => {
            // @ts-ignore
            setValue(key, i[key]);
          });
        }
      });
    } else {
      const now = new Date().toISOString();
      setValue('id', crypto.randomUUID());
      setValue('gestoraId', '');
      setValue('arquivos', []);
      setValue('createdAt', now);
      setValue('updatedAt', now);
    }
  }, [id, isEdit, repo, setValue]);

  const onSubmit = (data: Interacao) => {
    if (isEdit) {
      repo.update(data.id, data).then(() => navigate('/interacoes'));
    } else {
      repo.create(data).then(() => navigate('/interacoes'));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Editar Interação' : 'Nova Interação'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Título</label>
          <input type="text" {...register('titulo')} className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block mb-1">Tipo</label>
          <select {...register('tipo')} className="border rounded w-full p-2">
            <option value="reuniao">Reunião</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="evento">Evento</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Data</label>
          <input type="date" {...register('data')} className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block mb-1">Descrição (Markdown)</label>
          <MarkdownEditor value={descricao} onChange={val => setValue('descricao', val)} />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/interacoes')} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default InteracoesForm;