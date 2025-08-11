import { Interacao } from '../../types/domain';
import { DATA_MODE } from '../../config';
import { IndexedDbInteracaoRepo } from '../indexeddb/adapters';
import { SupabaseInteracaoRepo } from '../supabase/adapters';

export type InteracaoRepo = {
  list(): Promise<Interacao[]>;
  get(id: string): Promise<Interacao | undefined | null>;
  create(data: Interacao): Promise<void>;
  update(id: string, data: Partial<Interacao>): Promise<void>;
  delete(id: string): Promise<void>;
};

export function useInteracaoRepo(): InteracaoRepo {
  return DATA_MODE === 'supabase' ? (SupabaseInteracaoRepo as InteracaoRepo) : (IndexedDbInteracaoRepo as InteracaoRepo);
}