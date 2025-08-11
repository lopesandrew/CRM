import { Gestora } from '../../types/domain';
import { DATA_MODE } from '../../config';
import { IndexedDbGestoraRepo } from '../indexeddb/adapters';
import { SupabaseGestoraRepo } from '../supabase/adapters';

export type GestoraRepo = {
  list(): Promise<Gestora[]>;
  get(id: string): Promise<Gestora | undefined | null>;
  create(data: Gestora): Promise<void>;
  update(id: string, data: Partial<Gestora>): Promise<void>;
  delete(id: string): Promise<void>;
};

/**
 * Hook para obter o repositório de gestoras de acordo com o modo de dados configurado.
 */
export function useGestoraRepo(): GestoraRepo {
  return DATA_MODE === 'supabase' ? (SupabaseGestoraRepo as GestoraRepo) : (IndexedDbGestoraRepo as GestoraRepo);
}