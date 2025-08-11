import { Contato } from '../../types/domain';
import { DATA_MODE } from '../../config';
import { IndexedDbContatoRepo } from '../indexeddb/adapters';
import { SupabaseContatoRepo } from '../supabase/adapters';

export type ContatoRepo = {
  list(): Promise<Contato[]>;
  get(id: string): Promise<Contato | undefined | null>;
  create(data: Contato): Promise<void>;
  update(id: string, data: Partial<Contato>): Promise<void>;
  delete(id: string): Promise<void>;
};

export function useContatoRepo(): ContatoRepo {
  return DATA_MODE === 'supabase' ? (SupabaseContatoRepo as ContatoRepo) : (IndexedDbContatoRepo as ContatoRepo);
}