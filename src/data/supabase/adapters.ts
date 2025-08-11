import { supabase } from './client';
import { Gestora, Contato, Interacao, Oportunidade } from '../../types/domain';

/**
 * Implementações de repositórios consumindo o banco de dados Supabase. Todas as
 * operações são filtradas pelo usuário autenticado através do campo user_id,
 * que deve ser configurado em políticas de RLS no Supabase.
 */
export const SupabaseGestoraRepo = {
  async list(): Promise<Gestora[]> {
    const { data, error } = await supabase.from('gestoras').select('*');
    if (error) throw error;
    return data as Gestora[];
  },
  async get(id: string): Promise<Gestora | null> {
    const { data, error } = await supabase.from('gestoras').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Gestora;
  },
  async create(data: Gestora): Promise<void> {
    const { error } = await supabase.from('gestoras').insert(data);
    if (error) throw error;
  },
  async update(id: string, data: Partial<Gestora>): Promise<void> {
    const { error } = await supabase.from('gestoras').update(data).eq('id', id);
    if (error) throw error;
  },
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('gestoras').delete().eq('id', id);
    if (error) throw error;
  },
};

export const SupabaseContatoRepo = {
  async list(): Promise<Contato[]> {
    const { data, error } = await supabase.from('contatos').select('*');
    if (error) throw error;
    return data as Contato[];
  },
  async get(id: string): Promise<Contato | null> {
    const { data, error } = await supabase.from('contatos').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Contato;
  },
  async create(data: Contato): Promise<void> {
    const { error } = await supabase.from('contatos').insert(data);
    if (error) throw error;
  },
  async update(id: string, data: Partial<Contato>): Promise<void> {
    const { error } = await supabase.from('contatos').update(data).eq('id', id);
    if (error) throw error;
  },
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('contatos').delete().eq('id', id);
    if (error) throw error;
  },
};

export const SupabaseInteracaoRepo = {
  async list(): Promise<Interacao[]> {
    const { data, error } = await supabase.from('interacoes').select('*');
    if (error) throw error;
    return data as Interacao[];
  },
  async get(id: string): Promise<Interacao | null> {
    const { data, error } = await supabase.from('interacoes').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Interacao;
  },
  async create(data: Interacao): Promise<void> {
    const { error } = await supabase.from('interacoes').insert(data);
    if (error) throw error;
  },
  async update(id: string, data: Partial<Interacao>): Promise<void> {
    const { error } = await supabase.from('interacoes').update(data).eq('id', id);
    if (error) throw error;
  },
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('interacoes').delete().eq('id', id);
    if (error) throw error;
  },
};

export const SupabaseOportunidadeRepo = {
  async list(): Promise<Oportunidade[]> {
    const { data, error } = await supabase.from('oportunidades').select('*');
    if (error) throw error;
    return data as Oportunidade[];
  },
  async get(id: string): Promise<Oportunidade | null> {
    const { data, error } = await supabase.from('oportunidades').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Oportunidade;
  },
  async create(data: Oportunidade): Promise<void> {
    const { error } = await supabase.from('oportunidades').insert(data);
    if (error) throw error;
  },
  async update(id: string, data: Partial<Oportunidade>): Promise<void> {
    const { error } = await supabase.from('oportunidades').update(data).eq('id', id);
    if (error) throw error;
  },
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('oportunidades').delete().eq('id', id);
    if (error) throw error;
  },
};
