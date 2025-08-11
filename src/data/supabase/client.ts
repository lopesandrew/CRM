import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../config';

/**
 * Instância do cliente Supabase. Lê as chaves da configuração global e
 * inicializa o client para acesso aos serviços de Auth, Postgres e Storage.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);