import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Contato } from '../../types/domain';
import { contatoSchema } from '../../validation/schemas';
import { useContatoRepo } from '../../data/repo/contatos';

const ContatosForm: React.FC = () => {
  const repo = useContatoRepo();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Contato>({
    resolver: zodResolver(contatoSchema),
  });

  useEffect(() => {
    if (isEdit && id) {
      repo.get(id).then((c) => {
        if (c) {
          (Object.keys(c) as (keyof Contato)[]).forEach(key => {
            // @ts-ignore
            setValue(key, c[key]);
          });
        }
      });
    } else {
      const now = new Date().toISOString();
      setValue('id', crypto.randomUUID());
      setValue('gestoraId', '');
      setValue('principal', false);
      setValue('createdAt', now);
      setValue('updatedAt', now);
    }
  }, [id, isEdit, repo, setValue]);

  const onSubmit = (data: Contato) => {
    if (isEdit) {
      repo.update(data.id, data).then(() => navigate('/contatos'));
    } else {
      repo.create(data).then(() => navigate('/contatos'));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Editar Contato' : 'Novo Contato'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input type="text" {...register('nome')} className="border rounded w-full p-2" />
          {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message?.toString()}</p>}
        </div>
        <div>
          <label className="block mb-1">Cargo</label>
          <input type="text" {...register('cargo')} className="border rounded w-full p-2" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email')} className="border rounded w-full p-2" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message?.toString()}</p>}
        </div>
        <div>
          <label className="block mb-1">Telefone</label>
          <input type="tel" {...register('telefone')} className="border rounded w-full p-2" />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/contatos')} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ContatosForm;