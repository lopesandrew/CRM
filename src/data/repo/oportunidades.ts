import { Oportunidade } from '../../types/domain';
import { DATA_MODE } from '../../config';
import { IndexedDbOportunidadeRepo } from '../indexeddb/adapters';
import { SupabaseOportunidadeRepo } from '../supabase/adapters';

export type OportunidadeRepo = {
  list(): Promise<Oportunidade[]>;
  get(id: string): Promise<Oportunidade | undefined | null>;
  create(data: Oportunidade): Promise<void>;
  update(id: string, data: Partial<Oportunidade>): Promise<void>;
  delete(id: string): Promise<void>;
};

export function useOportunidadeRepo(): OportunidadeRepo {
  return DATA_MODE === 'supabase' ? (SupabaseOportunidadeRepo as OportunidadeRepo) : (IndexedDbOportunidadeRepo as OportunidadeRepo);
}